import QuestionViewController from './QuestionViewController.js';
import QuestionApiController from '../apiControllers/QuestionApiController.js';
import questionData from '../../models/dataCenter.js';

const { fetchQuestions } = QuestionApiController;
const { connectQuestionsDisplayToDataCenter } = QuestionViewController;

window.addEventListener('load', () => {
  if (window.location.hash === '') fetchQuestions();
});
window.addEventListener('hashchange', () => {
  if (window.location.hash === '') {
    if (questionData.data.questions.length === 0) { fetchQuestions(); } else {
      connectQuestionsDisplayToDataCenter();
    }
  }
});
