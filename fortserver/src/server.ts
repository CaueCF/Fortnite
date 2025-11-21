import config from './config/config';
import express from 'express';
import cookieParser from 'cookie-parser'
import cors from "cors";
import { errorHandler } from './middlewares/errorHandler';
import routers from './routes/routes';

const app = express();

app.use(express.json());

app.use(cookieParser())

const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(routers);

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});