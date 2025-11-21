import { Request, Response, Router } from "express";
import { PrismaClient } from "../generated/prisma/client";
import dotenv from "dotenv";
import { verifyJWT } from "../middlewares/jwtauth";

dotenv.config();

const inventariosRouter = Router();
const prisma = new PrismaClient();

inventariosRouter.get('/data',
    async (_req: Request, res: Response): Promise<Response> => {
        try {
            const inventarios = await prisma.inventarios.findMany();

            return res.status(200).json(inventarios);
        }
        catch (error) {
            error = (error instanceof Error) ? error.message : String(error);
            return res.status(500).send(error);
        }
    });

inventariosRouter.post('/data', verifyJWT,
    async (req: Request, res: Response): Promise<Response> => {

        const userId = req.cookies['token'].id;

        const inventarios = await prisma.inventarios.findMany({
            where: {
                user_id: userId,
            }
        });
        console.log(inventarios);

        return res.status(200).json(inventarios);
    });

inventariosRouter.post('/insertItem',
    async (req: Request, res: Response): Promise<Response> => {

        let { itemId, valor } = req.body;

        const email = req.cookies['token'].email;

        try {

            let user = await prisma.user.findUnique({
                where: {
                    email: email,
                }
            });

            if (valor < user!.vbucks) {
                let inventario;
                try {
                    inventario = await prisma.inventarios.create({
                        data: {
                            item_id: itemId,
                            user_id: user!.id,
                        }
                    });
                    const transacao = await prisma.transacoes.create({
                        data: {
                            user_id: user!.id,
                            item_id: itemId,
                            fluxo: 0,
                            valor: valor,
                        },
                    });

                    let novoSaldo = (user!.vbucks - valor);

                    console.log(novoSaldo)

                    user = await prisma.user.update({
                        where: { id: user?.id },
                        data: { vbucks: novoSaldo },
                    });

                    return res.status(200).json({ inventario, transacao, user });
                } catch {
                    return res.status(422).send("Item já inserido em invetário");
                }
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

inventariosRouter.post('/removeItem',
    async (req: Request, res: Response): Promise<Response> => {

        let { itemId } = req.body;
        const email = req.cookies['token'].email;

        try {

            let user = await prisma.user.findUnique({
                where: {
                    email: email,
                }
            });

            let item_inv = await prisma.inventarios.findFirst({
                where: {
                    item_id: itemId,
                    user_id: user?.id,
                }
            })

            let inventario = await prisma.inventarios.delete({
                where: {
                    id: item_inv?.id,
                }
            });

            let item = await prisma.transacoes.findFirst({
                where: {
                    item_id: itemId,
                    user_id: user?.id,
                    fluxo: {
                        not: 1,
                    }
                },
                orderBy: {
                    occuredAt: "desc",
                }
            });

            let valor = item!.valor;

            const transacao = await prisma.transacoes.create({
                data: {
                    user_id: user!.id,
                    item_id: itemId,
                    fluxo: 1,
                    valor: valor,
                }
            });

            let novoSaldo = (user!.vbucks + valor);

            user = await prisma.user.update({
                data: { vbucks: novoSaldo },
                where: { id: user?.id },
            });


            return res.status(200).json({ inventario, transacao, user });

        }
        catch (error) {
            error = (error instanceof Error) ? error.message : String(error);
            return res.status(500).send(error);
        }

    });

export default inventariosRouter;