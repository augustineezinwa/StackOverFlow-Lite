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
        * @param {object} request - The requestuest payload sent to the controller
        * @param {object} response - The responseponse payload sent back from the controller
        *
        * @returns {object} - status Message and the added question
        *
        * @description This method returns the question object
        * @memberOf QuestionController
        */
  static addQuestion(request, response) {
    const { questionTitle, questionDescription } = request.body;
    const questionLength = questions.length;
    const id = questionLength === 0 ? 1 : questions[questionLength - 1].id + 1;
    questions.push({
      id,
      questionTitle: questionTitle.trim(),
      questionDescription: questionDescription.trim(),
      answers: [],
      time: (new Date(Date.now())).toTimeString(),
      date: (new Date(Date.now())).toDateString()
    });
    return response.status(201).json({
      status: 'success',
      data: {
        newQuestion: questions[questions.length - 1]
      }
    });
  }
}
export default QuestionController;
