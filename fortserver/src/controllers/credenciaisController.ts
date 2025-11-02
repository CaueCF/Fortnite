import { Request, Response, Router } from "express";
import credenciaisRepository from "../repositories/credenciaisRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { verifyJWT } from "../middlewares/jwtauth";

const credenciaisRouter = Router();

credenciaisRouter.get('/data', verifyJWT,
    async (_req: Request, res: Response): Promise<Response> => {

        const credenciais = await credenciaisRepository.getCredenciais();
        console.log(credenciais);

        return res.status(200).json(credenciais);
    });

credenciaisRouter.post('/updateSenha', verifyJWT,
    async (req: Request, res: Response): Promise<Response> => {

        try {
            const credenciais = await credenciaisRepository.updateSenha(req.body);
            console.log(credenciais);

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

        try {
            const credenciais = await credenciaisRepository.getLogin(req.body);

            //console.log(req.body.senha);
            //console.log(credenciais.senha);
            

            if (!credenciais) {
                throw new Error('Nome de usuário incorreto');
            }

            if (credenciais.senha.replace(/[\D]/g, "") === credenciais.mantenedor.cpf.replace(/[\D]/g, '')) {
                
                verify = true;
                code = 1;

            } else {
                verify = await bcrypt.compare(req.body.senha.toString(), credenciais.senha);
                code = 0;
                //console.log(verify);
            }

            if (verify) {

                const id = credenciais.id?.toString();
                const nome = credenciais.mantenedor.nome;
                const admin = credenciais.mantenedor.admin;
                const accessToken = jwt.sign({
                    id: id,
                    nome: nome,
                    admin: admin
                },
                    process.env.JWT_SECRET_KEY,
                    {
                        expiresIn: '2h',
                    });

                const refreshToken = jwt.sign({
                    id: id,
                    nome: nome,
                    admin: admin
                },
                    process.env.JWT_SECRET_KEY,
                    {
                        expiresIn: '6h',
                    });

                return res.status(200).json({
                    code: code,
                    mantenedorId: id,
                    nome: nome,
                    admin: admin,
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


export default credenciaisRouter;