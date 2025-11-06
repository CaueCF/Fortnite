import { Request, Response, Router } from "express";
import { PrismaClient } from "../generated/prisma/client";
import dotenv from "dotenv";
import { verifyJWT } from "../middlewares/jwtauth";
import jwt from "jsonwebtoken";

dotenv.config();

const inventariosRouter = Router();

const prisma = new PrismaClient();

inventariosRouter.get('/data', verifyJWT,
    async (_req: Request, res: Response): Promise<Response> => {

        const inventarios = await prisma.inventarios.findMany();
        console.log(inventarios);

        return res.status(200).json(inventarios);
});

inventariosRouter.post('/data', verifyJWT,
    async (req: Request, res: Response): Promise<Response> => {

        let userId = req.body;

        const inventarios = await prisma.inventarios.findMany({
            where:{
                user_id: userId,
            }
        });
        console.log(inventarios);

        return res.status(200).json(inventarios);
});

inventariosRouter.post('/insertItem',
    async (req: Request, res: Response): Promise<Response> => {

        let { itemId, valor } = req.body;

        const token = req.headers.authorization;
        const { id } = jwt.decode(String(token)) as { id: number };

        // console.log({nome, username, senha});
        
        try {
            
            const user = await prisma.user.findUnique({where:{id: Number(id)}});

            if(valor < user!.vbucks){
                let inventario = await prisma.inventarios.create({
                data:{
                    item_id:itemId,
                    user_id: Number(id),
                }
            });

            const transacao = await prisma.transacoes.create({
                data:{
                    user_id:Number(id),
                    item_id:'asdasd',
                    fluxo:0,
                    valor:valor,
                }
            });
            // console.log(inventarios);
            prisma.user.update({
                data:{vbucks: user!.vbucks- valor},
                 where: user!,
                });

            return res.status(200).json({inventario, transacao, user});
            }
            else {
                return res.status(422).send("Saldo insuficiente");
            }

        }
        catch (error) {
            error = (error instanceof Error) ? error.message : String(error);
            return res.status(500).send(error);
        }

    });

export default inventariosRouter;