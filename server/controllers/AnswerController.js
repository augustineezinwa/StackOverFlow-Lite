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
      answer,
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
}

export default AnswerController;
