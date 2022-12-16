import { Router } from 'express';
import UserController from '../controller/users.controller';

const userRouter = Router();

const controller = new UserController();

userRouter.post('/users', controller.add);

export default userRouter;
