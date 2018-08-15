import express from 'express';
import AnswerController from '../controllers/AnswerController';
import QuestionValidation from '../middlewares/QuestionValidation';
import AnswerValidation from '../middlewares/AnswerValidation';

const { validateAnswer } = AnswerValidation;
const { validateQuestionExistence } = QuestionValidation;
const { addAnswer, fetchAnswers } = AnswerController;

const answerRouter = express.Router();
answerRouter.post('/questions/:questionId/answers', validateQuestionExistence, validateAnswer, addAnswer);
answerRouter.get('/questions/:questionId/answers', validateQuestionExistence, fetchAnswers);

export default answerRouter;
