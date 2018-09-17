import questionData from '../../models/dataCenter.js';
import userAuthData from '../../models/userData.js';
import RenderUi from '../../views/RenderUi.js';
import ResourceHelper from '../../helper/ResourceHelper.js';
import routeTable from '../../router/routeTable.js';

const {
  renderAllQuestions, renderModalLoader, renderModal, toggleButton, notifyEmptyResult,
  modifyTitle, renderQuestionWithAnswers, renderNotificationInButton, renderNotification,
  showErrorsOnPostQuestionForm, showErrorsOnPostAnswerForm
} = RenderUi;
const { destroyData } = ResourceHelper;

/**
  * @class QuestionViewController
  *
  * @description this class manages events and views on the questions page.
  */
class QuestionViewController {
  /**
    * @static
    *
    * @returns {object} - binds view to datacenter
    *
    * @description This method binds question views to datacenter;
    * @memberOf QuestionViewController
    */
  static connectQuestionsDisplayToDataCenter() {
    if (!questionData.ready && questionData.fetch) {
      renderModalLoader('modalDisplay', 'block', 'Loading StackOverFlow-Lite');
    }
    if (questionData.ready) renderModalLoader('modalDisplay', 'none', '');
    if (questionData.fail) {
      renderModal('modalDisplay', 'block', 'Internet Connection Error!');
      QuestionViewController.attachSwitchOffModalEvent('shutDownButton', 'modalDisplay');
    }
    if (questionData.data.questions.length > 0) {
      renderModalLoader('modalDisplay', 'none', '');
      if (questionData.fail) {
        renderModal('modalDisplay', 'block', 'Internet Connection Error!');
        QuestionViewController.attachSwitchOffModalEvent('shutDownButton', 'modalDisplay');
      }
      renderAllQuestions('questionsDisplay', 'block',
        questionData.initialCount, questionData.data.questions);
      QuestionViewController.attachViewEvents('viewButton');
      QuestionViewController.attachLoadMoreEvent('loadMore');
    } else {
      notifyEmptyResult('questionsDisplay', 'block', 'No Questions Yet!');
      QuestionViewController.attachrefreshEvent('refresh');
    }
  }


  /**
    * @static
    *
    * @returns {object} - binds view to datacenter
    *
    * @description This method binds searched question views to datacenter;
    * @memberOf QuestionViewController
    */
  static connectSearchQuestionsDisplayToDataCenter() {
    if (!questionData.ready && questionData.fetch) {
      QuestionViewController.bindDataFromSearchBox('searchBox');
      renderModalLoader('modalDisplay', 'block', 'Searching StackOverFlow-Lite');
    }
    if (questionData.ready) renderModalLoader('modalDisplay', 'none', '');
    if (questionData.fail) {
      renderModal('modalDisplay', 'block', 'Internet Connection Error!');
      QuestionViewController.attachSwitchOffModalEvent('shutDownButton', 'modalDisplay');
    }
    if (questionData.data.searchedQuestions.length > 0 && questionData.ready && !questionData.fail) {
      renderModalLoader('modalDisplay', 'none', '');
      renderAllQuestions('questionsDisplay', 'block',
        questionData.initialCount, questionData.data.searchedQuestions);
      QuestionViewController.attachViewEvents('viewButton');
      QuestionViewController.attachLoadMoreEvent('loadMore');
      modifyTitle('dashBoardTitle', 'Search Results', questionData.data.searchedQuestions.length);
    }
    if (questionData.ready && questionData.data.searchedQuestions.length === 0) {
      notifyEmptyResult('questionsDisplay', 'block', 'Sorry! We cant find the question you are looking for!');
      QuestionViewController.attachrefreshEvent('refresh');
      modifyTitle('dashBoardTitle', 'Search Results');
    }
  }

  /**
    * @static
    *
    * @returns {object} - binds view to datacenter
    *
    * @description This method binds a particular question views to datacenter;
    * @memberOf QuestionViewController
    */
  static connectQuestionDetailsDisplayToDataCenter() {
    if (!questionData.ready && questionData.fetch) {
      QuestionViewController.bindDataFromSearchBox('searchBox');
      renderModalLoader('modalDisplay', 'block', 'Loading Question');
    }
    if (questionData.ready) renderModalLoader('modalDisplay', 'none', '');
    if (questionData.fail) {
      renderModal('modalDisplay', 'block', 'Internet Connection Error!');
      QuestionViewController.attachSwitchOffModalEvent('shutDownButton', 'modalDisplay');
    }
    if (questionData.data.questionWithAnswers.id && questionData.ready) {
      renderModalLoader('modalDisplay', 'none', '');
      if (questionData.fail) {
        renderModal('modalDisplay', 'block', 'Internet Connection Error!');
        QuestionViewController.attachSwitchOffModalEvent('shutDownButton', 'modalDisplay');
      }
      renderQuestionWithAnswers('pageDisplay', 'block');
    } else if (questionData.ready) {
      notifyEmptyResult('questionsDisplay', 'block', 'Sorry! Page not found!');
      QuestionViewController.attachrefreshEvent('refresh');
      modifyTitle('dashBoardTitle', 'Oops! An Error Occured');
    }
  }

  /**
    * @static
    *
    * @returns {object} - binds post question views to datacenter
    *
    * @description This method binds post question actions to datacenter;
    * @memberOf QuestionViewController
    */
  static connectPostQuestionOperationToDataCenter() {
    if (!questionData.ready && questionData.fetch) {
      renderNotificationInButton('askNotification', 'block', 'Posting Question...');
    }
    if (questionData.ready) renderNotificationInButton('askNotification', 'block', '', 'Ask');
    if (questionData.ready && questionData.errors.length > 0 && !questionData.fail) {
      if (questionData.errors[0].message.includes('Unauthorized')
          || questionData.errors[0].message.includes('signup')) {
        destroyData('token');
        destroyData('loginStatus');
        questionData.data.loginStatus = 0;
        questionData.data.token = '';
        renderNotification('notificationDisplay', 'block', 'Your session has expired, Please login');
        setTimeout(() => renderNotification('notificationDisplay', 'none'), 4000);
        window.location.reload();
        window.location.hash = '#login';
        return;
      }
      showErrorsOnPostQuestionForm();
    }
    if (questionData.data.postStatus === 1) {
      userAuthData.data.token = '';
      renderNotification('notificationDisplay', 'block', 'You succesfully posted this question');
      setTimeout(() => renderNotification('notificationDisplay', 'none'), 4000);
      window.location.hash = '';
      window.location.reload();
    }
    if (questionData.fail && questionData.ready) {
      renderModal('modalDisplay', 'block', 'Internet Connection Error!');
      QuestionViewController.attachSwitchOffModalEvent('shutDownButton', 'modalDisplay');
    }
  }

  /**
    * @static
    *
    * @returns {object} - binds post question views to datacenter
    *
    * @description This method binds post question actions to datacenter;
    * @memberOf QuestionViewController
    */
  static connectPostAnswerOperationToDataCenter() {
    if (!questionData.ready && questionData.fetch) {
      renderNotificationInButton('answerButton', 'block', 'Posting Answer...');
    }
    if (questionData.ready) renderNotificationInButton('answerButton', 'block', '', 'Add');
    if (questionData.ready && questionData.errors.length > 0 && !questionData.fail) {
      if (questionData.errors[0].message.includes('Unauthorized')
          || questionData.errors[0].message.includes('signup')) {
        destroyData('token');
        destroyData('loginStatus');
        questionData.data.loginStatus = 0;
        questionData.data.token = '';
        renderNotification('notificationDisplay', 'block', 'Your session has expired, Please login');
        setTimeout(() => renderNotification('notificationDisplay', 'none'), 4000);
        window.location.reload();
        window.location.hash = '#login';
        return;
      }
      showErrorsOnPostAnswerForm();
    }
    if (questionData.data.postStatus === 1) {
      userAuthData.data.token = '';
      renderNotification('notificationDisplay', 'block', 'You succesfully answered this question');
      setTimeout(() => renderNotification('notificationDisplay', 'none'), 3500);
      window.location.reload();
    }
    if (questionData.fail && questionData.ready) {
      renderModal('modalDisplay', 'block', 'Internet Connection Error!');
      QuestionViewController.attachSwitchOffModalEvent('shutDownButton', 'modalDisplay');
    }
  }

  /**
    * @static
    *
    * @param {string} elementId - the id of the element
    * @param {string} targetId - the id of the target element
    * @returns {object} - binds view to datacenter
    *
    * @description This method binds question views to datacenter;
    * @memberOf QuestionViewController
    */
  static attachSwitchOffModalEvent(elementId, targetId) {
    const targetDiv = document.getElementById(elementId);
    if (targetDiv) {
      targetDiv.addEventListener('click', () => {
        renderModal(targetId, 'none');
      });
    }
  }

  /**
    * @static
    *
    * @param {string} elementId - the id of the element
    * @param {string} targetId - the id of the target element
    * @returns {object} - binds view to datacenter
    *
    * @description This method binds question views to datacenter;
    * @memberOf QuestionViewController
    */
  static attachrefreshEvent(elementId) {
    const targetDiv = document.getElementById(elementId);
    if (targetDiv) {
      targetDiv.addEventListener('click', () => {
        window.location.reload();
      });
    }
  }


  /**
    * @static
    *
    * @param {string} elementId - the id of the element
    * @param {string} targetId - the id of the target element
    * @returns {object} - binds view to datacenter
    *
    * @description This method loads more questions on the home page;
    * @memberOf QuestionViewController
    */
  static attachLoadMoreEvent(elementId) {
    const targetDiv = document.getElementById(elementId);
    if (targetDiv) targetDiv.addEventListener('click', () => QuestionViewController.loadMoreQuestions());
  }

  /**
    * @static
    *
    * @param {string} className - the className of the buttons
    *
    * @returns {object} - binds view to datacenter
    *
    * @description This method loads more questions on the home page;
    * @memberOf QuestionViewController
    */
  static attachViewEvents(className) {
    const targetButtons = document.querySelectorAll(`.${className}`);
    console.log(targetButtons);
    if (targetButtons.length) {
      targetButtons.forEach(x => x.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(+e.target.attributes);
        console.log(+e.target.attributes[1].value);
        questionData.retrieveId = +e.target.attributes[1].value;
        window.location.hash = `#questions-${questionData.retrieveId}`;
      }));
    }
  }

  /**
    * @static
    *
    * @param {string} className - the className of the buttons
    *
    * @param {string} setDisplay
    * @returns {object} - binds view to datacenter
    *
    * @description This method hides buttons of the same class name;
    * @memberOf QuestionViewController
    */
  static toggleAllByClassName(className, setDisplay = 'none') {
    const targetButtons = document.querySelectorAll(`.${className}`);
    targetButtons.forEach((x) => {
      x.style.display = setDisplay;
    });
  }

  /**
    * @static
    *
    * @param {string} elementId - the id of the search box element
    * @param {string} targetId - the id of the target element
    * @returns {object} -
    *
    * @description This method loads the data from the searchbox to datacenter;
    * @memberOf QuestionViewController
    */
  static bindDataFromSearchBox(elementId) {
    const targetDiv = document.getElementById(elementId);
    questionData.search = targetDiv.value;
  }

  /**
    * @static
    *
    * @param {string} elementId - the id of the element
    * @param {string} targetId - the id of the target element
    * @returns {object} - binds view to datacenter
    *
    * @description This method decides to load more questions from the datacenter;
    * @memberOf QuestionViewController
    */
  static loadMoreQuestions() {
    if (questionData.loadMore < questionData.data.questions.length) {
      let i = questionData.loadMore;
      i += 3;
      if (i > questionData.data.questions.length) {
        i = questionData.data.questions.length;
        questionData.loadMore = i;
        questionData.initialCount = i;
        renderAllQuestions('questionsDisplay', 'block',
          questionData.data.questions.length, questionData.data.questions);
        QuestionViewController.attachViewEvents('viewButton');
      }
      questionData.loadMore = i;
      questionData.initialCount = i;
      renderAllQuestions('questionsDisplay', 'block',
        i, questionData.data.questions);
      QuestionViewController.attachViewEvents('viewButton');
      QuestionViewController.attachLoadMoreEvent('loadMore');
    }
    if (questionData.loadMore > questionData.data.questions.length
    || questionData.loadMore === questionData.data.questions.length) {
      questionData.loadMore = questionData.data.questions.length;
      renderAllQuestions('questionsDisplay', 'block',
        questionData.data.questions.length, questionData.data.questions);
      questionData.initialCount = questionData.data.questions.length;
      toggleButton('loadMore');
      QuestionViewController.attachViewEvents('viewButton');
      QuestionViewController.attachLoadMoreEvent('loadMore');
    }
  }

  /**
    * @static
    *
    * @param {string} questionId - the id of the question
    *
    * @returns {object} - binds view to datacenter
    *
    * @description This method checks for a question in history;
    * @memberOf QuestionViewController
    */
  static searchQuestionInHistory(questionId) {
    const question = questionData.history.find(x => +x.id === +questionId);
    console.log(questionData.history);
    console.log(question);
    if (question) { return 1; } return 0;
  }

  /**
    * @static
    *
    * @param {string} questionId - the id of the question
    *
    * @returns {object} - binds view to datacenter
    *
    * @description This method checks for a question in history;
    * @memberOf QuestionViewController
    */
  static renderQuestionInHistory(questionId) {
    const question = questionData.history.find(x => +x.id === +questionId);
    questionData.data.questionWithAnswers = question;
    renderQuestionWithAnswers('pageDisplay', 'block');
  }
}

export default QuestionViewController;
