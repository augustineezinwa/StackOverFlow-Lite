import express from 'express';
import QuestionController from '../controllers/QuestionController';
import QuestionValidation from '../middlewares/QuestionValidation';
import Security from '../middlewares/Security';

const { fetchQuestions, fetchAQuestion, addQuestion } = QuestionController;
const { validateQuestionTitle, validateQuestionDescription } = QuestionValidation;
const { guardRoute } = Security;

const questionRouter = express.Router();

questionRouter.get('/questions', fetchQuestions);
questionRouter.get('/questions/:id', fetchAQuestion);
questionRouter.post('/questions', validateQuestionTitle, validateQuestionDescription, guardRoute, addQuestion);

export default questionRouter;
