import express from 'express';
import QuestionController from '../controllers/QuestionController.js';
import QuestionValidation from '../middlewares/QuestionValidation.js';
import Security from '../middlewares/Security.js';
import AnswerController from '../controllers/AnswerController.js';

const QuestionControllerClass = QuestionController.default || QuestionController;
const AnswerControllerClass = AnswerController.default || AnswerController;
const QuestionValidationClass = QuestionValidation.default || QuestionValidation;
const SecurityClass = Security.default || Security;

const questionRouter = express.Router();

questionRouter.get(
  '/questions',
  QuestionControllerClass.fetchSearchedQuestions,
  QuestionControllerClass.fetchQuestions
);
questionRouter.get('/questions/mostanswers', QuestionControllerClass.fetchQuestionsWithMostAnswers);
questionRouter.get('/users/questions', SecurityClass.guardRoute, QuestionControllerClass.fetchUserQuestions);
questionRouter.get(
  '/questions/:questionId',
  QuestionValidationClass.validateUrl,
  AnswerControllerClass.fetchAnswersForAQuestion,
  QuestionControllerClass.fetchAQuestion
);
questionRouter.post(
  '/questions',
  QuestionValidationClass.validateQuestionTitle,
  QuestionValidationClass.validateQuestionDescription,
  SecurityClass.guardRoute,
  QuestionControllerClass.addQuestion
);
questionRouter.delete(
  '/questions/:questionId',
  QuestionValidationClass.validateUrl,
  SecurityClass.guardRoute,
  QuestionValidationClass.validateQuestionExistence,
  QuestionValidationClass.validatePermissionToDeleteQuestion,
  QuestionControllerClass.deleteQuestion
);

export default questionRouter;
