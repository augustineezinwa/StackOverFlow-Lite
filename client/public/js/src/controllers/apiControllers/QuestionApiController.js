import questionData from '../../models/dataCenter.js';
import userAuthData from '../../models/userData.js';
import ResourceHelper from '../../helper/ResourceHelper.js';
import QuestionViewController from '../viewControllers/QuestionViewController.js';

const {
  connectQuestionsDisplayToDataCenter,
  connectSearchQuestionsDisplayToDataCenter,
  connectQuestionDetailsDisplayToDataCenter,
  connectPostQuestionOperationToDataCenter,
  connectPostAnswerOperationToDataCenter,
  connectUpdateAnswerOperationToDataCenter,
  connectDeleteQuestionOperationToDataCenter
} = QuestionViewController;

const { decrypt } = ResourceHelper;
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

  /**
    * @static
    *
    * @returns {object} - fetches questions and pushes it to datacenter
    *
    * @description This method fetches questions from the database and binds it to views
    * @memberOf QuestionApiController
    */
  static fetchUsers() {
    questionData.errors.length = 0;
    questionData.data.users.length = 0;
    questionData.ready = 0;
    questionData.fail = 0;
    questionData.fetch = 1;
    window.fetch('https://stack-o-lite.herokuapp.com/api/v1/users', {
      headers: {
        'Content-type': 'application/json',
      }
    }).then(response => response.json())
      .then((data) => {
        if (data.status === 'success') {
          questionData.data.users = data.data.users;
        }
        console.log(questionData);
        questionData.ready = 1;
        questionData.fetch = 0;
        connectQuestionDetailsDisplayToDataCenter();
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

  /**
    * @static
    *
    * @returns {object} - searches questions and pushes it to datacenter
    *
    * @description This method searches questions from the database and binds it to views
    * @memberOf QuestionApiController
    */
  static fetchSearchQuestions() {
    questionData.errors.length = 0;
    questionData.data.searchedQuestions.length = 0;
    questionData.ready = 0;
    questionData.fail = 0;
    questionData.fetch = 1;
    connectSearchQuestionsDisplayToDataCenter();
    window.location.hash = '';
    window.fetch(`https://stack-o-lite.herokuapp.com/api/v1/questions?search=${questionData.search}`, {
      headers: {
        'Content-type': 'application/json',
      }
    }).then(response => response.json())
      .then((data) => {
        if (data.status === 'success') {
          questionData.data.searchedQuestions = data.data.questions;
        }
        console.log(questionData);
        questionData.ready = 1;
        questionData.fetch = 0;
        questionData.search = '';
        connectSearchQuestionsDisplayToDataCenter();
      })
      .catch((error) => {
        console.log(`${error}`);
        questionData.errors.push(error);
        questionData.fail = 1;
        questionData.ready = 1;
        questionData.fetch = 0;
        questionData.search = '';
        connectSearchQuestionsDisplayToDataCenter();
      });
  }

  /**
    * @static
    *
    *@param {string} hashData - the id of the question to be fetched
    * @returns {object} - searches questions and pushes it to datacenter
    *
    * @description This method searches questions from the database and binds it to views
    * @memberOf QuestionApiController
    */
  static fetchQuestion(hashData) {
    questionData.errors.length = 0;
    questionData.data.questionWithAnswers.length = 0;
    questionData.ready = 0;
    questionData.fail = 0;
    questionData.fetch = 1;
    connectQuestionDetailsDisplayToDataCenter();
    window.fetch(`https://stack-o-lite.herokuapp.com/api/v1/questions/${questionData.retrieveId || hashData}`, {
      headers: {
        'Content-type': 'application/json',
      }
    }).then(response => response.json())
      .then((data) => {
        if (data.status === 'success') {
          questionData.data.questionWithAnswers = data.data.question;
          questionData.history.push(data.data.question);
          return QuestionApiController.fetchUsers();
        }
        console.log(questionData);
        questionData.ready = 1;
        questionData.fetch = 0;
        connectQuestionDetailsDisplayToDataCenter();
      })
      .catch((error) => {
        console.log(`${error}`);
        questionData.errors.push(error);
        questionData.fail = 1;
        questionData.ready = 1;
        questionData.fetch = 0;
        connectQuestionDetailsDisplayToDataCenter();
      });
  }

  /**
    * @static
    *
    * @param {string} questionTitle - The title of the question to be posted
    * @param {string} questionDescription - The description of the question to be posted.
    *
    * @returns {object} - updates data center
    *
    * @description This method posts a question  in the application
    * @memberOf QuestionApiController
    */
  static postQuestion(questionTitle, questionDescription) {
    questionData.errors.length = 0;
    questionData.data.postStatus = 0;
    questionData.ready = 0;
    questionData.fail = 0;
    questionData.fetch = 1;
    connectPostQuestionOperationToDataCenter();
    window.fetch('https://stack-o-lite.herokuapp.com/api/v1/questions', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        authorization: decrypt('blowfish.io', userAuthData.data.token)
      },
      body: JSON.stringify({
        questionTitle,
        questionDescription
      })
    }).then(response => response.json())
      .then((data) => {
        if (data.status === 'success') {
          questionData.data.postStatus = 1;
          questionData.errors.length = 0;
          questionData.ready = 1;
          questionData.fetch = 0;
          questionData.data.message = data.message;
          connectPostQuestionOperationToDataCenter();
        } else {
          questionData.errors.push(data);
          console.log(questionData);
          questionData.ready = 1;
          questionData.fetch = 0;
          connectPostQuestionOperationToDataCenter();
        }
      })
      .catch((error) => {
        console.log(`${error}`);
        questionData.errors.push(error);
        questionData.fail = 1;
        questionData.ready = 1;
        questionData.fetch = 0;
        connectPostQuestionOperationToDataCenter();
      });
  }

  /**
    * @static
    *
    * @param {string} key - The id of the question to be deleted
    *
    * @returns {object} - updates data center
    *
    * @description This method deletes a question  in the application
    * @memberOf QuestionApiController
    */
  static deleteQuestion(key) {
    questionData.errors.length = 0;
    questionData.data.deleteStatus = 0;
    questionData.ready = 0;
    questionData.fail = 0;
    questionData.fetch = 1;
    connectDeleteQuestionOperationToDataCenter();
    window.fetch(`https://stack-o-lite.herokuapp.com/api/v1/questions/${key}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        authorization: decrypt('blowfish.io', userAuthData.data.token)
      }
    }).then(response => response.json())
      .then((data) => {
        if (data.status === 'success') {
          questionData.data.deleteStatus = 1;
          questionData.errors.length = 0;
          questionData.ready = 1;
          questionData.fetch = 0;
          questionData.data.message = data.message;
          connectDeleteQuestionOperationToDataCenter();
        } else {
          questionData.errors.push(data);
          console.log(questionData);
          questionData.ready = 1;
          questionData.fetch = 0;
          connectDeleteQuestionOperationToDataCenter();
        }
      })
      .catch((error) => {
        console.log(`${error}`);
        questionData.errors.push(error);
        questionData.fail = 1;
        questionData.ready = 1;
        questionData.fetch = 0;
        connectDeleteQuestionOperationToDataCenter();
      });
  }


  /**
    * @static
    *
    * @param {string} answer - The answer to be posted
    * @param {string} questionId - The description of the question to be posted.
    *
    * @returns {object} - updates data center
    *
    * @description This method posts a question  in the application
    * @memberOf QuestionApiController
    */
  static postAnswer(answer, questionId) {
    questionData.errors.length = 0;
    questionData.data.postStatus = 0;
    questionData.ready = 0;
    questionData.fail = 0;
    questionData.fetch = 1;
    connectPostAnswerOperationToDataCenter();
    window.fetch(`https://stack-o-lite.herokuapp.com/api/v1/questions/${questionId}/answers`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        authorization: decrypt('blowfish.io', userAuthData.data.token)
      },
      body: JSON.stringify({
        answer
      })
    }).then(response => response.json())
      .then((data) => {
        if (data.status === 'success') {
          questionData.data.postStatus = 1;
          questionData.errors.length = 0;
          questionData.ready = 1;
          questionData.fetch = 0;
          questionData.data.message = data.message;
          connectPostAnswerOperationToDataCenter();
        } else {
          questionData.errors.push(data);
          console.log(questionData);
          questionData.ready = 1;
          questionData.fetch = 0;
          connectPostAnswerOperationToDataCenter();
        }
      })
      .catch((error) => {
        console.log(`${error}`);
        questionData.errors.push(error);
        questionData.fail = 1;
        questionData.ready = 1;
        questionData.fetch = 0;
        connectPostAnswerOperationToDataCenter();
      });
  }

  /**
    * @static
    *
    * @param {string} answer - The answer to be updated
    * @param {string} keyUrl - The url of the answer to be updated.
    *
    * @returns {object} - updates data center
    *
    * @description This method updates an answer  in the application
    * @memberOf QuestionApiController
    */
  static updateAnswer(answer, keyUrl) {
    questionData.errors.length = 0;
    questionData.data.updateStatus = 0;
    questionData.ready = 0;
    questionData.fail = 0;
    questionData.fetch = 1;
    connectUpdateAnswerOperationToDataCenter();
    window.fetch(`https://stack-o-lite.herokuapp.com/api/v1/questions/${keyUrl}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        authorization: decrypt('blowfish.io', userAuthData.data.token)
      },
      body: JSON.stringify({
        answer
      })
    }).then(response => response.json())
      .then((data) => {
        if (data.status === 'success') {
          questionData.data.updateStatus = 1;
          questionData.errors.length = 0;
          questionData.ready = 1;
          questionData.fetch = 0;
          questionData.data.message = data.message;
          connectUpdateAnswerOperationToDataCenter();
        } else {
          questionData.errors.push(data);
          console.log(questionData);
          questionData.ready = 1;
          questionData.fetch = 0;
          connectUpdateAnswerOperationToDataCenter();
        }
      })
      .catch((error) => {
        console.log(`${error}`);
        questionData.errors.push(error);
        questionData.fail = 1;
        questionData.ready = 1;
        questionData.fetch = 0;
        connectUpdateAnswerOperationToDataCenter();
      });
  }
}

export default QuestionApiController;
