import express from 'express';
import AnswerController from '../controllers/AnswerController';
import QuestionValidation from '../middlewares/QuestionValidation';
import AnswerValidation from '../middlewares/AnswerValidation';

const { validateAnswer } = AnswerValidation;
const { validateQuestionExistence } = QuestionValidation;
const { addAnswer } = AnswerController;

const answerRouter = express.Router();
answerRouter.post('/questions/:questionId/answers', validateQuestionExistence, validateAnswer, addAnswer);

export default answerRouter;
