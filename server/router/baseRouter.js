import express from 'express';
import questionRouter from './questionRouter';

const baseRouter = express.Router();
baseRouter.use(questionRouter);

export default baseRouter;
