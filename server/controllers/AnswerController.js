import { answers } from '../dummydata/dummydata';
import dbConnect from '../connections/dbConnect';
import { createAnswer, getAllAnswersForAQuestion } from '../helper/sqlHelper';
import { formatAnswers } from '../helper/format';
import CatchErrors from '../helper/CatchErrors';

const { catchDatabaseConnectionError } = CatchErrors;
/**
  * @class AnswerController
  *
  * @description Performs add operations on answers
  */
class AnswerController {
  /**
    * @static
    *
    * @param {object} request - The request payload sent to the controller
    * @param {object} response - The response payload sent back from the controller
    *
    * @returns {object} - status Message and the added answer
    *
    * @description This method returns the answer object
    * @memberOf AnswerController
    */
  static addAnswer(request, response) {
    const { answer } = request.body;
    const questionId = request.data.id;
    dbConnect.query(createAnswer(answer, request.id, questionId))
      .then(data => response.status(201).json({
        status: 'success',
        data: { newAnswer: formatAnswers(data.rows)[0] }
      }))
      .catch(error => catchDatabaseConnectionError(`error writing to answers table ${error}`, response));
  }

  /**
    * @static
    *
    * @param {object} request - The request payload sent to the controller
    * @param {object} response - The response payload sent back from the controller
    * @param {object} next - The callback function to resume the next middleware.
    *
    * @returns {object} - status Message and all answers
    *
    * @description This method returns all answers object
    * @memberOf AnswerController
    */
  static fetchAnswersForAQueston(request, response, next) {
    const { questionId } = request.params;
    dbConnect.query(getAllAnswersForAQuestion(questionId))
      .then((data) => {
        const foundAnswers = formatAnswers(data.rows);
        request.foundAnswers = foundAnswers;
        return next();
      })
      .catch(error => catchDatabaseConnectionError(`error reading answers table ${error}`, response));
  }
}

export default AnswerController;
