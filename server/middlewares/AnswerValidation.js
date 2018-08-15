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
        * @param {object} req - The request payload sent to the middleware
        * @param {object} res - The response payload sent back from the middleware
        * @param {object} next - The call back function to resume the next middleware
        *
        * @returns {object} - status Message and the answer
        *
        * @description This method validates the answer
        * @memberOf AnswerValidation
        */
  static validateAnswer(req, res, next) {
    const { answer } = req.body;
    validateField('answer', answer, res, next);
  }
}

export default AnswerValidation;
