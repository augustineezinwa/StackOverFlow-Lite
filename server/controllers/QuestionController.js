import dbConnect from '../connections/dbConnect';
import {
  createQuestion, getAllQuestions, getAQuestion, deleteAQuestion
} from '../helper/sqlHelper';
import { formatQuestions } from '../helper/format';
import CatchErrors from '../helper/CatchErrors';

const { catchDatabaseConnectionError } = CatchErrors;

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
  static fetchQuestions(request, response) {
    dbConnect.query(getAllQuestions())
      .then((data) => {
        switch (data.rows.length) {
          case 0: response.status(404).json({
            status: 'fail',
            data: {
              questions: 'No questions were found!'
            }
          });
            break;

          default: {
            response.status(200).json({
              status: 'success',
              data: { questions: formatQuestions(data.rows) }
            });
          }
        }
      })
      .catch(error => catchDatabaseConnectionError(`error reading from questions table ${error}`, response));
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
            data: {
              question: 'No question was found!'
            }
          });
            break;

          default: {
            const reformedQuestion = formatQuestions(data.rows)[0];
            reformedQuestion.answers = request.foundAnswers;
            response.status(200).json({
              status: 'success',
              data: { question: reformedQuestion }
            });
          }
        }
      });
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
    const { questionTitle, questionDescription } = request.body;
    dbConnect.query(createQuestion(questionTitle, questionDescription, request.id))
      .then(data => response.status(201).json({
        status: 'success',
        data: {
          newQuestion: formatQuestions(data.rows)[0]
        }
      }))
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
      .then(data => response.status(200).json({
        status: 'success',
        data: {
          message: 'you have successfully deleted this question'
        }
      }))
      .catch(error => catchDatabaseConnectionError(`error deleting question on questions table ${error}`, response));
  }
}
export default QuestionController;
