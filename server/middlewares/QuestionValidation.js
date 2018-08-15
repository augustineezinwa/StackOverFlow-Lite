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
        * @param {object} req - The request payload sent to the middleware
        * @param {object} res - The response payload sent back from the middleware
        * @param {object} next - The call back function to resume the next middleware
        *
        * @returns {object} - status Message and the question
        *
        * @description This method validates the question Title of the question object
        * @memberOf QuestionValidation
        */
  static validateQuestionTitle(req, res, next) {
    const { questionTitle } = req.body;
    validateField('questionTitle', questionTitle, res, next);
  }

  /**
        * @static
        *
        * @param {object} req - The request payload sent to the middleware
        * @param {object} res - The response payload sent back from the middleware
        * @param {object} next - The call back function to resume the next middleware
        *
        * @returns {object} - status Message and the question
        *
        * @description This method validates the  of the question title  of object
        * @memberOf QuestionValidation
        */
  static validateQuestionDescription(req, res, next) {
    const { questionDescription } = req.body;
    validateField('questionDescription', questionDescription, res, next);
  }
}

export default QuestionValidation;
