import { Router } from "express";
import credenciaisRouter from "../controllers/credenciaisController";
import inventariosRouter from "../controllers/inventarioContrroller";

const routers = Router();

routers.use('/credenciais', credenciaisRouter);
routers.use('/inventarios', inventariosRouter);

export default routers;