import express from 'express';
import AnswerController from '../controllers/AnswerController.js';
import CommentController from '../controllers/CommentController.js';
import CommentValidation from '../middlewares/CommentValidation.js';
import QuestionValidation from '../middlewares/QuestionValidation.js';
import AnswerValidation from '../middlewares/AnswerValidation.js';
import Security from '../middlewares/Security.js';
import VotesController from '../controllers/VotesController.js';

const unwrapModule = (moduleRef) => {
  let resolved = moduleRef;
  while (resolved && resolved.default) {
    resolved = resolved.default;
  }
  return resolved || moduleRef;
};

const toHandler = (resolvedModule, primaryName) => {
  const candidate = resolvedModule && resolvedModule[primaryName];
  if (typeof candidate === 'function') return candidate;
  return (request, response, next) => next(new Error(`Missing route handler: ${primaryName}`));
};

const AnswerControllerClass = unwrapModule(AnswerController);
const CommentControllerClass = unwrapModule(CommentController);
const CommentValidationClass = unwrapModule(CommentValidation);
const QuestionValidationClass = unwrapModule(QuestionValidation);
const AnswerValidationClass = unwrapModule(AnswerValidation);
const SecurityClass = unwrapModule(Security);
const VotesControllerClass = unwrapModule(VotesController);

const validateAnswer = toHandler(AnswerValidationClass, 'validateAnswer');
const validatePermissionToEditAnswer = toHandler(
  AnswerValidationClass,
  'validatePermissionToEditAnswer'
);
const validatePermissionToUpdateAnswer = toHandler(
  AnswerValidationClass,
  'validatePermissionToUpdateAnswer'
);
const validateAnswerExistence = toHandler(AnswerValidationClass, 'validateAnswerExistence');
const validateQuestionExistence = toHandler(QuestionValidationClass, 'validateQuestionExistence');
const validateUrl = toHandler(QuestionValidationClass, 'validateUrl');
const reValidateUrl = toHandler(QuestionValidationClass, 'reValidateUrl');
const addAnswer = toHandler(AnswerControllerClass, 'addAnswer');
const fetchAnswer = toHandler(AnswerControllerClass, 'fetchAnswer');
const updateAnswer = toHandler(AnswerControllerClass, 'updateAnswer');
const guardRoute = toHandler(SecurityClass, 'guardRoute');
const addComment = toHandler(CommentControllerClass, 'addComment');
const fetchCommentsForAnAnswer = toHandler(
  CommentControllerClass,
  'fetchCommentsForAnAnswer'
);
const validateComment = toHandler(CommentValidationClass, 'validateComment');
const countDownvotesForAnAnswer = toHandler(VotesControllerClass, 'countDownvotesForAnAnswer');
const countUpvotesForAnAnswer = toHandler(VotesControllerClass, 'countUpvotesForAnAnswer');
const persistVotesToAnswers = toHandler(VotesControllerClass, 'persistVotesToAnswers');

const answerRouter = express.Router();
answerRouter.post('/questions/:questionId/answers', validateUrl, validateQuestionExistence,
  validateAnswer, guardRoute, validatePermissionToEditAnswer, addAnswer);
answerRouter.post('/questions/:questionId/answers/:answerId/comments', validateUrl, reValidateUrl,
  validateQuestionExistence, validateAnswerExistence, guardRoute, validateComment, addComment);
answerRouter.put('/questions/:questionId/answers/:answerId', validateUrl, reValidateUrl,
  validateQuestionExistence, validateAnswerExistence, guardRoute,
  validatePermissionToUpdateAnswer, validateAnswer, updateAnswer);
answerRouter.get('/questions/:questionId/answers/:answerId', validateUrl, reValidateUrl,
  validateQuestionExistence, validateAnswerExistence, fetchCommentsForAnAnswer,
  countUpvotesForAnAnswer,
  countDownvotesForAnAnswer, persistVotesToAnswers, fetchAnswer);

export default answerRouter;
