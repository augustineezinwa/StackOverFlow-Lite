import QuestionViewController from './QuestionViewController.js';
import QuestionApiController from '../apiControllers/QuestionApiController.js';
import questionData from '../../models/dataCenter.js';
import RenderUi from '../../views/RenderUi.js';

const { fetchQuestions, fetchSearchQuestions, fetchQuestion } = QuestionApiController;
const { connectQuestionsDisplayToDataCenter, searchQuestionInHistory, renderQuestionInHistory } = QuestionViewController;


window.addEventListener('load', () => {
  if (window.location.hash === '') fetchQuestions();
  if (window.location.hash.startsWith('#questions')) {
    const url = window.location.hash.substring(window.location.hash.lastIndexOf('-') + 1);
    questionData.url = url;
    fetchQuestion(url);
  }
});
window.addEventListener('hashchange', () => {
  if (window.location.hash === '') {
    if (questionData.data.questions.length === 0 && !questionData.search) {
      fetchQuestions();
    } else if (!questionData.search) connectQuestionsDisplayToDataCenter();
  }
  if (window.location.hash.startsWith('#questions')) {
    const url = window.location.hash.substring(window.location.hash.lastIndexOf('-') + 1);
    if (searchQuestionInHistory(url)) return renderQuestionInHistory(url);
    questionData.url = url;
    fetchQuestion(url);
  }
});
const searchButton = document.getElementById('searchButton');
const searchBox = document.getElementById('searchBox');
searchButton.addEventListener('click', () => fetchSearchQuestions());
searchBox.addEventListener('keyup', (e) => {
  e.preventDefault();
  if (e.keyCode === 13) searchButton.click();
});
