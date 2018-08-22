import express from 'express';
import UserValidation from '../middlewares/UserValidation';
import UserController from '../controllers/UserController';

const { validateUser, checkEmailReuse } = UserValidation;
const { registerUser } = UserController;
const userRouter = express.Router();

userRouter.post('/auth/signup', validateUser, checkEmailReuse, registerUser);


export default userRouter;
