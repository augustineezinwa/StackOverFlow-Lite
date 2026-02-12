import express from 'express';
import questionRouter from './questionRouter.js';
import answerRouter from './answerRouter.js';
import userRouter from './userRouter.js';
import voteRouter from './voteRouter.js';
import defaultRouter from './defaultRouter.js';

const unwrapModule = (moduleRef) => {
  let resolved = moduleRef;
  while (resolved && resolved.default) {
    resolved = resolved.default;
  }
  return resolved || moduleRef;
};

const toRouter = (resolvedModule) => {
  if (typeof resolvedModule === 'function') return resolvedModule;
  return (request, response, next) => next(new Error('Missing router middleware'));
};

const questionRoutes = toRouter(unwrapModule(questionRouter));
const answerRoutes = toRouter(unwrapModule(answerRouter));
const userRoutes = toRouter(unwrapModule(userRouter));
const voteRoutes = toRouter(unwrapModule(voteRouter));
const defaultRoutes = toRouter(unwrapModule(defaultRouter));

const baseRouter = express.Router();
baseRouter.use(questionRoutes, answerRoutes, userRoutes, voteRoutes, defaultRoutes);

export default baseRouter;
