import dbConnect from '../connections/dbConnect';
import VotesController from '../controllers/VotesController';
import { searchVotes, resetVotes } from '../helper/sqlHelper';
import CatchErrors from '../helper/CatchErrors';

const { catchDatabaseConnectionError } = CatchErrors;
const { upvote } = VotesController;
/**
  * @class VotesValidation
  *
  * @description Performs validations on votes
  */
class VotesValidation {
  /**
    * @static
    *
    * @param {object} request - The request payload sent to the middleware
    * @param {object} response - The response payload sent back from middleware
    * @param {object} next - The callback function to resume the next middleware
    *
    * @returns {object} - status Message
    *
    * @description This method validates upvotes to an answer
    * @memberOf VotesValidation
    */
  static validationPermissionToUpvote(request, response, next) {
    if (request.id === request.answers.userid) {
      return response.status(403).json({
        status: 'fail',
        data: {
          message: 'Action forbidden!, you cannot upvote your answer!'
        }
      });
    }
    return next();
  }

  /**
    * @static
    *
    * @param {object} request - The request payload sent to the middleware
    * @param {object} response - The response payload sent back from middleware
    * @param {object} next - The callback function to resume the next middleware
    *
    * @returns {object} - status Message
    *
    * @description This method validates upvotes entry to an answer
    * @memberOf VotesValidation
    */
  static validateVoteEntry(request, response, next) {
    const userId = request.id;
    const answerId = request.answers.id;

    dbConnect.query(searchVotes(answerId, userId, 1))
      .then((data) => {
        if (data.rows.length < 1) return next();
        return response.status(403).json({
          status: 'fail',
          data: {
            message: 'You have already upvoted this answer'
          }
        });
      })
      .catch(error => catchDatabaseConnectionError(`error reading votes table ${error}`, response));
  }

  /**
    * @static
    *
    * @param {object} request - The request payload sent to the middleware
    * @param {object} response - The response payload sent back from middleware
    * @param {object} next - The callback function to resume the next middleware
    *
    * @returns {object} - status Message
    *
    * @description This method deactivates previous downvote entries to an answer
    * @memberOf VotesValidation
    */
  static checkDownvoteEntry(request, response, next) {
    const userId = request.id;
    const answerId = request.answers.id;
    dbConnect.query(searchVotes(answerId, userId, 0))
      .then((data) => {
        if (data.rows.length < 1) return next();
        return VotesValidation.resetVoteEntry(request, response, next);
      })
      .catch(error => catchDatabaseConnectionError(`error reading votes table ${error}`, response));
  }

  /**
    * @static
    *
    * @param {object} request - The request payload sent to the middleware
    * @param {object} response - The response payload sent back from middleware
    *
    * @returns {object} - status Message
    *
    * @description This method resets vote from a user to 0.
    * @memberOf VotesValidation
    */
  static resetVoteEntry(request, response) {
    const userId = request.id;
    const answerId = request.answers.id;
    dbConnect.query(resetVotes(answerId, userId))
      .then(data => upvote(request, response))
      .catch(error => catchDatabaseConnectionError(`error updating votes table ${error}`, response));
  }
}

export default VotesValidation;
