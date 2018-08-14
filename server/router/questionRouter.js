import express from 'express';
import QuestionController from '../controllers/QuestionController';

const { fetchQuestions, fetchAQuestion } = QuestionController;

const questionRouter = express.Router();

questionRouter.get('/questions', fetchQuestions);
questionRouter.get('/questions/:id', fetchAQuestion);

export default questionRouter;
