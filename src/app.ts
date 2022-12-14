import express from 'express';
import orderRouter from './routes/orders.routes';
import userRouter from './routes/users.routes';

const app = express();

app.use(express.json());

app.use(userRouter);
app.use(orderRouter);

export default app;
