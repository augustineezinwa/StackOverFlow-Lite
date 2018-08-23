import express from 'express';
import AnswerController from '../controllers/AnswerController';
import QuestionValidation from '../middlewares/QuestionValidation';
import AnswerValidation from '../middlewares/AnswerValidation';
import Security from '../middlewares/Security';

const { validateAnswer, validatePermissionToEditAnswer } = AnswerValidation;
const { validateQuestionExistence, validateUrl } = QuestionValidation;
const { addAnswer, fetchAnswersForAQueston } = AnswerController;
const { guardRoute } = Security;

const answerRouter = express.Router();
answerRouter.post('/questions/:questionId/answers', validateUrl, validateQuestionExistence, validateAnswer, guardRoute, validatePermissionToEditAnswer, addAnswer);
answerRouter.get('/questions/:questionId/answers', validateQuestionExistence, fetchAnswersForAQueston);

export default answerRouter;
