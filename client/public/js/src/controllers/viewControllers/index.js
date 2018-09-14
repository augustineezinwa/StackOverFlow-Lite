import QuestionViewController from './QuestionViewController.js';
import QuestionApiController from '../apiControllers/QuestionApiController.js';
import UserViewController from './UserViewController.js';
import UserApiController from '../apiControllers/UserApiController.js';
import questionData from '../../models/dataCenter.js';
import userAuthData from '../../models/userData.js';
import ResourceHelper from '../../helper/ResourceHelper.js';
import RenderUi from '../../views/RenderUi.js';

const { validateSignup } = UserViewController;
const { signUpUser, loginUser } = UserApiController;
const { fetchQuestions, fetchSearchQuestions, fetchQuestion } = QuestionApiController;
const { connectQuestionsDisplayToDataCenter, searchQuestionInHistory, renderQuestionInHistory } = QuestionViewController;
const { retrieveData } = ResourceHelper;
const { toggleDiv } = RenderUi;

window.addEventListener('load', () => {
  userAuthData.data.loginStatus = retrieveData('loginStatus');
  if (userAuthData.data.loginStatus) {
    toggleDiv('loginLink');
    toggleDiv('signupLink');
  } else {
    toggleDiv('profileLink');
  }
  if (window.location.hash === '') fetchQuestions();
  if (window.location.hash.startsWith('#questions')) {
    const url = window.location.hash.substring(window.location.hash.lastIndexOf('-') + 1);
    questionData.url = url;
    fetchQuestion(url);
  }
  if (window.location.hash === '#signup') {
    const signupButton = document.getElementById('signupButton');
    validateSignup();
    signupButton.addEventListener('click', (e) => {
      const email = document.getElementById('email').value;
      const fullName = document.getElementById('fullName').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      const [firstName, ...lastName] = fullName.split(' ');
      e.preventDefault();
      signUpUser(firstName, lastName.join(''), email, password, confirmPassword);
    });
  }
  if (window.location.hash === '#login') {
    const loginButton = document.getElementById('loginButton');
    loginButton.addEventListener('click', (e) => {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      e.preventDefault();
      loginUser(email, password);
    });
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
  if (window.location.hash === '#signup') {
    const signupButton = document.getElementById('signupButton');
    validateSignup();
    signupButton.addEventListener('click', (e) => {
      const email = document.getElementById('email').value;
      const fullName = document.getElementById('fullName').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      const [firstName, ...lastName] = fullName.split(' ');
      e.preventDefault();
      signUpUser(firstName, lastName.join(''), email, password, confirmPassword);
    });
  }

  if (window.location.hash === '#login') {
    const loginButton = document.getElementById('loginButton');
    loginButton.addEventListener('click', (e) => {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      e.preventDefault();
      loginUser(email, password);
    });
  }
  if (window.location.hash === '#profile' || window.location.hash === '#logout') {
    toggleDiv('logoutLink', 'block');
  } else {
    toggleDiv('logoutLink');
  }
});

const searchButton = document.getElementById('searchButton');
const searchBox = document.getElementById('searchBox');
searchButton.addEventListener('click', () => fetchSearchQuestions());
searchBox.addEventListener('keyup', (e) => {
  e.preventDefault();
  if (e.keyCode === 13) searchButton.click();
});
