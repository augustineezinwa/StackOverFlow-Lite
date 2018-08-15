import express from 'express';
import QuestionController from '../controllers/QuestionController';
import QuestionValidation from '../middlewares/QuestionValidation';

const { fetchQuestions, fetchAQuestion, addQuestion } = QuestionController;
const { validateQuestionTitle, validateQuestionDescription } = QuestionValidation;

const questionRouter = express.Router();

questionRouter.get('/questions', fetchQuestions);
questionRouter.get('/questions/:id', fetchAQuestion);
questionRouter.post('/questions', validateQuestionTitle, validateQuestionDescription, addQuestion);

export default questionRouter;
