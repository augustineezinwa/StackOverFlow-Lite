import Helper from '../helper/Helper';
import { questions } from '../dummydata/dummydata';

const { validateField } = Helper;
/**
  * @class QuestionValidation
  *
  * @description Validates input fields on the question object
  */
class QuestionValidation {
  /**
    * @static
    *
    * @param {object} request - The request payload sent to the middleware
    * @param {object} response - The response payload sent back from the middleware
    * @param {object} next - The call back function to resume the next middleware
    *
    * @returns {object} - status Message and the question
    *
    * @description This method validates the question Title of the question object
    * @memberOf QuestionValidation
    */
  static validateQuestionTitle(request, response, next) {
    const { questionTitle } = request.body;
    validateField('questionTitle', questionTitle, response, next);
  }

  /**
    * @static
    *
    * @param {object} request - The request payload sent to the middleware
    * @param {object} response - The response payload sent back from the middleware
    * @param {object} next - The call back function to resume the next middleware
    *
    * @returns {object} - status Message and the question
    *
    * @description This method validates the question description  of the input
    * @memberOf QuestionValidation
    */
  static validateQuestionDescription(request, response, next) {
    const { questionDescription } = request.body;
    validateField('questionDescription', questionDescription, response, next);
  }

  /**
    * @static
    *
    * @param {object} request - The request payload sent to the middleware
    * @param {object} response - The response payload sent back from the middleware
    * @param {object} next - The call back function to resume the next middleware
    *
    * @returns {object} - status Message and the question
    *
    * @description This method validates the existence of a question
    * @memberOf QuestionValidation
    */
  static validateQuestionExistence(request, response, next) {
    const { questionId } = request.params;
    const foundQuestion = questions.find(x => +x.id === +questionId);
    if (!foundQuestion) {
      return response.status(404).json({
        status: 'fail',
        data: {
          message: 'This question does not exist'
        }
      });
    }
    return next();
  }
}

export default QuestionValidation;
