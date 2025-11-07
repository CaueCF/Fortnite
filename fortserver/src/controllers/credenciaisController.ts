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

        const user = await prisma.user.findMany();
        // console.log(user);

        return res.status(200).json(user);
    });

credenciaisRouter.post('/updateSenha', verifyJWT,
    async (req: Request, res: Response): Promise<Response> => {

        let { senha } = req.body;
        const token = req.headers.authorization;
        const { id } = jwt.decode(String(token)) as { id: number };

        try {
            const credencial = await prisma.user.findFirst({
                where: {
                    id: Number(id),
                }
            });
            let hashSenha = await bcrypt.hash(senha, Number(process.env.SALTROUNDS));
            const user = await prisma.user.update({
                data: { senha: hashSenha },
                where: {
                    id: credencial?.id,
                }
            });
            // console.log(user);

            return res.status(200).json(user);
        }
        catch (error) {
            error = (error instanceof Error) ? error.message : String(error);
            return res.status(500).send(error);
        }

    });

credenciaisRouter.post('/login/auth',
    async (req: Request, res: Response): Promise<Response> => {

        let verify = false, code = 1;
        let { email, senha } = req.body;
        // console.log({email, senha});
        try {
            const user = await prisma.user.findFirst({
                where: {
                    email: email,
                }
            });

            // console.log(senha);
            // console.log(credenciais);


            if (!user) {
                throw new Error('Nome de usuário incorreto');
            }
            verify = await bcrypt.compare(senha, user.senha);
            code = 0;
            // console.log(verify);

            if (verify) {

                if (!process.env.JWT_SECRET_KEY) {
                    throw new Error('JWT_SECRET_KEY must be defined');
                }

                const id = user.id?.toString();
                const email = user.email;
                const accessToken = jwt.sign({
                    id: id,
                    email: email,
                },
                    process.env.JWT_SECRET_KEY,
                    {
                        expiresIn: '2h',
                    });

                const refreshToken = jwt.sign({
                    id: id,
                    email: email,
                },
                    process.env.JWT_SECRET_KEY,
                    {
                        expiresIn: '6h',
                    });

                return res.status(200).json({
                    code: code,
                    userId: id,
                    email: email,
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

        let { nome, email, senha } = req.body;
        // console.log({nome, email, senha});
        let hashSenha = await bcrypt.hash(senha, Number(process.env.SALTROUNDS));
        try {

            let User = await prisma.user.create({
                data: {
                    nome: nome,
                    vbucks: 10000,
                    email: email,
                    senha: hashSenha,
                }
            });

            // const credenciais = await prisma.credenciais.create({
            //     data:{
            //         userId: User.id,

            //     }
            // });
            // console.log(credenciais);

            return res.status(200).json(User);
        }
        catch (error) {
            error = (error instanceof Error) ? error.message : String(error);
            return res.status(500).send(error);
        }

    });

export default credenciaisRouter;