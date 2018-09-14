import questionData from '../../models/dataCenter.js';
import RenderUi from '../../views/RenderUi.js';
import routeTable from '../../router/routeTable.js';

const {
  renderAllQuestions, renderModalLoader, renderModal, toggleButton, notifyEmptyResult,
  modifyTitle, renderQuestionWithAnswers,
} = RenderUi;

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
    window.location.hash = '';
    if (questionData.data.questions.length > 0 && questionData.ready) {
      renderModalLoader('modalDisplay', 'none', '');
      if (questionData.fail) {
        renderModal('modalDisplay', 'block', 'Internet Connection Error!');
        QuestionViewController.attachSwitchOffModalEvent('shutDownButton', 'modalDisplay');
      }
      renderAllQuestions('questionsDisplay', 'block',
        questionData.initialCount, questionData.data.questions);
      QuestionViewController.attachViewEvents('viewButton');
      QuestionViewController.attachLoadMoreEvent('loadMore');
      modifyTitle('dashBoardTitle', 'Search Results', questionData.data.questions.length);
    } else if (questionData.ready) {
      notifyEmptyResult('questionsDisplay', 'block', 'Sorry! We cant find the question you are looking for!');
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
      modifyTitle('dashBoardTitle', 'Oops! An Error Occured');
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
