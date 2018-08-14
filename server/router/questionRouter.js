import express from 'express';
import QuestionController from '../controllers/QuestionController';

const { fetchQuestions } = QuestionController;

const questionRouter = express.Router();

questionRouter.get('/questions', fetchQuestions);

export default questionRouter;
