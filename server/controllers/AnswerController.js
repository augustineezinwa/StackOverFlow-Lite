import { answers } from '../dummydata/dummydata';

/**
  * @class AnswerController
  *
  * @description Performs add operations on answers
  */
class AnswerController {
  /**
    * @static
    *
    * @param {object} req - The request payload sent to the controller
    * @param {object} res - The response payload sent back from the controller
    *
    * @returns {object} - status Message and the added answer
    *
    * @description This method returns the answer object
    * @memberOf AnswerController
    */
  static addAnswer(req, res) {
    const { answer } = req.body;
    const answerLength = answers.length;
    const id = answerLength === 0 ? 1 : answers[answerLength - 1].id + 1;
    answers.push({
      id,
      answer: answer.trim(),
      comments: [],
      upvotes: 0,
      downvotes: 0,
      mostPreferred: 0,
      questionId: req.params.questionId,
      time: (new Date(Date.now())).toTimeString(),
      date: (new Date(Date.now())).toDateString()
    });
    res.status(201).json({
      status: 'success',
      data: { newAnswer: answers[answers.length - 1] }
    });
  }

  /**
        * @static
        *
        * @param {object} req - The request payload sent to the controller
        * @param {object} res - The response payload sent back from the controller
        *
        * @returns {object} - status Message and all answers
        *
        * @description This method returns all answers object
        * @memberOf AnswerController
        */
  static fetchAnswers(req, res) {
    const { questionId } = req.params;
    const foundAnswers = answers.filter(x => +x.questionId === +questionId);
    if (foundAnswers.length === 0) {
      return res.status(404).json({
        status: 'fail',
        data: {
          message: 'We cant find answers for the specified question'
        }
      });
    }
    return res.status(200).json({
      status: 'success',
      data: { foundAnswers }
    });
  }
}

export default AnswerController;
