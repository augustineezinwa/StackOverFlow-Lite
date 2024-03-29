import express from 'express';
import UserValidation from '../middlewares/UserValidation.js';
import UserController from '../controllers/UserController.js';
import Security from '../middlewares/Security.js';
import QuestionValidation from '../middlewares/QuestionValidation.js';

const {
  validateUser, checkEmailReuse, validateLogin, validateJobRole, validateCompanyName,
  validateProfileUpdate
} = UserValidation;
const { validateUserUrl } = QuestionValidation;
const { guardRoute } = Security;
const {
  registerUser, loginUser, fetchUsers, fetchUserProfile, updateUserProfile
} = UserController;
const userRouter = express.Router();

userRouter.post('/auth/signup', validateUser, checkEmailReuse, registerUser);
userRouter.post('/auth/login', validateLogin, loginUser);
userRouter.get('/users', fetchUsers);
userRouter.get('/users/profile', guardRoute, fetchUserProfile);
userRouter.get('/users/:userId', validateUserUrl, fetchUserProfile);
userRouter.put('/users', guardRoute, validateProfileUpdate, validateJobRole,
  validateCompanyName, updateUserProfile);


export default userRouter;
