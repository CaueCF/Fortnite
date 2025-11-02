import config from './config/config';
import express from 'express';
import cors from "cors";
import itemRoutes from './routes/itemRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());

const corsOptions = {
    origin: ["http://localhost:5173"]
};

app.use(cors(corsOptions));

// Routes
app.use('/api/items', itemRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});