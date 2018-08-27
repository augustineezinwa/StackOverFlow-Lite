import express from 'express';
import QuestionController from '../controllers/QuestionController';
import QuestionValidation from '../middlewares/QuestionValidation';
import Security from '../middlewares/Security';
import AnswerController from '../controllers/AnswerController';

const {
  fetchQuestions, fetchAQuestion, addQuestion, deleteQuestion
} = QuestionController;
const { fetchAnswersForAQueston } = AnswerController;
const {
  validateQuestionTitle, validateQuestionDescription, validatePermissionToDeleteQuestion,
  validateQuestionExistence, validateUrl
} = QuestionValidation;
const { guardRoute } = Security;

const questionRouter = express.Router();

questionRouter.get('/questions', fetchQuestions);
questionRouter.get('/questions/:questionId', validateUrl, fetchAnswersForAQueston, fetchAQuestion);
questionRouter.post('/questions', validateQuestionTitle, validateQuestionDescription,
  guardRoute, addQuestion);
questionRouter.delete('/questions/:questionId', validateUrl, guardRoute, validateQuestionExistence,
  validatePermissionToDeleteQuestion, deleteQuestion);

export default questionRouter;
