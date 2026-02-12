import express from 'express';
import QuestionController from '../controllers/QuestionController.js';
import QuestionValidation from '../middlewares/QuestionValidation.js';
import Security from '../middlewares/Security.js';
import AnswerController from '../controllers/AnswerController.js';

const unwrapModule = (moduleRef) => {
  let resolved = moduleRef;
  while (resolved && resolved.default) {
    resolved = resolved.default;
  }
  return resolved || moduleRef;
};

const toHandler = (resolvedModule, primaryName, secondaryName) => {
  const candidate = resolvedModule
    && (resolvedModule[primaryName] || (secondaryName && resolvedModule[secondaryName]));
  if (typeof candidate === 'function') {
    return candidate;
  }
  return (request, response, next) => next(new Error(`Missing route handler: ${primaryName}`));
};

const QuestionControllerClass = unwrapModule(QuestionController);
const AnswerControllerClass = unwrapModule(AnswerController);
const QuestionValidationClass = unwrapModule(QuestionValidation);
const SecurityClass = unwrapModule(Security);

const fetchSearchedQuestions = toHandler(QuestionControllerClass, 'fetchSearchedQuestions');
const fetchQuestions = toHandler(QuestionControllerClass, 'fetchQuestions');
const fetchQuestionsWithMostAnswers = toHandler(QuestionControllerClass, 'fetchQuestionsWithMostAnswers');
const fetchUserQuestions = toHandler(QuestionControllerClass, 'fetchUserQuestions');
const fetchAQuestion = toHandler(QuestionControllerClass, 'fetchAQuestion');
const addQuestion = toHandler(QuestionControllerClass, 'addQuestion');
const deleteQuestion = toHandler(QuestionControllerClass, 'deleteQuestion');
const fetchAnswersForAQuestion = toHandler(
  AnswerControllerClass,
  'fetchAnswersForAQuestion',
  'fetchAnswersForAQueston'
);
const validateQuestionTitle = toHandler(QuestionValidationClass, 'validateQuestionTitle');
const validateQuestionDescription = toHandler(QuestionValidationClass, 'validateQuestionDescription');
const validateQuestionExistence = toHandler(QuestionValidationClass, 'validateQuestionExistence');
const validatePermissionToDeleteQuestion = toHandler(
  QuestionValidationClass,
  'validatePermissionToDeleteQuestion'
);
const validateUrl = toHandler(QuestionValidationClass, 'validateUrl');
const guardRoute = toHandler(SecurityClass, 'guardRoute');

const questionRouter = express.Router();

questionRouter.get(
  '/questions',
  fetchSearchedQuestions,
  fetchQuestions
);
questionRouter.get('/questions/mostanswers', fetchQuestionsWithMostAnswers);
questionRouter.get('/users/questions', guardRoute, fetchUserQuestions);
questionRouter.get(
  '/questions/:questionId',
  validateUrl,
  fetchAnswersForAQuestion,
  fetchAQuestion
);
questionRouter.post(
  '/questions',
  validateQuestionTitle,
  validateQuestionDescription,
  guardRoute,
  addQuestion
);
questionRouter.delete(
  '/questions/:questionId',
  validateUrl,
  guardRoute,
  validateQuestionExistence,
  validatePermissionToDeleteQuestion,
  deleteQuestion
);

export default questionRouter;
