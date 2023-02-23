import express from 'express';
import AnswerController from '../controllers/AnswerController.js';
import CommentController from '../controllers/CommentController.js';
import CommentValidation from '../middlewares/CommentValidation.js';
import QuestionValidation from '../middlewares/QuestionValidation.js';
import AnswerValidation from '../middlewares/AnswerValidation.js';
import Security from '../middlewares/Security.js';
import VotesController from '../controllers/VotesController.js';

const {
  validateAnswer, validatePermissionToEditAnswer, validatePermissionToUpdateAnswer,
  validateAnswerExistence
} = AnswerValidation;
const { validateQuestionExistence, validateUrl, reValidateUrl } = QuestionValidation;
const { addAnswer, fetchAnswer, updateAnswer } = AnswerController;
const { guardRoute } = Security;
const { addComment, fetchCommentsForAnAnswer } = CommentController;
const { validateComment } = CommentValidation;
const { countDownvotesForAnAnswer, countUpvotesForAnAnswer, persistVotesToAnswers } = VotesController;

const answerRouter = express.Router();
answerRouter.post('/questions/:questionId/answers', validateUrl, validateQuestionExistence,
  validateAnswer, guardRoute, validatePermissionToEditAnswer, addAnswer);
answerRouter.post('/questions/:questionId/answers/:answerId/comments', validateUrl, reValidateUrl,
  validateQuestionExistence, validateAnswerExistence, guardRoute, validateComment, addComment);
answerRouter.put('/questions/:questionId/answers/:answerId', validateUrl, reValidateUrl,
  validateQuestionExistence, validateAnswerExistence, guardRoute,
  validatePermissionToUpdateAnswer, validateAnswer, updateAnswer);
answerRouter.get('/questions/:questionId/answers/:answerId', validateUrl, reValidateUrl,
  validateQuestionExistence, validateAnswerExistence, fetchCommentsForAnAnswer, countUpvotesForAnAnswer,
  countDownvotesForAnAnswer, persistVotesToAnswers, fetchAnswer);

export default answerRouter;
