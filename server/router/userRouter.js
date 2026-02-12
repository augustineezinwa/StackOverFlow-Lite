import express from 'express';
import UserValidation from '../middlewares/UserValidation.js';
import UserController from '../controllers/UserController.js';
import Security from '../middlewares/Security.js';
import QuestionValidation from '../middlewares/QuestionValidation.js';

const unwrapModule = (moduleRef) => {
  let resolved = moduleRef;
  while (resolved && resolved.default) {
    resolved = resolved.default;
  }
  return resolved || moduleRef;
};

const toHandler = (resolvedModule, primaryName) => {
  const candidate = resolvedModule && resolvedModule[primaryName];
  if (typeof candidate === 'function') return candidate;
  return (request, response, next) => next(new Error(`Missing route handler: ${primaryName}`));
};

const UserValidationClass = unwrapModule(UserValidation);
const UserControllerClass = unwrapModule(UserController);
const SecurityClass = unwrapModule(Security);
const QuestionValidationClass = unwrapModule(QuestionValidation);

const validateUser = toHandler(UserValidationClass, 'validateUser');
const checkEmailReuse = toHandler(UserValidationClass, 'checkEmailReuse');
const validateLogin = toHandler(UserValidationClass, 'validateLogin');
const validateJobRole = toHandler(UserValidationClass, 'validateJobRole');
const validateCompanyName = toHandler(UserValidationClass, 'validateCompanyName');
const validateProfileUpdate = toHandler(UserValidationClass, 'validateProfileUpdate');
const validateUserUrl = toHandler(QuestionValidationClass, 'validateUserUrl');
const guardRoute = toHandler(SecurityClass, 'guardRoute');
const registerUser = toHandler(UserControllerClass, 'registerUser');
const loginUser = toHandler(UserControllerClass, 'loginUser');
const fetchUsers = toHandler(UserControllerClass, 'fetchUsers');
const fetchUserProfile = toHandler(UserControllerClass, 'fetchUserProfile');
const updateUserProfile = toHandler(UserControllerClass, 'updateUserProfile');
const userRouter = express.Router();

userRouter.post('/auth/signup', validateUser, checkEmailReuse, registerUser);
userRouter.post('/auth/login', validateLogin, loginUser);
userRouter.get('/users', fetchUsers);
userRouter.get('/users/profile', guardRoute, fetchUserProfile);
userRouter.get('/users/:userId', validateUserUrl, fetchUserProfile);
userRouter.put('/users', guardRoute, validateProfileUpdate, validateJobRole,
  validateCompanyName, updateUserProfile);


export default userRouter;
