import express from 'express';
import QuestionController from '../controllers/QuestionController.js';
import QuestionValidation from '../middlewares/QuestionValidation.js';
import Security from '../middlewares/Security.js';
import AnswerController from '../controllers/AnswerController.js';

const {
  fetchQuestions, fetchAQuestion, addQuestion, deleteQuestion, fetchUserQuestions,
  fetchSearchedQuestions, fetchQuestionsWithMostAnswers, fetchCategories,
  archiveQuestion, pinQuestion, fetchPinnedQuestions
} = QuestionController;
const { fetchAnswersForAQuestion } = AnswerController;
const {
  validateQuestionTitle, validateQuestionDescription, validatePermissionToDeleteQuestion,
  validateQuestionExistence, validateUrl
} = QuestionValidation;
const { guardRoute } = Security;

const questionRouter = express.Router();

questionRouter.get('/categories', fetchCategories);
questionRouter.get('/questions', fetchSearchedQuestions, fetchQuestions);
questionRouter.get('/questions/mostanswers', fetchQuestionsWithMostAnswers);
questionRouter.get('/users/questions/pinned', guardRoute, fetchPinnedQuestions);
questionRouter.get('/users/questions', guardRoute, fetchUserQuestions);
questionRouter.get('/questions/:questionId', validateUrl, fetchAnswersForAQuestion, fetchAQuestion);
questionRouter.post('/questions', validateQuestionTitle, validateQuestionDescription,
  guardRoute, addQuestion);
questionRouter.patch('/questions/:questionId/archive', validateUrl, guardRoute,
  validateQuestionExistence, validatePermissionToDeleteQuestion, archiveQuestion);
questionRouter.post('/questions/:questionId/pin', validateUrl, guardRoute,
  validateQuestionExistence, pinQuestion);
questionRouter.delete('/questions/:questionId', validateUrl, guardRoute, validateQuestionExistence,
  validatePermissionToDeleteQuestion, deleteQuestion);

export default questionRouter;
