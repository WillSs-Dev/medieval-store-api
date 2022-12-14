import express from 'express';
import orderRouter from './routes/orders.routes';
import productRouter from './routes/products.routes';
import userRouter from './routes/users.routes';

const app = express();

app.use(express.json());

app.use(userRouter);
app.use(orderRouter);
app.use(productRouter);

export default app;
