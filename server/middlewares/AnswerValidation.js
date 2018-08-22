import Helper from '../helper/Helper';

const { validateField } = Helper;
/**
  * @class AnswerValidation
  *
  * @description Validates input fields on the answer object
  */
class AnswerValidation {
  /**
    * @static
    *
    * @param {object} request - The request payload sent to the middleware
    * @param {object} response - The response payload sent back from the middleware
    * @param {object} next - The call back function to resume the next middleware
    *
    * @returns {object} - status Message and the answer
    *
    * @description This method validates the answer
    * @memberOf AnswerValidation
    */
  static validateAnswer(request, response, next) {
    const { answer } = request.body;
    validateField('answer', answer, response, next);
  }
}

export default AnswerValidation;
