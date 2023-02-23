import express from 'express';
import questionRouter from './questionRouter.js';
import answerRouter from './answerRouter.js';
import userRouter from './userRouter.js';
import voteRouter from './voteRouter.js';
import defaultRouter from './defaultRouter.js';

const baseRouter = express.Router();
baseRouter.use(questionRouter, answerRouter, userRouter, voteRouter, defaultRouter);

export default baseRouter;
