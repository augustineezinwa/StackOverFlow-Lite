import express from 'express';
import VotesController from '../controllers/VotesController.js';
import VotesValidation from '../middlewares/VotesValidation.js';
import Security from '../middlewares/Security.js';
import QuestionValidation from '../middlewares/QuestionValidation.js';
import AnswerValidation from '../middlewares/AnswerValidation.js';

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

const VotesControllerClass = unwrapModule(VotesController);
const VotesValidationClass = unwrapModule(VotesValidation);
const SecurityClass = unwrapModule(Security);
const QuestionValidationClass = unwrapModule(QuestionValidation);
const AnswerValidationClass = unwrapModule(AnswerValidation);

const validateQuestionExistence = toHandler(QuestionValidationClass, 'validateQuestionExistence');
const validateUrl = toHandler(QuestionValidationClass, 'validateUrl');
const reValidateUrl = toHandler(QuestionValidationClass, 'reValidateUrl');
const validateAnswerExistence = toHandler(AnswerValidationClass, 'validateAnswerExistence');
const upvote = toHandler(VotesControllerClass, 'upvote');
const downvote = toHandler(VotesControllerClass, 'downvote');
const countDownvotesForAnAnswer = toHandler(VotesControllerClass, 'countDownvotesForAnAnswer');
const countUpvotesForAnAnswer = toHandler(VotesControllerClass, 'countUpvotesForAnAnswer');
const persistVotesToAnswers = toHandler(VotesControllerClass, 'persistVotesToAnswers');
const finalizeDownvote = toHandler(VotesControllerClass, 'finalizeDownvote');
const finalizeUpvote = toHandler(VotesControllerClass, 'finalizeUpvote');
const validationPermissionToUpvote = toHandler(VotesValidationClass, 'validationPermissionToUpvote');
const validationPermissionToDownvote = toHandler(
  VotesValidationClass,
  'validationPermissionToDownvote'
);
const validateDownVoteEntry = toHandler(VotesValidationClass, 'validateDownVoteEntry');
const validateUpVoteEntry = toHandler(VotesValidationClass, 'validateUpVoteEntry');
const checkUpvoteEntry = toHandler(VotesValidationClass, 'checkUpvoteEntry');
const checkDownvoteEntry = toHandler(VotesValidationClass, 'checkDownvoteEntry');
const resetVoteEntry = toHandler(VotesValidationClass, 'resetVoteEntry');
const guardRoute = toHandler(SecurityClass, 'guardRoute');
const voteRouter = express.Router();
voteRouter.put('/questions/:questionId/answers/:answerId/upvote', validateUrl, reValidateUrl,
  guardRoute, validateQuestionExistence, validateAnswerExistence, validationPermissionToUpvote,
  validateUpVoteEntry, checkDownvoteEntry, resetVoteEntry, checkUpvoteEntry, resetVoteEntry, upvote,
  countUpvotesForAnAnswer, countDownvotesForAnAnswer, persistVotesToAnswers, finalizeUpvote);
voteRouter.put('/questions/:questionId/answers/:answerId/downvote', validateUrl, reValidateUrl,
  guardRoute, validateQuestionExistence, validateAnswerExistence, validationPermissionToDownvote,
  validateDownVoteEntry, checkUpvoteEntry, resetVoteEntry, checkDownvoteEntry, resetVoteEntry, downvote,
  countUpvotesForAnAnswer, countDownvotesForAnAnswer, persistVotesToAnswers, finalizeDownvote);
export default voteRouter;
