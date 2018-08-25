import express from 'express';
import AnswerController from '../controllers/AnswerController';
import QuestionValidation from '../middlewares/QuestionValidation';
import AnswerValidation from '../middlewares/AnswerValidation';
import Security from '../middlewares/Security';

const {
  validateAnswer, validatePermissionToEditAnswer, validatePermissionToUpdateAnswer,
  validateAnswerExistence
} = AnswerValidation;
const { validateQuestionExistence, validateUrl, reValidateUrl } = QuestionValidation;
const { addAnswer, fetchAnswersForAQueston, updateAnswer } = AnswerController;
const { guardRoute } = Security;

const answerRouter = express.Router();
answerRouter.post('/questions/:questionId/answers', validateUrl, validateQuestionExistence,
  validateAnswer, guardRoute, validatePermissionToEditAnswer, addAnswer);
answerRouter.put('/questions/:questionId/answers/:answerId', validateUrl, reValidateUrl,
  validateQuestionExistence, validateAnswerExistence, guardRoute,
  validatePermissionToUpdateAnswer, validateAnswer, updateAnswer);
answerRouter.get('/questions/:questionId/answers', validateQuestionExistence,
  fetchAnswersForAQueston);

export default answerRouter;
