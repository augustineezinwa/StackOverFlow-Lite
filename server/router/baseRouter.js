import express from 'express';
import questionRouter from './questionRouter';
import answerRouter from './answerRouter';

const baseRouter = express.Router();
baseRouter.use(questionRouter, answerRouter);

export default baseRouter;
