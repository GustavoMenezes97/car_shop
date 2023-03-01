import express from 'express';
import ErrorHandler from './Middlewares/ErrorHandler';
import carRoutes from './Routes/carRoutes';
import motorcycleRoutes from './Routes/motorcycleRoutes';

const app = express();

app.use(express.json());
app.use(carRoutes);
app.use(motorcycleRoutes);
app.use(ErrorHandler.handle);

export default app;
