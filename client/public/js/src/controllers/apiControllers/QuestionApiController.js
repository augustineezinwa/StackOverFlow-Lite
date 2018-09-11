import questionData from '../../models/dataCenter.js';
import RenderUi from '../../views/RenderUi.js';
import QuestionViewController from '../viewControllers/QuestionViewController.js';

const { connectQuestionsDisplayToDataCenter } = QuestionViewController;
const { renderAllQuestions } = RenderUi;

/**
  * @class QuestionViewController
  *
  * @description this class fetches the all questions api
  */
class QuestionApiController {
  /**
    * @static
    *
    * @returns {object} - fetches questions and pushes it to datacenter
    *
    * @description This method fetches questions from the database and binds it to views
    * @memberOf QuestionApiController
    */
  static fetchQuestions() {
    questionData.errors.length = 0;
    questionData.ready = 0;
    questionData.fail = 0;
    questionData.fetch = 1;
    connectQuestionsDisplayToDataCenter();
    window.fetch('https://stack-o-lite.herokuapp.com/api/v1/questions', {
      headers: {
        'Content-type': 'application/json',
      }
    }).then(response => response.json())
      .then((data) => {
        if (data.status === 'success') {
          questionData.data.questions = data.data.questions;
        }
        console.log(questionData);
        questionData.ready = 1;
        questionData.fetch = 0;
        connectQuestionsDisplayToDataCenter();
      })
      .catch((error) => {
        console.log(`${error}`);
        questionData.errors.push(error);
        questionData.fail = 1;
        questionData.ready = 1;
        questionData.fetch = 0;
        connectQuestionsDisplayToDataCenter();
      });
  }
}

export default QuestionApiController;
