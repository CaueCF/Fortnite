import { Request, Response, Router } from "express";
import { PrismaClient } from "../generated/prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { verifyJWT } from "../middlewares/jwtauth";

dotenv.config();

const credenciaisRouter = Router();

const prisma = new PrismaClient();

credenciaisRouter.get('/data', verifyJWT,
    async (_req: Request, res: Response): Promise<Response> => {

        const credenciais = await prisma.credenciais.findMany();
        // console.log(credenciais);

        return res.status(200).json(credenciais);
    });

credenciaisRouter.post('/updateSenha', verifyJWT,
    async (req: Request, res: Response): Promise<Response> => {

        let { senha } = req.body;
        const token = req.headers.authorization;
        const { id } = jwt.decode(String(token)) as { id: number };
        
        try {
            const credencial = await prisma.credenciais.findFirst({
                where:{
                    userId: Number(id),
                }
            });
            let hashSenha = await bcrypt.hash(senha, Number(process.env.SALTROUNDS));
            const credenciais = await prisma.credenciais.update({
                data: {senha: hashSenha},
                where: {
                    id: credencial?.id,
                }
            });
            // console.log(credenciais);

            return res.status(200).json(credenciais);
        }
        catch (error) {
            error = (error instanceof Error) ? error.message : String(error);
            return res.status(500).send(error);
        }

    });

credenciaisRouter.post('/login/auth',
    async (req: Request, res: Response): Promise<Response> => {

        let verify = false, code= 1;
        let {username, senha} = req.body;
        // console.log({username, senha});
        try {
            const credenciais = await prisma.credenciais.findFirst({
                where: {
                    username: username, 
                }
            });

            // console.log(senha);
            // console.log(credenciais);
            

            if (!credenciais) {
                throw new Error('Nome de usuário incorreto');
            }
                verify = await bcrypt.compare(senha, credenciais.senha);
                code = 0;
                // console.log(verify);

            if (verify) {

                if(!process.env.JWT_SECRET_KEY){
                    throw new Error('JWT_SECRET_KEY must be defined');
                }

                const id = credenciais.id?.toString();
                const username = credenciais.username;
                const accessToken = jwt.sign({
                    id: id,
                    username: username,
                },
                    process.env.JWT_SECRET_KEY,
                    {
                        expiresIn: '2h',
                    });

                const refreshToken = jwt.sign({
                    id: id,
                    username: username,
                },
                    process.env.JWT_SECRET_KEY,
                    {
                        expiresIn: '6h',
                    });

                return res.status(200).json({
                    code: code,
                    userId: id,
                    username: username,
                    accessToken: accessToken,
                    refreshToken: refreshToken
                });

            } else {
                throw new Error('Senha incorreta!');
            }

        }
        catch (error) {
            error = (error instanceof Error) ? error.message : String(error);
            return res.status(500).send(error);
        }
    });

    credenciaisRouter.post('/createCredenciais',
    async (req: Request, res: Response): Promise<Response> => {

        let { nome, username, senha } = req.body;
        // console.log({nome, username, senha});
        let hashSenha = await bcrypt.hash(senha, Number(process.env.SALTROUNDS));
        try {
            
            let User = await prisma.user.create({
                data:{
                    nome: nome, 
                    vbucks:10000,
                }
            });

            const credenciais = await prisma.credenciais.create({
                data:{
                    userId: User.id,
                    username: username,
                    senha: hashSenha,
                }
            });
            // console.log(credenciais);

            return res.status(200).json(credenciais);
        }
        catch (error) {
            error = (error instanceof Error) ? error.message : String(error);
            return res.status(500).send(error);
        }

    });

export default credenciaisRouter;