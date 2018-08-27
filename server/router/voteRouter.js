import express from 'express';
import VotesController from '../controllers/VotesController';
import VotesValidation from '../middlewares/VotesValidation';
import Security from '../middlewares/Security';
import QuestionValidation from '../middlewares/QuestionValidation';
import AnswerValidation from '../middlewares/AnswerValidation';

const { validateQuestionExistence, validateUrl, reValidateUrl } = QuestionValidation;
const { validateAnswerExistence } = AnswerValidation;
const { upvote } = VotesController;
const {
  validationPermissionToUpvote, validateVoteEntry, checkDownvoteEntry
} = VotesValidation;
const { guardRoute } = Security;
const voteRouter = express.Router();
voteRouter.put('/questions/:questionId/answers/:answerId/upvote', validateUrl, reValidateUrl,
  guardRoute, validateQuestionExistence, validateAnswerExistence, validationPermissionToUpvote,
  validateVoteEntry, checkDownvoteEntry, upvote);

export default voteRouter;
