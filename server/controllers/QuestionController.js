import { questions } from '../dummydata/dummydata';
import dbConnect from '../connections/dbConnect';
import { createQuestion } from '../helper/sqlHelper';
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
    * @param {object} request - The requestuest payload sent to the controller
    * @param {object} response - The responseponse payload sent back from the controller
    *
    * @returns {object} - status Message and the question
    *
    * @description This method returns the question object
    * @memberOf QuestionController
    */
  static fetchQuestions(request, response) {
    switch (questions.length) {
      case 0: response.status(404).json({
        status: 'fail',
        data: {
          questions: 'No questions were found!'
        }
      });
        break;

      default: response.status(200).json({
        status: 'success',
        data: { questions }
      });
    }
  }

  /**
    * @static
    *
    * @param {object} request - The requestuest payload sent to the controller
    * @param {object} response - The responseponse payload sent back from the controller
    *
    * @returns {object} - status Message and the question
    *
    * @description This method returns the question object
    * @memberOf QuestionController
    */
  static fetchAQuestion(request, response) {
    const { id } = request.params;
    const fetchedQuestion = questions.filter(x => +x.id === +id);
    switch (fetchedQuestion.length) {
      case 0: response.status(404).json({
        status: 'fail',
        data: {
          question: `question with id ${id} cant be found!`
        }
      });
        break;
      default: response.status(200).json({
        status: 'success',
        data: {
          question: fetchedQuestion[0]
        }
      });
    }
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
}
export default QuestionController;
