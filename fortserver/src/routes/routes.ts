import { Router } from "express";
import credenciaisRouter from "../controllers/credenciaisController";
import inventariosRouter from "../controllers/inventarioController";
import transacoesRouter from "../controllers/transacoesController"

const routers = Router();

routers.use('/credenciais', credenciaisRouter);
routers.use('/inventarios', inventariosRouter);
routers.use('/transacoes', transacoesRouter);

export default routers;