import { Request, Response, Router } from "express";
import { PrismaClient } from "../generated/prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { CustomRequest, verifyJWT } from "../middlewares/jwtauth";

dotenv.config();

const credenciaisRouter = Router();

const prisma = new PrismaClient();

credenciaisRouter.get('/data', verifyJWT,
    async (_req: Request, res: Response): Promise<Response> => {

        try {
            const user = await prisma.user.findMany();

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).send(error);
        }

    });

credenciaisRouter.post('/data', verifyJWT,
    async (req: Request, res: Response): Promise<Response> => {

        const email = req.cookies['token'].email;

        try {
            const user = await prisma.user.findUnique(
                {
                    where: {
                        email: email
                    }
                }
            );

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).send(error);
        }

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

        try {
            const user = await prisma.user.findFirst({
                where: {
                    email: email,
                }
            });

            if (!user) {
                throw new Error('Nome de usuário incorreto');
            }
            verify = await bcrypt.compare(senha, user.senha);
            code = 0;


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
                const isProd = process.env.NODE_ENV === 'production'

                res.cookie(
                    'token',
                    {
                        code: code,
                        userId: id,
                        email: email,
                        accessToken: accessToken,
                    },
                    {
                        httpOnly: true,
                        secure: isProd,
                        sameSite: isProd ? 'strict' : 'lax',
                        maxAge: 60 * 60 * 1000 * 2,
                        path: '/',
                        domain: isProd ? 'seu.dominio.com' : 'localhost'
                    }
                );

                return res.status(200).json('okay');

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

        let hashSenha = await bcrypt.hash(senha, Number(process.env.SALTROUNDS));
        try {

            let User = await prisma.user.create({
                data: {
                    nome: nome,
                    email: email,
                    senha: hashSenha,
                }
            });

            return res.status(200).json(User);
        }
        catch (error) {
            error = (error instanceof Error) ? error.message : String(error);
            return res.status(422).send("Este email já está cadastrado");
        }

    });

credenciaisRouter.post('/logout', verifyJWT,
    async (req: Request, res: Response): Promise<Response> => {

        res.clearCookie('token');
        return res.status(200).json({message: "Logour com sucesso!"});
    });

export default credenciaisRouter;