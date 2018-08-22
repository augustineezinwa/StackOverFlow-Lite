import express from 'express';
import questionRouter from './questionRouter';
import answerRouter from './answerRouter';
import userRouter from './userRouter';

const baseRouter = express.Router();
baseRouter.use(questionRouter, answerRouter, userRouter);

export default baseRouter;
