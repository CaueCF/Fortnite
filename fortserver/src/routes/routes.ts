import { Router } from "express";
import credenciaisRouter from "../controllers/credenciaisController";

const routers = Router();

routers.use('/credenciais', credenciaisRouter);

export default routers;