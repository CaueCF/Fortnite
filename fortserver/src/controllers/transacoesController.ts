import { Request, Response, Router } from "express";
import { PrismaClient } from "../generated/prisma/client";
import dotenv from "dotenv";
import { verifyJWT } from "../middlewares/jwtauth";
import jwt from "jsonwebtoken";

dotenv.config();

const transacoesRouter = Router();

const prisma = new PrismaClient();

transacoesRouter.get('/data', verifyJWT,
    async (req: Request, res: Response): Promise<Response> => {
        try {
            const token = req.headers.authorization;
            const { id } = jwt.decode(String(token)) as { id: number };

            const transacoes = await prisma.transacoes.findMany({
                where: {
                    user_id: Number(id),
                }
            });
            // console.log(transacoes);

            return res.status(200).json(transacoes);
        } catch (error) {
            error = (error instanceof Error) ? error.message : String(error);
            return res.status(500).send(error);
        }
    });

    export default transacoesRouter;