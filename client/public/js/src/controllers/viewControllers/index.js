import QuestionViewController from './QuestionViewController.js';
import QuestionApiController from '../apiControllers/QuestionApiController.js';
import UserViewController from './UserViewController.js';
import UserApiController from '../apiControllers/UserApiController.js';
import questionData from '../../models/dataCenter.js';
import userAuthData from '../../models/userData.js';
import ResourceHelper from '../../helper/ResourceHelper.js';
import RenderUi from '../../views/RenderUi.js';


const { validateSignup, loginOnDemand, connectfetchUserProfileOperationToDataCenter } = UserViewController;
const { signUpUser, loginUser, fetchUserProfile } = UserApiController;
const {
  fetchQuestions, fetchSearchQuestions, fetchQuestion, postQuestion, postAnswer
} = QuestionApiController;
const { connectQuestionsDisplayToDataCenter, searchQuestionInHistory, renderQuestionInHistory } = QuestionViewController;
const { retrieveData, destroyData } = ResourceHelper;
const { toggleDiv, renderNotification } = RenderUi;


const signupAction = () => {
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
};

const loginAction = () => {
  const loginButton = document.getElementById('loginButton');
  loginButton.addEventListener('click', (e) => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    e.preventDefault();
    loginUser(email, password);
  });
};

const askAction = () => {
  const askButton = document.getElementById('askButton');
  askButton.addEventListener('click', (e) => {
    e.preventDefault();
    const questionTitle = document.getElementById('questionTitle').value;
    const questionDescription = document.getElementById('questionDescription').value;

    if (!userAuthData.data.loginStatus) userAuthData.data.loginStatus = retrieveData('loginStatus');
    if (!userAuthData.data.loginStatus) {
      destroyData('loginStatus');
      return loginOnDemand('a question');
    }
    if (!userAuthData.data.token) {
      userAuthData.data.token = retrieveData('token');
    }
    postQuestion(questionTitle, questionDescription);
  });
};

const logoutAction = () => {
  const logoutButton = document.getElementById('logoutLink');
  logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    destroyData('loginStatus');
    destroyData('token');
    renderNotification('notificationDisplay', 'block', 'You have logged out');
    setTimeout(() => renderNotification('notificationDisplay', 'none'), 4500);
    window.location.reload();
    window.location.hash = '';
  });
};

const forceLogout = () => {
  if (!userAuthData.data.loginStatus) userAuthData.data.loginStatus = retrieveData('loginStatus');
  if (!userAuthData.data.loginStatus) {
    destroyData('loginStatus');
    window.location.reload();
    window.location.hash = '';
  }
};

const pageDisplay = document.getElementById('pageDisplay');
pageDisplay.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.id === 'refresh') window.location.reload();
  if (e.target.id === 'answerButton') {
    const answer = document.getElementById('answer').value;
    e.preventDefault();
    if (!userAuthData.data.loginStatus) userAuthData.data.loginStatus = retrieveData('loginStatus');
    if (!userAuthData.data.loginStatus) {
      destroyData('loginStatus');
      return UserViewController.loginOnDemand('an answer');
    }
    if (!userAuthData.data.token) {
      userAuthData.data.token = retrieveData('token');
    }
    postAnswer(answer, +e.target.attributes[1].value);
  }
});

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
    if (userAuthData.data.loginStatus) window.location.hash = ''; else { signupAction(); }
  }

  if (window.location.hash === '#login') {
    if (userAuthData.data.loginStatus) window.location.hash = ''; else { loginAction(); }
  }
  if (window.location.hash === '#ask') {
    askAction();
  }

  if (window.location.hash === '#profile') {
    toggleDiv('logoutLink', 'block');
    forceLogout();
    logoutAction();
    if (!userAuthData.data.token) {
      userAuthData.data.token = retrieveData('token');
    }
    fetchUserProfile();
  } else {
    toggleDiv('logoutLink');
  }
});

window.addEventListener('hashchange', () => {
  if (window.location.hash === '') {
    if (questionData.data.questions.length === 0 && !questionData.search) {
      fetchQuestions();
    }
    if (!questionData.search && questionData.data.questions.length > 0) connectQuestionsDisplayToDataCenter();
  }
  if (window.location.hash.startsWith('#questions')) {
    const url = window.location.hash.substring(window.location.hash.lastIndexOf('-') + 1);
    if (searchQuestionInHistory(url)) return renderQuestionInHistory(url);

    questionData.url = url;
    fetchQuestion(url);
  }

  if (window.location.hash === '#signup') {
    if (userAuthData.data.loginStatus) window.location.hash = ''; else { signupAction(); }
  }

  if (window.location.hash === '#login') {
    if (userAuthData.data.loginStatus) window.location.hash = ''; else { loginAction(); }
  }

  if (window.location.hash === '#ask') {
    askAction();
  }

  if (window.location.hash === '#profile' || window.location.hash === '#logout') {
    toggleDiv('logoutLink', 'block');
    forceLogout();
    logoutAction();
    if (!userAuthData.data.token) {
      userAuthData.data.token = retrieveData('token');
    }
    if (!userAuthData.data.profile.length) fetchUserProfile();
    else { connectfetchUserProfileOperationToDataCenter(); }
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
