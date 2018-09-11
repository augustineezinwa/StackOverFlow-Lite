import questionData from '../../models/dataCenter.js';
import RenderUi from '../../views/RenderUi.js';

const {
  renderAllQuestions, renderModalLoader, renderModal, toggleButton, notifyEmptyResult
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
      QuestionViewController.attachLoadMoreEvent('loadMore');
    } else {
      notifyEmptyResult('questionsDisplay', 'block', 'No Questions Yet!');
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
    if (targetDiv) targetDiv.addEventListener('click', () => renderModal(targetId, 'none'));
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
      }
      questionData.loadMore = i;
      questionData.initialCount = i;
      renderAllQuestions('questionsDisplay', 'block',
        i, questionData.data.questions);
      QuestionViewController.attachLoadMoreEvent('loadMore');
    }
    if (questionData.loadMore > questionData.data.questions.length
    || questionData.loadMore === questionData.data.questions.length) {
      questionData.loadMore = questionData.data.questions.length;
      renderAllQuestions('questionsDisplay', 'block',
        questionData.data.questions.length, questionData.data.questions);
      questionData.initialCount = questionData.data.questions.length;
      toggleButton('loadMore');
      QuestionViewController.attachLoadMoreEvent('loadMore');
    }
  }
}

export default QuestionViewController;
