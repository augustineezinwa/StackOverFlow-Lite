import QuestionViewController from './QuestionViewController.js';
import QuestionApiController from '../apiControllers/QuestionApiController.js';
import questionData from '../../models/dataCenter.js';

const { fetchQuestions, fetchSearchQuestions } = QuestionApiController;
const { connectQuestionsDisplayToDataCenter } = QuestionViewController;

window.addEventListener('load', () => {
  if (window.location.hash === '') fetchQuestions();
});
window.addEventListener('hashchange', () => {
  if (window.location.hash === '') {
    if (questionData.data.questions.length === 0 && !questionData.search) {
      fetchQuestions();
    } else if (!questionData.search) connectQuestionsDisplayToDataCenter();
  }
});
const searchButton = document.getElementById('searchButton');
const searchBox = document.getElementById('searchBox');
searchButton.addEventListener('click', () => fetchSearchQuestions());
searchBox.addEventListener('keyup', (e) => {
  e.preventDefault();
  if (e.keyCode === 13) searchButton.click();
});
