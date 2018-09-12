import express from 'express';
import UserValidation from '../middlewares/UserValidation';
import UserController from '../controllers/UserController';

const { validateUser, checkEmailReuse, validateLogin } = UserValidation;
const { registerUser, loginUser, fetchUsers } = UserController;
const userRouter = express.Router();

userRouter.post('/auth/signup', validateUser, checkEmailReuse, registerUser);
userRouter.post('/auth/login', validateLogin, loginUser);
userRouter.get('/users', fetchUsers);

export default userRouter;
