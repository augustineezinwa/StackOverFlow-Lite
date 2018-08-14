import { questions } from '../dummydata/dummydata';

/**
  * @class QuestionController
  *
  * @description Performs add and delete operations on questions
  */
class QuestionController {
  /**
        * @static
        *
        * @param {object} req - The request payload sent to the controller
        * @param {object} res - The response payload sent back from the controller
        *
        * @returns {object} - status Message and the question
        *
        * @description This method returns the question object
        * @memberOf QuestionController
        */
  static fetchQuestions(req, res) {
    switch (questions.length) {
      case 0: res.status(404).json({
        status: 'fail',
        data: {
          questions: 'No questions were found!'
        }
      });
        break;

      default: res.status(200).json({
        status: 'success',
        data: { questions }
      });
    }
  }

  /**
        * @static
        *
        * @param {object} req - The request payload sent to the controller
        * @param {object} res - The response payload sent back from the controller
        *
        * @returns {object} - status Message and the question
        *
        * @description This method returns the question object
        * @memberOf QuestionController
        */
  static fetchAQuestion(req, res) {
    const { id } = req.params;
    const fetchedQuestion = questions.filter(x => +x.id === +id);
    switch (fetchedQuestion.length) {
      case 0: res.status(404).json({
        status: 'fail',
        data: {
          question: `question with id ${id} cant be found!`
        }
      });
        break;
      default: res.status(200).json({
        status: 'success',
        data: {
          question: fetchedQuestion[0]
        }
      });
    }
  }
}
export default QuestionController;
