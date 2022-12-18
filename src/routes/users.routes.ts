import { Router } from 'express';
import UserController from '../controllers/users.controller';
import checkLoginData from '../middlewares/login';
import checkUserData from '../middlewares/user';

const userRouter = Router();

const controller = new UserController();

userRouter.post('/login', checkLoginData, controller.login);

userRouter.post('/users', checkUserData, controller.add);

export default userRouter;
