import dbConnect from '../connections/dbConnect.js';
import SqlHelper from '../helper/SqlHelper.js';
import {
  formatMostAnsweredQuestions, formatQuestionsWithAnswers,
  formatAllQuestions, formatCategories
} from '../helper/format.js';
import CatchErrors from '../helper/CatchErrors.js';

const { catchDatabaseConnectionError } = CatchErrors;
const {
  createQuestion, getAllQuestions, getAQuestion, deleteAQuestion, getAllUserQuestions,
  searchQuestion, getQuestionsWithMostAnswers, getAllCategories
} = SqlHelper;
/**
  * @class QuestionController
  *
  * @description Performs add and delete operations on questions
  */
class QuestionController {
  /**
    * @static
    *
    * @param {object} request - The request payload sent to the controller
    * @param {object} response - The respons payload sent back from the controller
    *
    * @returns {object} - status Message and the question
    *
    * @description This method returns the question object
    * @memberOf QuestionController
    */
  /**
    * @static
    *
    * @param {object} request - The request payload
    * @param {object} response - The response payload
    *
    * @description Returns all categories
    * @memberOf QuestionController
    */
  static fetchCategories(request, response) {
    dbConnect.query(getAllCategories())
      .then((data) => {
        const rows = Array.isArray(data) ? data : (data.rows || []);
        response.status(200).json({
          status: 'success',
          data: { categories: formatCategories(rows) }
        });
      })
      .catch(error => catchDatabaseConnectionError(error, response));
  }

  /**
    * @static
    *
    * @param {object} request - The request payload sent to the controller
    * @param {object} response - The respons payload sent back from the controller
    *
    * @returns {object} - status Message and the question
    *
    * @description This method returns all question object
    * @memberOf QuestionController
    */
  static fetchQuestions(request, response) {
    const limit = Math.min(100, Math.max(1, Number.parseInt(request.query.limit, 10) || 20));
    const cursor = request.query.cursor != null && request.query.cursor !== ''
      ? request.query.cursor : null;
    const category = request.query.category != null && request.query.category !== ''
      ? request.query.category : null;

    dbConnect.query(getAllQuestions(limit, cursor, category))
      .then((data) => {
        let questions = data.questions;
        let nextCursor = data.nextCursor != null ? data.nextCursor : null;
        if (questions == null && Array.isArray(data.rows) && data.rows.length > 0) {
          const first = data.rows[0];
          if (first && typeof first === 'object' && Array.isArray(first.questions)) {
            questions = first.questions;
            nextCursor = first.nextCursor != null ? first.nextCursor : null;
          }
        }
        if (questions == null) questions = data.rows || [];
        const formatted = formatAllQuestions(questions);
        const body = { questions: formatted };
        if (nextCursor != null) body.nextCursor = String(nextCursor);
        response.status(200).json({
          status: 'success',
          data: body
        });
      })
      .catch(
        error => catchDatabaseConnectionError(error, response)
      );
  }

  /**
    * @static
    *
    * @param {object} request - The request payload sent to the controller
    * @param {object} response - The respons payload sent back from the controller
    *
    * @returns {object} - status Message and the question
    *
    * @description This method returns all question object for a user
    * @memberOf QuestionController
    */
  static fetchUserQuestions(request, response) {
    const userId = request.id;
    dbConnect.query(getAllUserQuestions(userId))
      .then((data) => {
        switch (data.rows.length) {
          case 0: response.status(404).json({
            status: 'fail',
            message: 'No questions were found!'
          });
            break;

          default: {
            response.status(200).json({
              status: 'success',
              data: { questions: formatAllQuestions(data.rows) }
            });
          }
        }
      })
      .catch(
        error => catchDatabaseConnectionError(error, response)
      );
  }

  /**
    * @static
    *
    * @param {object} request - The request payload sent to the controller
    * @param {object} response - The respons payload sent back from the controller
    * @param {object} next - The call back function to start the next controller
    *
    * @returns {object} - status Message and the question
    *
    * @description This method returns all searched question object to the user
    * @memberOf QuestionController
    */
  static fetchSearchedQuestions(request, response, next) {
    const { search } = request.query;
    if (!search) return next();
    const limit = Math.min(100, Math.max(1, Number.parseInt(request.query.limit, 10) || 20));
    const cursor = request.query.cursor != null && request.query.cursor !== '' ? request.query.cursor : null;
    dbConnect.query(searchQuestion(search, limit, cursor))
      .then((data) => {
        let questions = data.questions;
        let nextCursor = data.nextCursor != null ? data.nextCursor : null;
        if (questions == null && Array.isArray(data.rows) && data.rows.length > 0) {
          const first = data.rows[0];
          if (first && typeof first === 'object' && Array.isArray(first.questions)) {
            questions = first.questions;
            nextCursor = first.nextCursor != null ? first.nextCursor : null;
          }
        }
        if (questions == null) questions = data.rows || [];
        const formatted = formatAllQuestions(questions);
        if (formatted.length === 0) {
          return response.status(404).json({
            status: 'fail',
            message: 'No questions were found!'
          });
        }
        const body = { questions: formatted };
        if (nextCursor != null) body.nextCursor = String(nextCursor);
        response.status(200).json({
          status: 'success',
          data: body
        });
      })
      .catch(
        error => catchDatabaseConnectionError(error, response)
      );
  }


  /**
    * @static
    *
    * @param {object} request - The request payload sent to the controller
    * @param {object} response - The response payload sent back from the controller
    *
    * @returns {object} - status Message and the question
    *
    * @description This method returns the question object
    * @memberOf QuestionController
    */
  static fetchAQuestion(request, response) {
    const { questionId } = request.params;
    dbConnect.query(getAQuestion(questionId))
      .then((data) => {
        switch (data.rows.length) {
          case 0: response.status(404).json({
            status: 'fail',
            message: 'No question was found!'
          });
            break;

          default: {
            const reformedQuestion = formatQuestionsWithAnswers(data.rows)[0];
            reformedQuestion.answers = request.foundAnswers;
            response.status(200).json({
              status: 'success',
              data: { question: reformedQuestion }
            });
          }
        }
      })
      .catch(
        error => catchDatabaseConnectionError(`Error reading questions table ${error}`, response)
      );
  }

  /**
    * @static
    *
    * @param {object} request - The request payload sent to the controller
    * @param {object} response - The response payload sent back from the controller
    *
    * @returns {object} - status Message and the question
    *
    * @description This method returns the question object
    * @memberOf QuestionController
    */
  static fetchQuestionsWithMostAnswers(request, response) {
    dbConnect.query(getQuestionsWithMostAnswers())
      .then((data) => {
        switch (data.rows.length) {
          case 0: response.status(404).json({
            status: 'fail',
            message: 'No question was found!'
          });
            break;

          default: {
            const reformedQuestion = formatMostAnsweredQuestions(data.rows);
            reformedQuestion.answers = request.foundAnswers;
            response.status(200).json({
              status: 'success',
              data: { questions: reformedQuestion }
            });
          }
        }
      })
      .catch(
        error => catchDatabaseConnectionError(`Error reading questions table ${error}`, response)
      );
  }


  /**
    * @static
    *
    * @param {object} request - The request payload sent to the controller
    * @param {object} response - The response payload sent back from the controller
    *
    * @returns {object} - status Message and the added question
    *
    * @description This method returns the question object
    * @memberOf QuestionController
    */
  static addQuestion(request, response) {
    const {
      questionTitle,
      questionDescription,
      imageUrl
    } = request.body;
    dbConnect.query(createQuestion(questionTitle, questionDescription, request.id, imageUrl))
      .then(data => response.status(201).json({
        status: 'success',
        data: {
          newQuestion: formatQuestionsWithAnswers(data.rows)[0]
        }
      }))
      .catch(error => catchDatabaseConnectionError(error, response));
  }


  /**
    * @static
    * @description Archive or unarchive a question (owner only). Send body { archived: true } or { archived: false }. Protected by validatePermissionToDeleteQuestion.
    */
  static archiveQuestion(request, response) {
    const { questionId } = request.params;
    const userId = request.id;
    const archived = request.body && typeof request.body.archived === 'boolean'
      ? request.body.archived
      : (request.body && (request.body.archived === 'true' || request.body.archived === 'false')
        ? request.body.archived === 'true'
        : true);
    dbConnect.query(SqlHelper.archiveQuestion(questionId, userId, archived))
      .then((data) => {
        const result = (data.rows && data.rows[0]) || (Array.isArray(data) && data[0]);
        if (result && result.error === 'forbidden') {
          return response.status(403).json({
            status: 'fail',
            message: 'You do not have permission to archive or unarchive this question'
          });
        }
        const message = archived ? 'Question archived successfully' : 'Question unarchived successfully';
        return response.status(200).json({
          status: 'success',
          message,
          data: { questionId: Number(questionId), archived: result.archived }
        });
      })
      .catch(error => catchDatabaseConnectionError(error, response));
  }

  /**
    * @static
    * @description Pin or unpin a question for the authenticated user. Send body { pinned: true } to pin, { pinned: false } to unpin. Defaults to pin if body omitted.
    */
  static pinQuestion(request, response) {
    const { questionId } = request.params;
    const userId = request.id;
    const pinned = request.body && typeof request.body.pinned === 'boolean'
      ? request.body.pinned
      : (request.body && (request.body.pinned === 'true' || request.body.pinned === 'false')
        ? request.body.pinned === 'true'
        : true);
    dbConnect.query(SqlHelper.pinQuestion(questionId, userId, pinned))
      .then((data) => {
        const rows = Array.isArray(data) ? data : (data.rows || []);
        const result = rows[0];
        const message = pinned ? 'Question pinned successfully' : 'Question unpinned successfully';
        const payload = result && result.pinned === false
          ? { questionId: Number(questionId), userId: result.userid, pinned: false }
          : (result ? { id: result.id, questionId: result.questionid, userId: result.userid, pinned: true } : {});
        return response.status(200).json({
          status: 'success',
          message,
          data: payload
        });
      })
      .catch(error => catchDatabaseConnectionError(error, response));
  }

  /**
    * @static
    * @description Get all pinned questions for the authenticated user.
    */
  static fetchPinnedQuestions(request, response) {
    const userId = request.id;
    dbConnect.query(SqlHelper.getPinnedQuestionsForUser(userId))
      .then((data) => {
        const questions = Array.isArray(data) ? data : (data.rows || []);
        const formatted = formatAllQuestions(questions);
        response.status(200).json({
          status: 'success',
          data: { questions: formatted }
        });
      })
      .catch(error => catchDatabaseConnectionError(error, response));
  }

  /**
    * @static
    *
    * @param {object} request - The request payload sent to the controller
    * @param {object} response - The response payload sent back from the controller
    *
    * @returns {object} - status Message
    *
    * @description This method deletes questions on the database
    * @memberOf QuestionController
    */
  static deleteQuestion(request, response) {
    const { questionId } = request.params;
    dbConnect.query(deleteAQuestion(questionId))
      .then(() => response.status(200).json({
        status: 'success',
        message: 'you have successfully deleted this question'
      }))
      .catch(
        error => catchDatabaseConnectionError(
          `error deleting question on questions table ${error}`,
          response
        )
      );
  }
}
export default QuestionController;
