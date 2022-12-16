import { Router } from 'express';
import UserController from '../controllers/users.controller';
import checkLoginData from '../middlewares/login';

const userRouter = Router();

const controller = new UserController();

userRouter.post('/login', checkLoginData, controller.login);
userRouter.post('/users', controller.add);

export default userRouter;
