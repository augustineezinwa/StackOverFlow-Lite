(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dataCenter = require('../../models/dataCenter.js');

var _dataCenter2 = _interopRequireDefault(_dataCenter);

var _userData = require('../../models/userData.js');

var _userData2 = _interopRequireDefault(_userData);

var _ResourceHelper = require('../../helper/ResourceHelper.js');

var _ResourceHelper2 = _interopRequireDefault(_ResourceHelper);

var _QuestionViewController = require('../viewControllers/QuestionViewController.js');

var _QuestionViewController2 = _interopRequireDefault(_QuestionViewController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var connectQuestionsDisplayToDataCenter = _QuestionViewController2.default.connectQuestionsDisplayToDataCenter,
    connectSearchQuestionsDisplayToDataCenter = _QuestionViewController2.default.connectSearchQuestionsDisplayToDataCenter,
    connectQuestionDetailsDisplayToDataCenter = _QuestionViewController2.default.connectQuestionDetailsDisplayToDataCenter,
    connectPostQuestionOperationToDataCenter = _QuestionViewController2.default.connectPostQuestionOperationToDataCenter,
    connectPostAnswerOperationToDataCenter = _QuestionViewController2.default.connectPostAnswerOperationToDataCenter,
    connectUpdateAnswerOperationToDataCenter = _QuestionViewController2.default.connectUpdateAnswerOperationToDataCenter,
    connectDeleteQuestionOperationToDataCenter = _QuestionViewController2.default.connectDeleteQuestionOperationToDataCenter,
    connectPreferAnswerOperationToDataCenter = _QuestionViewController2.default.connectPreferAnswerOperationToDataCenter,
    connectUpvoteAnswerOperationToDataCenter = _QuestionViewController2.default.connectUpvoteAnswerOperationToDataCenter,
    connectDownvoteAnswerOperationToDataCenter = _QuestionViewController2.default.connectDownvoteAnswerOperationToDataCenter,
    connectCommentsDisplayToDataCenter = _QuestionViewController2.default.connectCommentsDisplayToDataCenter,
    connectPostCommentOperationToDataCenter = _QuestionViewController2.default.connectPostCommentOperationToDataCenter;
var decrypt = _ResourceHelper2.default.decrypt;
/**
  * @class QuestionViewController
  *
  * @description this class fetches the all questions api
  */

var QuestionApiController = function () {
  function QuestionApiController() {
    _classCallCheck(this, QuestionApiController);
  }

  _createClass(QuestionApiController, null, [{
    key: 'fetchQuestions',

    /**
      * @static
      *
      * @returns {object} - fetches questions and pushes it to datacenter
      *
      * @description This method fetches questions from the database and binds it to views
      * @memberOf QuestionApiController
      */
    value: function fetchQuestions() {
      _dataCenter2.default.errors.length = 0;
      _dataCenter2.default.ready = 0;
      _dataCenter2.default.fail = 0;
      _dataCenter2.default.fetch = 1;
      connectQuestionsDisplayToDataCenter();
      window.fetch('https://stack-o-lite.herokuapp.com/api/v1/questions', {
        headers: {
          'Content-type': 'application/json'
        }
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.status === 'success') {
          _dataCenter2.default.data.questions = data.data.questions;
        }
        console.log(_dataCenter2.default);
        _dataCenter2.default.ready = 1;
        _dataCenter2.default.fetch = 0;
        connectQuestionsDisplayToDataCenter();
      }).catch(function (error) {
        console.log('' + error);
        _dataCenter2.default.errors.push(error);
        _dataCenter2.default.fail = 1;
        _dataCenter2.default.ready = 1;
        _dataCenter2.default.fetch = 0;
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

  }, {
    key: 'fetchUsers',
    value: function fetchUsers(propertyType) {
      _dataCenter2.default.errors.length = 0;
      _dataCenter2.default.data.users.length = 0;
      _dataCenter2.default.ready = 0;
      _dataCenter2.default.fail = 0;
      _dataCenter2.default.fetch = 1;
      window.fetch('https://stack-o-lite.herokuapp.com/api/v1/users', {
        headers: {
          'Content-type': 'application/json'
        }
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.status === 'success') {
          _dataCenter2.default.data.users = data.data.users;
        }
        console.log(_dataCenter2.default);
        _dataCenter2.default.ready = 1;
        _dataCenter2.default.fetch = 0;
        if (propertyType) connectCommentsDisplayToDataCenter();else {
          connectQuestionDetailsDisplayToDataCenter();
        }
      }).catch(function (error) {
        console.log('' + error);
        _dataCenter2.default.errors.push(error);
        _dataCenter2.default.fail = 1;
        _dataCenter2.default.ready = 1;
        _dataCenter2.default.fetch = 0;
        if (propertyType) connectCommentsDisplayToDataCenter();else {
          connectQuestionDetailsDisplayToDataCenter();
        }
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

  }, {
    key: 'fetchSearchQuestions',
    value: function fetchSearchQuestions() {
      _dataCenter2.default.errors.length = 0;
      _dataCenter2.default.data.searchedQuestions.length = 0;
      _dataCenter2.default.ready = 0;
      _dataCenter2.default.fail = 0;
      _dataCenter2.default.fetch = 1;
      connectSearchQuestionsDisplayToDataCenter();
      window.location.hash = '';
      window.fetch('https://stack-o-lite.herokuapp.com/api/v1/questions?search=' + _dataCenter2.default.search, {
        headers: {
          'Content-type': 'application/json'
        }
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.status === 'success') {
          _dataCenter2.default.data.searchedQuestions = data.data.questions;
        }
        console.log(_dataCenter2.default);
        _dataCenter2.default.ready = 1;
        _dataCenter2.default.fetch = 0;
        _dataCenter2.default.search = '';
        connectSearchQuestionsDisplayToDataCenter();
      }).catch(function (error) {
        console.log('' + error);
        _dataCenter2.default.errors.push(error);
        _dataCenter2.default.fail = 1;
        _dataCenter2.default.ready = 1;
        _dataCenter2.default.fetch = 0;
        _dataCenter2.default.search = '';
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

  }, {
    key: 'fetchQuestion',
    value: function fetchQuestion(hashData) {
      _dataCenter2.default.errors.length = 0;
      _dataCenter2.default.data.questionWithAnswers.length = 0;
      _dataCenter2.default.ready = 0;
      _dataCenter2.default.fail = 0;
      _dataCenter2.default.fetch = 1;
      connectQuestionDetailsDisplayToDataCenter();
      window.fetch('https://stack-o-lite.herokuapp.com/api/v1/questions/' + (_dataCenter2.default.retrieveId || hashData), {
        headers: {
          'Content-type': 'application/json'
        }
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.status === 'success') {
          _dataCenter2.default.data.questionWithAnswers = data.data.question;
          _dataCenter2.default.history.push(data.data.question);
          return QuestionApiController.fetchUsers();
        }
        console.log(_dataCenter2.default);
        _dataCenter2.default.ready = 1;
        _dataCenter2.default.fetch = 0;
        connectQuestionDetailsDisplayToDataCenter();
      }).catch(function (error) {
        console.log('' + error);
        _dataCenter2.default.errors.push(error);
        _dataCenter2.default.fail = 1;
        _dataCenter2.default.ready = 1;
        _dataCenter2.default.fetch = 0;
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

  }, {
    key: 'postQuestion',
    value: function postQuestion(questionTitle, questionDescription) {
      _dataCenter2.default.errors.length = 0;
      _dataCenter2.default.data.postStatus = 0;
      _dataCenter2.default.ready = 0;
      _dataCenter2.default.fail = 0;
      _dataCenter2.default.fetch = 1;
      connectPostQuestionOperationToDataCenter();
      window.fetch('https://stack-o-lite.herokuapp.com/api/v1/questions', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          authorization: decrypt('blowfish.io', _userData2.default.data.token)
        },
        body: JSON.stringify({
          questionTitle: questionTitle,
          questionDescription: questionDescription
        })
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.status === 'success') {
          _dataCenter2.default.data.postStatus = 1;
          _dataCenter2.default.errors.length = 0;
          _dataCenter2.default.ready = 1;
          _dataCenter2.default.fetch = 0;
          _dataCenter2.default.data.message = data.message;
          connectPostQuestionOperationToDataCenter();
        } else {
          _dataCenter2.default.errors.push(data);
          console.log(_dataCenter2.default);
          _dataCenter2.default.ready = 1;
          _dataCenter2.default.fetch = 0;
          connectPostQuestionOperationToDataCenter();
        }
      }).catch(function (error) {
        console.log('' + error);
        _dataCenter2.default.errors.push(error);
        _dataCenter2.default.fail = 1;
        _dataCenter2.default.ready = 1;
        _dataCenter2.default.fetch = 0;
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

  }, {
    key: 'deleteQuestion',
    value: function deleteQuestion(key) {
      _dataCenter2.default.errors.length = 0;
      _dataCenter2.default.data.deleteStatus = 0;
      _dataCenter2.default.ready = 0;
      _dataCenter2.default.fail = 0;
      _dataCenter2.default.fetch = 1;
      connectDeleteQuestionOperationToDataCenter();
      window.fetch('https://stack-o-lite.herokuapp.com/api/v1/questions/' + key, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          authorization: decrypt('blowfish.io', _userData2.default.data.token)
        }
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.status === 'success') {
          _dataCenter2.default.data.deleteStatus = 1;
          _dataCenter2.default.errors.length = 0;
          _dataCenter2.default.ready = 1;
          _dataCenter2.default.fetch = 0;
          _dataCenter2.default.data.message = data.message;
          connectDeleteQuestionOperationToDataCenter();
        } else {
          _dataCenter2.default.errors.push(data);
          console.log(_dataCenter2.default);
          _dataCenter2.default.ready = 1;
          _dataCenter2.default.fetch = 0;
          connectDeleteQuestionOperationToDataCenter();
        }
      }).catch(function (error) {
        console.log('' + error);
        _dataCenter2.default.errors.push(error);
        _dataCenter2.default.fail = 1;
        _dataCenter2.default.ready = 1;
        _dataCenter2.default.fetch = 0;
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

  }, {
    key: 'postAnswer',
    value: function postAnswer(answer, questionId) {
      _dataCenter2.default.errors.length = 0;
      _dataCenter2.default.data.postStatus = 0;
      _dataCenter2.default.ready = 0;
      _dataCenter2.default.fail = 0;
      _dataCenter2.default.fetch = 1;
      connectPostAnswerOperationToDataCenter();
      window.fetch('https://stack-o-lite.herokuapp.com/api/v1/questions/' + questionId + '/answers', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          authorization: decrypt('blowfish.io', _userData2.default.data.token)
        },
        body: JSON.stringify({
          answer: answer
        })
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.status === 'success') {
          _dataCenter2.default.data.postStatus = 1;
          _dataCenter2.default.errors.length = 0;
          _dataCenter2.default.ready = 1;
          _dataCenter2.default.fetch = 0;
          _dataCenter2.default.data.message = data.message;
          connectPostAnswerOperationToDataCenter();
        } else {
          _dataCenter2.default.errors.push(data);
          console.log(_dataCenter2.default);
          _dataCenter2.default.ready = 1;
          _dataCenter2.default.fetch = 0;
          connectPostAnswerOperationToDataCenter();
        }
      }).catch(function (error) {
        console.log('' + error);
        _dataCenter2.default.errors.push(error);
        _dataCenter2.default.fail = 1;
        _dataCenter2.default.ready = 1;
        _dataCenter2.default.fetch = 0;
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

  }, {
    key: 'updateAnswer',
    value: function updateAnswer(answer, keyUrl) {
      _dataCenter2.default.errors.length = 0;
      _dataCenter2.default.data.updateStatus = 0;
      _dataCenter2.default.ready = 0;
      _dataCenter2.default.fail = 0;
      _dataCenter2.default.fetch = 1;
      connectUpdateAnswerOperationToDataCenter();
      window.fetch('https://stack-o-lite.herokuapp.com/api/v1/questions/' + keyUrl, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          authorization: decrypt('blowfish.io', _userData2.default.data.token)
        },
        body: JSON.stringify({
          answer: answer
        })
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.status === 'success') {
          _dataCenter2.default.data.updateStatus = 1;
          _dataCenter2.default.errors.length = 0;
          _dataCenter2.default.ready = 1;
          _dataCenter2.default.fetch = 0;
          _dataCenter2.default.data.message = data.message;
          connectUpdateAnswerOperationToDataCenter();
        } else {
          _dataCenter2.default.errors.push(data);
          console.log(_dataCenter2.default);
          _dataCenter2.default.ready = 1;
          _dataCenter2.default.fetch = 0;
          connectUpdateAnswerOperationToDataCenter();
        }
      }).catch(function (error) {
        console.log('' + error);
        _dataCenter2.default.errors.push(error);
        _dataCenter2.default.fail = 1;
        _dataCenter2.default.ready = 1;
        _dataCenter2.default.fetch = 0;
        connectUpdateAnswerOperationToDataCenter();
      });
    }

    /**
      * @static
      *
      * @param {object} e - the event object
      * @param {string} keyUrl - The url of the answer to be updated.
      *
      * @returns {object} - updates data center
      *
      * @description This method prefers an answer  in the application
      * @memberOf QuestionApiController
      */

  }, {
    key: 'preferAnswer',
    value: function preferAnswer(e, keyUrl) {
      _dataCenter2.default.errors.length = 0;
      _dataCenter2.default.data.preferStatus = 0;
      _dataCenter2.default.ready = 0;
      _dataCenter2.default.fail = 0;
      _dataCenter2.default.fetch = 1;
      connectPreferAnswerOperationToDataCenter(e);
      window.fetch('https://stack-o-lite.herokuapp.com/api/v1/questions/' + keyUrl, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          authorization: decrypt('blowfish.io', _userData2.default.data.token)
        }
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.status === 'success') {
          _dataCenter2.default.data.preferStatus = 1;
          _dataCenter2.default.errors.length = 0;
          _dataCenter2.default.ready = 1;
          _dataCenter2.default.fetch = 0;
          _dataCenter2.default.data.message = data.message;
          connectPreferAnswerOperationToDataCenter(e);
        } else {
          _dataCenter2.default.errors.push(data);
          console.log(_dataCenter2.default);
          _dataCenter2.default.ready = 1;
          _dataCenter2.default.fetch = 0;
          connectPreferAnswerOperationToDataCenter(e);
        }
      }).catch(function (error) {
        console.log('' + error);
        _dataCenter2.default.errors.push(error);
        _dataCenter2.default.fail = 1;
        _dataCenter2.default.ready = 1;
        _dataCenter2.default.fetch = 0;
        connectPreferAnswerOperationToDataCenter(e);
      });
    }

    /**
      * @static
      *
      * @param {object} e - the event object
      * @param {string} keyUrl - The url of the answer to be updated.
      *
      * @returns {object} - updates data center
      *
      * @description This method upovtes an answer  in the application
      * @memberOf QuestionApiController
      */

  }, {
    key: 'upvoteAnswer',
    value: function upvoteAnswer(e, keyUrl) {
      _dataCenter2.default.errors.length = 0;
      _dataCenter2.default.data.upvoteStatus = 0;
      _dataCenter2.default.ready = 0;
      _dataCenter2.default.fail = 0;
      _dataCenter2.default.fetch = 1;
      connectUpvoteAnswerOperationToDataCenter(e);
      window.fetch('https://stack-o-lite.herokuapp.com/api/v1/questions/' + keyUrl + '/upvote', {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          authorization: decrypt('blowfish.io', _userData2.default.data.token)
        }
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.status === 'success') {
          _dataCenter2.default.data.upvoteStatus = 1;
          _dataCenter2.default.errors.length = 0;
          _dataCenter2.default.ready = 1;
          _dataCenter2.default.fetch = 0;
          _dataCenter2.default.data.message = data.message;
          connectUpvoteAnswerOperationToDataCenter(e);
        } else {
          _dataCenter2.default.errors.push(data);
          console.log(_dataCenter2.default);
          _dataCenter2.default.ready = 1;
          _dataCenter2.default.fetch = 0;
          connectUpvoteAnswerOperationToDataCenter(e);
        }
      }).catch(function (error) {
        console.log('' + error);
        _dataCenter2.default.errors.push(error);
        _dataCenter2.default.fail = 1;
        _dataCenter2.default.ready = 1;
        _dataCenter2.default.fetch = 0;
        connectUpvoteAnswerOperationToDataCenter(e);
      });
    }

    /**
      * @static
      *
      * @param {object} e - the event object
      * @param {string} keyUrl - The url of the answer to be updated.
      *
      * @returns {object} - updates data center
      *
      * @description This method upovtes an answer  in the application
      * @memberOf QuestionApiController
      */

  }, {
    key: 'downvoteAnswer',
    value: function downvoteAnswer(e, keyUrl) {
      _dataCenter2.default.errors.length = 0;
      _dataCenter2.default.data.downvoteStatus = 0;
      _dataCenter2.default.ready = 0;
      _dataCenter2.default.fail = 0;
      _dataCenter2.default.fetch = 1;
      connectDownvoteAnswerOperationToDataCenter(e);
      window.fetch('https://stack-o-lite.herokuapp.com/api/v1/questions/' + keyUrl + '/downvote', {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          authorization: decrypt('blowfish.io', _userData2.default.data.token)
        }
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.status === 'success') {
          _dataCenter2.default.data.downvoteStatus = 1;
          _dataCenter2.default.errors.length = 0;
          _dataCenter2.default.ready = 1;
          _dataCenter2.default.fetch = 0;
          _dataCenter2.default.data.message = data.message;
          connectDownvoteAnswerOperationToDataCenter(e);
        } else {
          _dataCenter2.default.errors.push(data);
          console.log(_dataCenter2.default);
          _dataCenter2.default.ready = 1;
          _dataCenter2.default.fetch = 0;
          connectDownvoteAnswerOperationToDataCenter(e);
        }
      }).catch(function (error) {
        console.log('' + error);
        _dataCenter2.default.errors.push(error);
        _dataCenter2.default.fail = 1;
        _dataCenter2.default.ready = 1;
        _dataCenter2.default.fetch = 0;
        connectDownvoteAnswerOperationToDataCenter(e);
      });
    }

    /**
      * @static
      *
      *@param {string} keyUrl - the id of the comment to be fetched
      * @returns {object} - searches comments and pushes it to datacenter
      *
      * @description This method fetches comments from the database and binds to datacenter.
      * @memberOf QuestionApiController
      */

  }, {
    key: 'fetchComment',
    value: function fetchComment(keyUrl) {
      _dataCenter2.default.errors.length = 0;
      _dataCenter2.default.data.answerWithComments.length = 0;
      _dataCenter2.default.ready = 0;
      _dataCenter2.default.fail = 0;
      _dataCenter2.default.fetch = 1;
      connectCommentsDisplayToDataCenter();
      window.fetch('https://stack-o-lite.herokuapp.com/api/v1/questions/' + keyUrl, {
        headers: {
          'Content-type': 'application/json'
        }
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.status === 'success') {
          _dataCenter2.default.data.answerWithComments = data.data.answer;
          _dataCenter2.default.answerHistory.push(data.data.answer);
          return QuestionApiController.fetchUsers('comments');
        }
        console.log(_dataCenter2.default);
        _dataCenter2.default.ready = 1;
        _dataCenter2.default.fetch = 0;
        connectCommentsDisplayToDataCenter();
      }).catch(function (error) {
        console.log('' + error);
        _dataCenter2.default.errors.push(error);
        _dataCenter2.default.fail = 1;
        _dataCenter2.default.ready = 1;
        _dataCenter2.default.fetch = 0;
        connectCommentsDisplayToDataCenter();
      });
    }

    /**
      * @static
      *
      * @param {string} comment - The comment to be posted
      * @param {string} keyUrl - The url of the answer to be posted
      *
      * @returns {object} - updates data center
      *
      * @description This method posts a question  in the application
      * @memberOf QuestionApiController
      */

  }, {
    key: 'postComment',
    value: function postComment(comment, keyUrl) {
      _dataCenter2.default.errors.length = 0;
      _dataCenter2.default.data.postStatus = 0;
      _dataCenter2.default.ready = 0;
      _dataCenter2.default.fail = 0;
      _dataCenter2.default.fetch = 1;
      connectPostCommentOperationToDataCenter();
      window.fetch('https://stack-o-lite.herokuapp.com/api/v1/questions/' + keyUrl + '/comments', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          authorization: decrypt('blowfish.io', _userData2.default.data.token)
        },
        body: JSON.stringify({
          comment: comment
        })
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.status === 'success') {
          _dataCenter2.default.data.postStatus = 1;
          _dataCenter2.default.errors.length = 0;
          _dataCenter2.default.ready = 1;
          _dataCenter2.default.fetch = 0;
          _dataCenter2.default.data.message = data.message;
          connectPostCommentOperationToDataCenter();
        } else {
          _dataCenter2.default.errors.push(data);
          console.log(_dataCenter2.default);
          _dataCenter2.default.ready = 1;
          _dataCenter2.default.fetch = 0;
          connectPostCommentOperationToDataCenter();
        }
      }).catch(function (error) {
        console.log('' + error);
        _dataCenter2.default.errors.push(error);
        _dataCenter2.default.fail = 1;
        _dataCenter2.default.ready = 1;
        _dataCenter2.default.fetch = 0;
        connectPostCommentOperationToDataCenter();
      });
    }
  }]);

  return QuestionApiController;
}();

exports.default = QuestionApiController;

},{"../../helper/ResourceHelper.js":6,"../../models/dataCenter.js":8,"../../models/userData.js":9,"../viewControllers/QuestionViewController.js":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _userData = require('../../models/userData.js');

var _userData2 = _interopRequireDefault(_userData);

var _UserViewController = require('../viewControllers/UserViewController.js');

var _UserViewController2 = _interopRequireDefault(_UserViewController);

var _ResourceHelper = require('../../helper/ResourceHelper.js');

var _ResourceHelper2 = _interopRequireDefault(_ResourceHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var storeData = _ResourceHelper2.default.storeData,
    encrypt = _ResourceHelper2.default.encrypt,
    decrypt = _ResourceHelper2.default.decrypt,
    destroyData = _ResourceHelper2.default.destroyData;
var connectSignUpUserOperationToDataCenter = _UserViewController2.default.connectSignUpUserOperationToDataCenter,
    connectloginUserOperationToDataCenter = _UserViewController2.default.connectloginUserOperationToDataCenter,
    connectfetchUserProfileOperationToDataCenter = _UserViewController2.default.connectfetchUserProfileOperationToDataCenter,
    connectUpdateUserProfileOperationToDataCenter = _UserViewController2.default.connectUpdateUserProfileOperationToDataCenter,
    connectUpdateProfilePhotoOperationToDataCenter = _UserViewController2.default.connectUpdateProfilePhotoOperationToDataCenter;
/**
  * @class UserViewController
  *
  * @description this class manages fetch operations concerning the user
  */

var UserApiController = function () {
  function UserApiController() {
    _classCallCheck(this, UserApiController);
  }

  _createClass(UserApiController, null, [{
    key: 'signUpUser',

    /**
      * @static
      *
      *@param {string} firstName - the first name of the user
      *@param {string} lastName - the last name of the user
      *@param {string} email - the email of the user
      *@param {string} password - the password of the user
      *@param {string} confirmPassword - the password of the user
      * @returns {object} - signups user
      *
      * @description This method signs up in the application
      * @memberOf UserApiController
      */
    value: function signUpUser(firstName, lastName, email, password, confirmPassword) {
      _userData2.default.errors.length = 0;
      _userData2.default.data.loginStatus = 0;
      _userData2.default.ready = 0;
      _userData2.default.fail = 0;
      _userData2.default.fetch = 1;
      connectSignUpUserOperationToDataCenter();
      window.fetch('https://stack-o-lite.herokuapp.com/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'

        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          confirmPassword: confirmPassword
        })
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.status === 'success') {
          _userData2.default.data.loginStatus = 1;
          _userData2.default.errors.length = 0;
          _userData2.default.ready = 1;
          _userData2.default.fetch = 0;
          _userData2.default.data.message = data.message;
          _userData2.default.data.token = encrypt('blowfish.io', data.data.token);
          _userData2.default.data.id = data.data.id;
          connectSignUpUserOperationToDataCenter();
        } else {
          _userData2.default.errors.push(data);
          _userData2.default.ready = 1;
          _userData2.default.fetch = 0;
          connectSignUpUserOperationToDataCenter();
        }
      }).catch(function (error) {
        console.log('' + error);
        _userData2.default.errors.push(error);
        _userData2.default.fail = 1;
        _userData2.default.ready = 1;
        _userData2.default.fetch = 0;
        connectSignUpUserOperationToDataCenter();
      });
    }

    /**
      * @static
      *
      * @param {string} email - the email of the user
      * @param {string} password - the password of the user
      *
      * @returns {object} - logins user
      *
      * @description This method signs up in the application
      * @memberOf UserApiController
      */

  }, {
    key: 'loginUser',
    value: function loginUser(email, password) {
      _userData2.default.errors.length = 0;
      _userData2.default.data.loginStatus = 0;
      _userData2.default.ready = 0;
      _userData2.default.fail = 0;
      _userData2.default.fetch = 1;
      connectloginUserOperationToDataCenter();
      window.fetch('https://stack-o-lite.herokuapp.com/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'

        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        console.log(data);
        if (data.status === 'success') {
          _userData2.default.data.loginStatus = 1;
          _userData2.default.errors.length = 0;
          _userData2.default.ready = 1;
          _userData2.default.fetch = 0;
          _userData2.default.data.message = data.message;
          _userData2.default.data.token = encrypt('blowfish.io', data.data.token);
          _userData2.default.data.id = data.data.id;
          connectloginUserOperationToDataCenter();
        } else {
          _userData2.default.errors.push(data);
          console.log(_userData2.default);
          _userData2.default.ready = 1;
          _userData2.default.fetch = 0;
          connectloginUserOperationToDataCenter();
        }
      }).catch(function (error) {
        console.log('' + error);
        _userData2.default.errors.push(error);
        _userData2.default.fail = 1;
        _userData2.default.ready = 1;
        _userData2.default.fetch = 0;
        connectloginUserOperationToDataCenter();
      });
    }

    /**
      * @static
      *
      *
      * @returns {object} - fetches user profile.
      *
      * @description This method fetches user profile
      * @memberOf UserApiController
      */

  }, {
    key: 'fetchUserProfile',
    value: function fetchUserProfile() {
      _userData2.default.errors.length = 0;
      _userData2.default.data.profile.length = 0;
      _userData2.default.ready = 0;
      _userData2.default.fail = 0;
      _userData2.default.fetch = 1;
      connectfetchUserProfileOperationToDataCenter();
      window.fetch('https://stack-o-lite.herokuapp.com/api/v1/users/profile', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          authorization: decrypt('blowfish.io', _userData2.default.data.token)
        }
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.status === 'success') {
          _userData2.default.errors.length = 0;
          _userData2.default.ready = 1;
          _userData2.default.fetch = 0;
          _userData2.default.data.profile.push(data.data.users);
          console.log(_userData2.default);
          return UserApiController.fetchUserQuestions();
        }
        _userData2.default.errors.push(data);
        console.log(_userData2.default);
        _userData2.default.ready = 1;
        _userData2.default.fetch = 0;
        connectfetchUserProfileOperationToDataCenter();
      }).catch(function (error) {
        console.log('' + error);
        _userData2.default.errors.push(error);
        _userData2.default.fail = 1;
        _userData2.default.ready = 1;
        _userData2.default.fetch = 0;
        connectfetchUserProfileOperationToDataCenter();
      });
    }

    /**
      * @static
      *
      * @param {string} email - the email of the user
      * @param {string} password - the password of the user
      *
      * @returns {object} - logins user
      *
      * @description This method signs up in the application
      * @memberOf UserApiController
      */

  }, {
    key: 'fetchUserQuestions',
    value: function fetchUserQuestions() {
      _userData2.default.errors.length = 0;
      _userData2.default.data.questions.length = 0;
      _userData2.default.ready = 0;
      _userData2.default.fail = 0;
      _userData2.default.fetch = 1;
      connectfetchUserProfileOperationToDataCenter();
      window.fetch('https://stack-o-lite.herokuapp.com/api/v1/users/questions', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          authorization: decrypt('blowfish.io', _userData2.default.data.token)

        }
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        console.log(data);
        if (data.status === 'success') {
          _userData2.default.errors.length = 0;
          _userData2.default.ready = 1;
          _userData2.default.fetch = 0;
          _userData2.default.data.questions = data.data.questions;
          console.log(_userData2.default);
          connectfetchUserProfileOperationToDataCenter();
        } else {
          _userData2.default.errors.push(data);
          console.log(_userData2.default);
          _userData2.default.ready = 1;
          _userData2.default.fetch = 0;
          connectfetchUserProfileOperationToDataCenter();
        }
      }).catch(function (error) {
        console.log('' + error);
        _userData2.default.errors.push(error);
        _userData2.default.fail = 1;
        _userData2.default.ready = 1;
        _userData2.default.fetch = 0;
        connectfetchUserProfileOperationToDataCenter();
      });
    }

    /**
      * @static
      *
      * @param {string} photoUrl - The url of the photo that is stored on the cloud
      * @param {string} company - The new company value to be update
      * @param {string} jobRole - The new job role to be update.
      *
      * @returns {object} - updates data center
      *
      * @description This method binds the update user profile.
      * @memberOf UserApiController
      */

  }, {
    key: 'updateUserProfile',
    value: function updateUserProfile(photoUrl, company, jobRole) {
      _userData2.default.errors.length = 0;
      _userData2.default.data.updateStatus = 0;
      _userData2.default.ready = 0;
      _userData2.default.fail = 0;
      _userData2.default.fetch = 1;
      connectUpdateUserProfileOperationToDataCenter();
      window.fetch('https://stack-o-lite.herokuapp.com/api/v1/users', {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          authorization: decrypt('blowfish.io', _userData2.default.data.token)
        },
        body: JSON.stringify({
          jobRole: jobRole,
          company: company,
          photo: photoUrl
        })
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.status === 'success') {
          _userData2.default.data.updateStatus = 1;
          _userData2.default.errors.length = 0;
          _userData2.default.ready = 1;
          _userData2.default.fetch = 0;
          _userData2.default.data.message = data.message;
          connectUpdateUserProfileOperationToDataCenter();
        } else {
          _userData2.default.errors.push(data);
          console.log(_userData2.default);
          _userData2.default.ready = 1;
          _userData2.default.fetch = 0;
          connectUpdateUserProfileOperationToDataCenter();
        }
      }).catch(function (error) {
        console.log('' + error);
        _userData2.default.errors.push(error);
        _userData2.default.fail = 1;
        _userData2.default.ready = 1;
        _userData2.default.fetch = 0;
        connectUpdateUserProfileOperationToDataCenter();
      });
    }

    /**
      * @static
      *
      * @param {string} photoUrl - The generated url/file of the photo
      * @param {string} company - The new company value to be updated
      * @param {string} jobRole - The new job role to be updated.
      *
      * @returns {object} - updates data center
      *
      * @description This method uploads photo to the cloud
      * @memberOf UserApiController
      */

  }, {
    key: 'updatePhotoToCloud',
    value: function updatePhotoToCloud(photoUrl, company, jobRole) {
      _userData2.default.errors.length = 0;
      _userData2.default.data.updateStatus = 0;
      _userData2.default.data.updatePhotoStatus = 0;
      _userData2.default.ready = 0;
      _userData2.default.fail = 0;
      _userData2.default.fetch = 1;
      connectUpdateProfilePhotoOperationToDataCenter();
      window.fetch('https://api.cloudinary.com/v1_1/stack-o-lite-herokuapp-com/image/upload', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          file: photoUrl,
          upload_preset: 'veralqd6'
        })
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.url) {
          console.log(data);
          _userData2.default.data.updatePhotoStatus = 1;
          _userData2.default.data.photo = data.secure_url;
          _userData2.default.errors.length = 0;
          _userData2.default.ready = 0;
          _userData2.default.fetch = 0;
          _userData2.default.data.message = data.message;
          return UserApiController.updateUserProfile(data.secure_url, company, jobRole);
        }
        _userData2.default.errors.push(data);
        console.log(_userData2.default);
        _userData2.default.ready = 1;
        _userData2.default.fetch = 0;
        connectUpdateProfilePhotoOperationToDataCenter();
      }).catch(function (error) {
        console.log('' + error);
        _userData2.default.errors.push(error);
        _userData2.default.fail = 1;
        _userData2.default.ready = 1;
        _userData2.default.fetch = 0;
        connectUpdateProfilePhotoOperationToDataCenter();
      });
    }
  }]);

  return UserApiController;
}();

exports.default = UserApiController;

},{"../../helper/ResourceHelper.js":6,"../../models/userData.js":9,"../viewControllers/UserViewController.js":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dataCenter = require('../../models/dataCenter.js');

var _dataCenter2 = _interopRequireDefault(_dataCenter);

var _userData = require('../../models/userData.js');

var _userData2 = _interopRequireDefault(_userData);

var _RenderUi = require('../../views/RenderUi.js');

var _RenderUi2 = _interopRequireDefault(_RenderUi);

var _ResourceHelper = require('../../helper/ResourceHelper.js');

var _ResourceHelper2 = _interopRequireDefault(_ResourceHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var renderAllQuestions = _RenderUi2.default.renderAllQuestions,
    renderModalLoader = _RenderUi2.default.renderModalLoader,
    renderModal = _RenderUi2.default.renderModal,
    toggleButton = _RenderUi2.default.toggleButton,
    notifyEmptyResult = _RenderUi2.default.notifyEmptyResult,
    modifyTitle = _RenderUi2.default.modifyTitle,
    renderQuestionWithAnswers = _RenderUi2.default.renderQuestionWithAnswers,
    renderNotificationInButton = _RenderUi2.default.renderNotificationInButton,
    renderNotification = _RenderUi2.default.renderNotification,
    showErrorsOnPostQuestionForm = _RenderUi2.default.showErrorsOnPostQuestionForm,
    showErrorsOnPostAnswerForm = _RenderUi2.default.showErrorsOnPostAnswerForm,
    showErrorsOnUpdateAnswerForm = _RenderUi2.default.showErrorsOnUpdateAnswerForm,
    renderNotificationInStar = _RenderUi2.default.renderNotificationInStar,
    showErrorsOnPreferAnswer = _RenderUi2.default.showErrorsOnPreferAnswer,
    clearNotificationsInStar = _RenderUi2.default.clearNotificationsInStar,
    showErrorsOnVoteAnswer = _RenderUi2.default.showErrorsOnVoteAnswer,
    renderAnswerWithComments = _RenderUi2.default.renderAnswerWithComments,
    showErrorsOnPostCommentForm = _RenderUi2.default.showErrorsOnPostCommentForm;
var destroyData = _ResourceHelper2.default.destroyData;

/**
  * @class QuestionViewController
  *
  * @description this class manages events and views on the questions page.
  */

var QuestionViewController = function () {
  function QuestionViewController() {
    _classCallCheck(this, QuestionViewController);
  }

  _createClass(QuestionViewController, null, [{
    key: 'connectQuestionsDisplayToDataCenter',

    /**
      * @static
      *
      * @returns {object} - binds view to datacenter
      *
      * @description This method binds question views to datacenter;
      * @memberOf QuestionViewController
      */
    value: function connectQuestionsDisplayToDataCenter() {
      if (!_dataCenter2.default.ready && _dataCenter2.default.fetch) {
        renderModalLoader('modalDisplay', 'block', 'Loading StackOverFlow-Lite');
      }
      if (_dataCenter2.default.ready) renderModalLoader('modalDisplay', 'none', '');
      if (_dataCenter2.default.fail) {
        renderModal('modalDisplay', 'block', 'Internet Connection Error!');
        QuestionViewController.attachSwitchOffModalEvent('shutDownButton', 'modalDisplay');
      }
      if (_dataCenter2.default.data.questions.length > 0) {
        renderModalLoader('modalDisplay', 'none', '');
        if (_dataCenter2.default.fail) {
          renderModal('modalDisplay', 'block', 'Internet Connection Error!');
          QuestionViewController.attachSwitchOffModalEvent('shutDownButton', 'modalDisplay');
        }
        renderAllQuestions('questionsDisplay', 'block', _dataCenter2.default.initialCount, _dataCenter2.default.data.questions);
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

  }, {
    key: 'connectSearchQuestionsDisplayToDataCenter',
    value: function connectSearchQuestionsDisplayToDataCenter() {
      if (!_dataCenter2.default.ready && _dataCenter2.default.fetch) {
        QuestionViewController.bindDataFromSearchBox('searchBox');
        renderModalLoader('modalDisplay', 'block', 'Searching StackOverFlow-Lite');
      }
      if (_dataCenter2.default.ready) renderModalLoader('modalDisplay', 'none', '');
      if (_dataCenter2.default.fail) {
        renderModal('modalDisplay', 'block', 'Internet Connection Error!');
        QuestionViewController.attachSwitchOffModalEvent('shutDownButton', 'modalDisplay');
      }
      if (_dataCenter2.default.data.searchedQuestions.length > 0 && _dataCenter2.default.ready && !_dataCenter2.default.fail) {
        renderModalLoader('modalDisplay', 'none', '');
        renderAllQuestions('questionsDisplay', 'block', _dataCenter2.default.initialCount, _dataCenter2.default.data.searchedQuestions);
        QuestionViewController.attachViewEvents('viewButton');
        QuestionViewController.attachLoadMoreEvent('loadMore');
        modifyTitle('dashBoardTitle', 'Search Results', _dataCenter2.default.data.searchedQuestions.length);
      }
      if (_dataCenter2.default.ready && _dataCenter2.default.data.searchedQuestions.length === 0) {
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

  }, {
    key: 'connectQuestionDetailsDisplayToDataCenter',
    value: function connectQuestionDetailsDisplayToDataCenter() {
      if (!_dataCenter2.default.ready && _dataCenter2.default.fetch) {
        QuestionViewController.bindDataFromSearchBox('searchBox');
        renderModalLoader('modalDisplay', 'block', 'Loading Question');
      }
      if (_dataCenter2.default.ready) renderModalLoader('modalDisplay', 'none', '');
      if (_dataCenter2.default.fail) {
        renderModal('modalDisplay', 'block', 'Internet Connection Error!');
        QuestionViewController.attachSwitchOffModalEvent('shutDownButton', 'modalDisplay');
      }
      if (_dataCenter2.default.data.questionWithAnswers.id && _dataCenter2.default.ready) {
        renderModalLoader('modalDisplay', 'none', '');
        if (_dataCenter2.default.fail) {
          renderModal('modalDisplay', 'block', 'Internet Connection Error!');
          QuestionViewController.attachSwitchOffModalEvent('shutDownButton', 'modalDisplay');
        }
        renderQuestionWithAnswers('pageDisplay', 'block');
      } else if (_dataCenter2.default.ready) {
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

  }, {
    key: 'connectPostQuestionOperationToDataCenter',
    value: function connectPostQuestionOperationToDataCenter() {
      if (!_dataCenter2.default.ready && _dataCenter2.default.fetch) {
        renderNotificationInButton('askNotification', 'block', 'Posting Question...');
      }
      if (_dataCenter2.default.ready) renderNotificationInButton('askNotification', 'block', '', 'Ask');
      if (_dataCenter2.default.ready && _dataCenter2.default.errors.length > 0 && !_dataCenter2.default.fail) {
        if (_dataCenter2.default.errors[0].message.includes('Unauthorized') || _dataCenter2.default.errors[0].message.includes('signup')) {
          destroyData('token');
          destroyData('loginStatus');
          destroyData('loginId');
          _dataCenter2.default.data.loginStatus = 0;
          _dataCenter2.default.data.token = '';
          renderNotification('notificationDisplay', 'block', 'Your session has expired, Please login');
          setTimeout(function () {
            return renderNotification('notificationDisplay', 'none');
          }, 4000);
          window.location.reload();
          window.location.hash = '#login';
          return;
        }
        showErrorsOnPostQuestionForm();
      }
      if (_dataCenter2.default.data.postStatus === 1) {
        _userData2.default.data.token = '';
        renderNotification('notificationDisplay', 'block', 'You succesfully posted this question');
        setTimeout(function () {
          return renderNotification('notificationDisplay', 'none');
        }, 4000);
        window.location.hash = '';
        window.location.reload();
      }
      if (_dataCenter2.default.fail && _dataCenter2.default.ready) {
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

  }, {
    key: 'connectDeleteQuestionOperationToDataCenter',
    value: function connectDeleteQuestionOperationToDataCenter() {
      if (!_dataCenter2.default.ready && _dataCenter2.default.fetch) {
        renderModalLoader('modalDisplay', 'block', 'Deleting Question');
      }
      if (_dataCenter2.default.ready) renderModalLoader('modalDisplay', 'none', '');
      if (_dataCenter2.default.ready && _dataCenter2.default.errors.length > 0 && !_dataCenter2.default.fail) {
        if (_dataCenter2.default.errors[0].message.includes('Unauthorized') || _dataCenter2.default.errors[0].message.includes('signup')) {
          destroyData('token');
          destroyData('loginStatus');
          destroyData('loginId');
          _dataCenter2.default.data.loginStatus = 0;
          _dataCenter2.default.data.token = '';
          renderNotification('notificationDisplay', 'block', 'Your session has expired, Please login');
          setTimeout(function () {
            return renderNotification('notificationDisplay', 'none');
          }, 4000);
          window.location.reload();
          window.location.hash = '#login';
          return;
        }
      }
      if (_dataCenter2.default.data.deleteStatus === 1) {
        _userData2.default.data.token = '';
        renderNotification('notificationDisplay', 'block', 'You succesfully deleted this question');
        setTimeout(function () {
          return renderNotification('notificationDisplay', 'none');
        }, 4000);
        window.location.hash = '';
        window.location.reload();
      }
      if (_dataCenter2.default.fail && _dataCenter2.default.ready) {
        renderModal('modalDisplay', 'block', 'Internet Connection Error!');
        QuestionViewController.attachSwitchOffModalEvent('shutDownButton', 'modalDisplay');
      }
    }

    /**
      * @static
      *
      * @returns {object} - binds view to datacenter
      *
      * @description This method binds and display an answer with all comments  to datacenter;
      * @memberOf QuestionViewController
      */

  }, {
    key: 'connectCommentsDisplayToDataCenter',
    value: function connectCommentsDisplayToDataCenter() {
      if (!_dataCenter2.default.ready && _dataCenter2.default.fetch) {
        QuestionViewController.bindDataFromSearchBox('searchBox');
        renderModalLoader('modalDisplay', 'block', 'Loading Comments');
      }
      if (_dataCenter2.default.ready) renderModalLoader('modalDisplay', 'none', '');
      if (_dataCenter2.default.fail) {
        renderModal('modalDisplay', 'block', 'Internet Connection Error!');
        QuestionViewController.attachSwitchOffModalEvent('shutDownButton', 'modalDisplay');
      }
      if (_dataCenter2.default.data.answerWithComments.id && _dataCenter2.default.ready) {
        renderModalLoader('modalDisplay', 'none', '');
        if (_dataCenter2.default.fail) {
          renderModal('modalDisplay', 'block', 'Internet Connection Error!');
          QuestionViewController.attachSwitchOffModalEvent('shutDownButton', 'modalDisplay');
        }
        renderAnswerWithComments('pageDisplay', 'block');
      } else if (_dataCenter2.default.ready) {
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

  }, {
    key: 'connectPostAnswerOperationToDataCenter',
    value: function connectPostAnswerOperationToDataCenter() {
      if (!_dataCenter2.default.ready && _dataCenter2.default.fetch) {
        renderNotificationInButton('answerButton', 'block', 'Posting Answer...');
      }
      if (_dataCenter2.default.ready) renderNotificationInButton('answerButton', 'block', '', 'Add');
      if (_dataCenter2.default.ready && _dataCenter2.default.errors.length > 0 && !_dataCenter2.default.fail) {
        if (_dataCenter2.default.errors[0].message.includes('Unauthorized') || _dataCenter2.default.errors[0].message.includes('signup')) {
          destroyData('token');
          destroyData('loginStatus');
          destroyData('loginId');
          _dataCenter2.default.data.loginStatus = 0;
          _dataCenter2.default.data.token = '';
          renderNotification('notificationDisplay', 'block', 'Your session has expired, Please login');
          setTimeout(function () {
            return renderNotification('notificationDisplay', 'none');
          }, 4000);
          window.location.reload();
          window.location.hash = '#login';
          return;
        }
        showErrorsOnPostAnswerForm();
      }
      if (_dataCenter2.default.data.postStatus === 1) {
        _userData2.default.data.token = '';
        renderNotification('notificationDisplay', 'block', 'You succesfully answered this question');
        setTimeout(function () {
          return renderNotification('notificationDisplay', 'none');
        }, 3500);
        window.location.reload();
      }
      if (_dataCenter2.default.fail && _dataCenter2.default.ready) {
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

  }, {
    key: 'connectUpdateAnswerOperationToDataCenter',
    value: function connectUpdateAnswerOperationToDataCenter() {
      if (!_dataCenter2.default.ready && _dataCenter2.default.fetch) {
        renderNotificationInButton('updateAnswerButton', 'block', 'Updating Answer...');
      }
      if (_dataCenter2.default.ready) renderNotificationInButton('updateAnswerButton', 'block', '', 'Update');
      if (_dataCenter2.default.ready && _dataCenter2.default.errors.length > 0 && !_dataCenter2.default.fail) {
        if (_dataCenter2.default.errors[0].message.includes('Unauthorized') || _dataCenter2.default.errors[0].message.includes('signup')) {
          destroyData('token');
          destroyData('loginStatus');
          destroyData('loginId');
          _dataCenter2.default.data.loginStatus = 0;
          _dataCenter2.default.data.token = '';
          renderNotification('notificationDisplay', 'block', 'Your session has expired, Please login');
          setTimeout(function () {
            return renderNotification('notificationDisplay', 'none');
          }, 4000);
          window.location.reload();
          window.location.hash = '#login';
          return;
        }
        showErrorsOnUpdateAnswerForm();
      }
      if (_dataCenter2.default.data.updateStatus === 1) {
        _userData2.default.data.token = '';
        renderNotification('notificationDisplay', 'block', 'You succesfully updated this answer');
        setTimeout(function () {
          return renderNotification('notificationDisplay', 'none');
        }, 3500);
        renderNotificationInButton('updateAnswerButton', 'block', 'Update was successful ...');
        setTimeout(function () {
          return renderNotificationInButton('updateAnswerButton', 'block', '', 'Update');
        }, 3500);
        window.location.reload();
      }
      if (_dataCenter2.default.fail && _dataCenter2.default.ready) {
        renderModal('modalDisplay', 'block', 'Internet Connection Error!');
        QuestionViewController.attachSwitchOffModalEvent('shutDownButton', 'modalDisplay');
      }
    }

    /**
      * @static
      *
      * @param {object} e - The event object
      * @returns {object} - binds post question views to datacenter
      *
      * @description This method binds post question actions to datacenter;
      * @memberOf QuestionViewController
      */

  }, {
    key: 'connectPreferAnswerOperationToDataCenter',
    value: function connectPreferAnswerOperationToDataCenter(e) {
      if (!_dataCenter2.default.ready && _dataCenter2.default.fetch) {
        renderNotificationInStar(e, e.target.id, 'block', 'hotpink', 0);
      }
      if (_dataCenter2.default.ready) renderNotificationInStar(e, e.target.id, 'block', '', 1);
      if (_dataCenter2.default.ready && _dataCenter2.default.errors.length > 0 && !_dataCenter2.default.fail) {
        if (_dataCenter2.default.errors[0].message.includes('Unauthorized') || _dataCenter2.default.errors[0].message.includes('signup')) {
          destroyData('token');
          destroyData('loginStatus');
          destroyData('loginId');
          _dataCenter2.default.data.loginStatus = 0;
          _dataCenter2.default.data.token = '';
          renderNotification('notificationDisplay', 'block', 'Your session has expired, Please login');
          setTimeout(function () {
            return renderNotification('notificationDisplay', 'none');
          }, 4000);
          window.location.reload();
          window.location.hash = '#login';
          return;
        }
        showErrorsOnPreferAnswer();
      }
      if (_dataCenter2.default.data.preferStatus === 1) {
        _userData2.default.data.token = '';
        renderNotification('notificationDisplay', 'block', 'You succesfully preferred this answer');
        setTimeout(function () {
          return renderNotification('notificationDisplay', 'none');
        }, 3500);
        clearNotificationsInStar();
        renderNotificationInStar(e, e.target.id, 'block', 'hotpink', 1, 1);
      }
      if (_dataCenter2.default.fail && _dataCenter2.default.ready) {
        renderModal('modalDisplay', 'block', 'Internet Connection Error!');
        QuestionViewController.attachSwitchOffModalEvent('shutDownButton', 'modalDisplay');
      }
    }

    /**
      * @static
      *
      * @param {object} e - The event object
      * @returns {object} - binds post question views to datacenter
      *
      * @description This method binds upvote answer actions to datacenter;
      * @memberOf QuestionViewController
      */

  }, {
    key: 'connectUpvoteAnswerOperationToDataCenter',
    value: function connectUpvoteAnswerOperationToDataCenter(e) {
      if (!_dataCenter2.default.ready && _dataCenter2.default.fetch) {
        renderNotification('notificationDisplay', 'block', 'Upvoting answer ...');
      }
      if (_dataCenter2.default.ready) renderNotification('notificationDisplay', 'none');
      if (_dataCenter2.default.ready && _dataCenter2.default.errors.length > 0 && !_dataCenter2.default.fail) {
        if (_dataCenter2.default.errors[0].message.includes('Unauthorized') || _dataCenter2.default.errors[0].message.includes('signup')) {
          destroyData('token');
          destroyData('loginStatus');
          destroyData('loginId');
          _dataCenter2.default.data.loginStatus = 0;
          _dataCenter2.default.data.token = '';
          renderNotification('notificationDisplay', 'block', 'Your session has expired, Please login');
          setTimeout(function () {
            return renderNotification('notificationDisplay', 'none');
          }, 4000);
          window.location.reload();
          window.location.hash = '#login';
          return;
        }
        return showErrorsOnVoteAnswer();
      }
      if (_dataCenter2.default.data.upvoteStatus === 1) {
        _userData2.default.data.token = '';
        renderNotification('notificationDisplay', 'block', 'You succesfully upvoted this answer');
        setTimeout(function () {
          return renderNotification('notificationDisplay', 'none');
        }, 3500);
        QuestionViewController.incrementUpvotes(e);
      }
      if (_dataCenter2.default.fail && _dataCenter2.default.ready) {
        renderModal('modalDisplay', 'block', 'Internet Connection Error!');
        QuestionViewController.attachSwitchOffModalEvent('shutDownButton', 'modalDisplay');
      }
    }

    /**
      * @static
      *
      * @param {object} e - The event object
      * @returns {object} - binds post question views to datacenter
      *
      * @description This method binds upvote answer actions to datacenter;
      * @memberOf QuestionViewController
      */

  }, {
    key: 'connectDownvoteAnswerOperationToDataCenter',
    value: function connectDownvoteAnswerOperationToDataCenter(e) {
      if (!_dataCenter2.default.ready && _dataCenter2.default.fetch) {
        renderNotification('notificationDisplay', 'block', 'Downvoting answer ...');
      }
      if (_dataCenter2.default.ready) renderNotification('notificationDisplay', 'none');
      if (_dataCenter2.default.ready && _dataCenter2.default.errors.length > 0 && !_dataCenter2.default.fail) {
        if (_dataCenter2.default.errors[0].message.includes('Unauthorized') || _dataCenter2.default.errors[0].message.includes('signup')) {
          destroyData('token');
          destroyData('loginStatus');
          destroyData('loginId');
          _dataCenter2.default.data.loginStatus = 0;
          _dataCenter2.default.data.token = '';
          renderNotification('notificationDisplay', 'block', 'Your session has expired, Please login');
          setTimeout(function () {
            return renderNotification('notificationDisplay', 'none');
          }, 4000);
          window.location.reload();
          window.location.hash = '#login';
          return;
        }
        return showErrorsOnVoteAnswer();
      }
      if (_dataCenter2.default.data.downvoteStatus === 1) {
        _userData2.default.data.token = '';
        renderNotification('notificationDisplay', 'block', 'You succesfully downvoted this answer');
        setTimeout(function () {
          return renderNotification('notificationDisplay', 'none');
        }, 3500);
        QuestionViewController.incrementDownvotes(e);
      }
      if (_dataCenter2.default.fail && _dataCenter2.default.ready) {
        renderModal('modalDisplay', 'block', 'Internet Connection Error!');
        QuestionViewController.attachSwitchOffModalEvent('shutDownButton', 'modalDisplay');
      }
    }

    /**
      * @static
      *
      * @returns {object} - binds post comment views to datacenter
      *
      * @description This method binds post comment actions to datacenter;
      * @memberOf QuestionViewController
      */

  }, {
    key: 'connectPostCommentOperationToDataCenter',
    value: function connectPostCommentOperationToDataCenter() {
      if (!_dataCenter2.default.ready && _dataCenter2.default.fetch) {
        renderNotificationInButton('commenButton', 'block', 'Posting Comment...');
      }
      if (_dataCenter2.default.ready) renderNotificationInButton('commenButton', 'block', '', 'Add');
      if (_dataCenter2.default.ready && _dataCenter2.default.errors.length > 0 && !_dataCenter2.default.fail) {
        if (_dataCenter2.default.errors[0].message.includes('Unauthorized') || _dataCenter2.default.errors[0].message.includes('signup')) {
          destroyData('token');
          destroyData('loginStatus');
          destroyData('loginId');
          _dataCenter2.default.data.loginStatus = 0;
          _dataCenter2.default.data.token = '';
          renderNotification('notificationDisplay', 'block', 'Your session has expired, Please login');
          setTimeout(function () {
            return renderNotification('notificationDisplay', 'none');
          }, 4000);
          window.location.reload();
          window.location.hash = '#login';
          return;
        }
        showErrorsOnPostCommentForm();
      }
      if (_dataCenter2.default.data.postStatus === 1) {
        _userData2.default.data.token = '';
        renderNotification('notificationDisplay', 'block', 'Comment post was successful');
        setTimeout(function () {
          return renderNotification('notificationDisplay', 'none');
        }, 3500);
        window.location.reload();
      }
      if (_dataCenter2.default.fail && _dataCenter2.default.ready) {
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

  }, {
    key: 'attachSwitchOffModalEvent',
    value: function attachSwitchOffModalEvent(elementId, targetId) {
      var targetDiv = document.getElementById(elementId);
      if (targetDiv) {
        targetDiv.addEventListener('click', function () {
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

  }, {
    key: 'attachrefreshEvent',
    value: function attachrefreshEvent(elementId) {
      var targetDiv = document.getElementById(elementId);
      if (targetDiv) {
        targetDiv.addEventListener('click', function () {
          window.location.reload();
        });
      }
    }

    /**
      * @static
      *
      * @param {string} e - the event object
      * @param {string} targetId - the id of the target element
      * @returns {object} - binds view to datacenter
      *
      * @description This method binds question views to datacenter;
      * @memberOf QuestionViewController
      */

  }, {
    key: 'incrementUpvotes',
    value: function incrementUpvotes(e) {
      console.log(e.target.id);
      var targetId = e.target.id.substring(6);
      var targetDiv = document.getElementById('numUpvotes' + targetId);
      var downvoteDiv = document.getElementById('numDownvotes' + targetId);
      var b = +downvoteDiv.innerText;
      if (b) b -= 1;
      downvoteDiv.innerText = b;
      var a = +targetDiv.innerText;
      a += 1;
      targetDiv.innerText = a;
    }

    /**
      * @static
      *
      * @param {string} e - the event object
      * @param {string} targetId - the id of the target element
      * @returns {object} - binds view to datacenter
      *
      * @description This method binds question views to datacenter;
      * @memberOf QuestionViewController
      */

  }, {
    key: 'incrementDownvotes',
    value: function incrementDownvotes(e) {
      console.log(e.target.id);
      var targetId = e.target.id.substring(8);
      var targetDiv = document.getElementById('numDownvotes' + targetId);
      var upvoteDiv = document.getElementById('numUpvotes' + targetId);
      var b = +upvoteDiv.innerText;
      if (b) b -= 1;
      upvoteDiv.innerText = b;
      var a = +targetDiv.innerText;
      a += 1;
      targetDiv.innerText = a;
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

  }, {
    key: 'attachLoadMoreEvent',
    value: function attachLoadMoreEvent(elementId) {
      var targetDiv = document.getElementById(elementId);
      if (targetDiv) targetDiv.addEventListener('click', function () {
        return QuestionViewController.loadMoreQuestions();
      });
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

  }, {
    key: 'attachViewEvents',
    value: function attachViewEvents(className) {
      var targetButtons = document.querySelectorAll('.' + className);
      if (targetButtons.length) {
        [].concat(_toConsumableArray(targetButtons)).forEach(function (x) {
          return x.addEventListener('click', function (e) {
            e.preventDefault();
            _dataCenter2.default.retrieveId = +e.target.attributes[1].value;
            window.location.hash = '#questions-' + _dataCenter2.default.retrieveId;
          });
        });
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

  }, {
    key: 'toggleAllByClassName',
    value: function toggleAllByClassName(className) {
      var setDisplay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'none';

      var targetButtons = document.querySelectorAll('.' + className);
      [].concat(_toConsumableArray(targetButtons)).forEach(function (x) {
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

  }, {
    key: 'bindDataFromSearchBox',
    value: function bindDataFromSearchBox(elementId) {
      var targetDiv = document.getElementById(elementId);
      _dataCenter2.default.search = targetDiv.value;
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

  }, {
    key: 'loadMoreQuestions',
    value: function loadMoreQuestions() {
      if (_dataCenter2.default.loadMore < _dataCenter2.default.data.questions.length) {
        var i = _dataCenter2.default.loadMore;
        i += 3;
        if (i > _dataCenter2.default.data.questions.length) {
          i = _dataCenter2.default.data.questions.length;
          _dataCenter2.default.loadMore = i;
          _dataCenter2.default.initialCount = i;
          renderAllQuestions('questionsDisplay', 'block', _dataCenter2.default.data.questions.length, _dataCenter2.default.data.questions);
          QuestionViewController.attachViewEvents('viewButton');
        }
        _dataCenter2.default.loadMore = i;
        _dataCenter2.default.initialCount = i;
        renderAllQuestions('questionsDisplay', 'block', i, _dataCenter2.default.data.questions);
        QuestionViewController.attachViewEvents('viewButton');
        QuestionViewController.attachLoadMoreEvent('loadMore');
      }
      if (_dataCenter2.default.loadMore > _dataCenter2.default.data.questions.length || _dataCenter2.default.loadMore === _dataCenter2.default.data.questions.length) {
        _dataCenter2.default.loadMore = _dataCenter2.default.data.questions.length;
        renderAllQuestions('questionsDisplay', 'block', _dataCenter2.default.data.questions.length, _dataCenter2.default.data.questions);
        _dataCenter2.default.initialCount = _dataCenter2.default.data.questions.length;
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

  }, {
    key: 'searchQuestionInHistory',
    value: function searchQuestionInHistory(questionId) {
      var question = _dataCenter2.default.history.find(function (x) {
        return +x.id === +questionId;
      });
      console.log(_dataCenter2.default.history);
      console.log(question);
      if (question) {
        return 1;
      }return 0;
    }

    /**
      * @static
      *
      * @param {string} answerId - the id of the answer
      *
      * @returns {object} - binds view to datacenter
      *
      * @description This method checks for an answer in history;
      * @memberOf QuestionViewController
      */

  }, {
    key: 'searchAnswerInHistory',
    value: function searchAnswerInHistory(answerId) {
      var answer = _dataCenter2.default.answerHistory.find(function (x) {
        return +x.id === +answerId;
      });
      console.log(_dataCenter2.default.answerHistory);
      console.log(answer);
      if (answer) {
        return 1;
      }return 0;
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

  }, {
    key: 'renderQuestionInHistory',
    value: function renderQuestionInHistory(questionId) {
      var question = _dataCenter2.default.history.find(function (x) {
        return +x.id === +questionId;
      });
      _dataCenter2.default.data.questionWithAnswers = question;
      renderQuestionWithAnswers('pageDisplay', 'block');
    }

    /**
      * @static
      *
      * @param {string} answerId - the id of the answer
      *
      * @returns {object} - binds view to datacenter
      *
      * @description This method checks for an answer in history;
      * @memberOf QuestionViewController
      */

  }, {
    key: 'renderAnswerInHistory',
    value: function renderAnswerInHistory(answerId) {
      var answer = _dataCenter2.default.answerHistory.find(function (x) {
        return +x.id === +answerId;
      });
      _dataCenter2.default.data.answerWithComments = answer;
      renderAnswerWithComments('pageDisplay', 'block');
    }
  }]);

  return QuestionViewController;
}();

exports.default = QuestionViewController;

},{"../../helper/ResourceHelper.js":6,"../../models/dataCenter.js":8,"../../models/userData.js":9,"../../views/RenderUi.js":10}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Validation = require('../../helper/Validation.js');

var _Validation2 = _interopRequireDefault(_Validation);

var _RenderUi = require('../../views/RenderUi.js');

var _RenderUi2 = _interopRequireDefault(_RenderUi);

var _userData = require('../../models/userData.js');

var _userData2 = _interopRequireDefault(_userData);

var _QuestionViewController = require('./QuestionViewController.js');

var _QuestionViewController2 = _interopRequireDefault(_QuestionViewController);

var _ResourceHelper = require('../../helper/ResourceHelper.js');

var _ResourceHelper2 = _interopRequireDefault(_ResourceHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var attachSwitchOffModalEvent = _QuestionViewController2.default.attachSwitchOffModalEvent,
    toggleAllByClassName = _QuestionViewController2.default.toggleAllByClassName,
    attachViewEvents = _QuestionViewController2.default.attachViewEvents;
var isValid = _Validation2.default.isValid,
    validateConfirmPassword = _Validation2.default.validateConfirmPassword;
var renderNotifications = _RenderUi2.default.renderNotifications,
    renderNotification = _RenderUi2.default.renderNotification,
    renderNotificationInButton = _RenderUi2.default.renderNotificationInButton,
    renderModal = _RenderUi2.default.renderModal,
    showErrors = _RenderUi2.default.showErrors,
    toggleDiv = _RenderUi2.default.toggleDiv,
    renderModalLoader = _RenderUi2.default.renderModalLoader,
    renderUserProfile = _RenderUi2.default.renderUserProfile,
    renderRecentQuestions = _RenderUi2.default.renderRecentQuestions,
    renderMostAnsweredQuestions = _RenderUi2.default.renderMostAnsweredQuestions,
    showErrorsOnProfileUpdateForm = _RenderUi2.default.showErrorsOnProfileUpdateForm;
var storeData = _ResourceHelper2.default.storeData,
    destroyData = _ResourceHelper2.default.destroyData;
/**
  * @class UserViewController
  *
  * @description this class manages events and views on the signup and login pages
  */

var UserViewController = function () {
  function UserViewController() {
    _classCallCheck(this, UserViewController);
  }

  _createClass(UserViewController, null, [{
    key: 'connectSignUpUserOperationToDataCenter',

    /**
      * @static
      *
      * @returns {object} - binds view to datacenter
      *
      * @description This method binds users actions to datacenter;
      * @memberOf UserViewController
      */
    value: function connectSignUpUserOperationToDataCenter() {
      if (!_userData2.default.ready && _userData2.default.fetch) {
        renderNotificationInButton('signupNotification', 'block', 'Signing up ...');
      }
      if (_userData2.default.ready) renderNotificationInButton('signupNotification', 'block');
      if (_userData2.default.ready && _userData2.default.errors.length > 0) {
        showErrors();
      }
      if (_userData2.default.data.loginStatus === 1) {
        storeData('token', _userData2.default.data.token);
        storeData('loginStatus', 1);
        storeData('loginId', _userData2.default.data.id);
        _userData2.default.data.token = '';
        renderNotification('notificationDisplay', 'block', _userData2.default.data.message);
        setTimeout(function () {
          return renderNotification('notificationDisplay', 'none');
        }, 4000);
        window.location.hash = '';
        toggleDiv('loginLink');
        toggleDiv('signupLink');
        toggleDiv('profileLink', '');
        return window.location.reload();
      }
      if (_userData2.default.fail && _userData2.default.ready) {
        renderModal('modalDisplay', 'block', 'Internet Connection Error!');
        attachSwitchOffModalEvent('shutDownButton', 'modalDisplay');
      }
    }

    /**
      * @static
      *
      * @returns {object} - binds view to datacenter
      *
      * @description This method binds users actions to datacenter;
      * @memberOf UserViewController
      */

  }, {
    key: 'connectloginUserOperationToDataCenter',
    value: function connectloginUserOperationToDataCenter() {
      if (!_userData2.default.ready && _userData2.default.fetch) {
        renderNotificationInButton('loginNotification', 'block', 'Logging in ...');
      }
      if (_userData2.default.ready) renderNotificationInButton('loginNotification', 'block', '', 'Login');
      if (_userData2.default.ready && _userData2.default.errors.length > 0 && !_userData2.default.fail) {
        console.log(_userData2.default.errors);
        renderNotification('notificationDisplay', 'block', _userData2.default.errors[0].message);
        setTimeout(function () {
          return renderNotification('notificationDisplay', 'none');
        }, 4000);
      }
      if (_userData2.default.data.loginStatus === 1) {
        storeData('token', _userData2.default.data.token);
        storeData('loginStatus', 1);
        storeData('loginId', _userData2.default.data.id);
        _userData2.default.data.token = '';
        renderNotification('notificationDisplay', 'block', _userData2.default.data.message);
        setTimeout(function () {
          return renderNotification('notificationDisplay', 'none');
        }, 4000);
        window.location.hash = '';
        toggleDiv('loginLink');
        toggleDiv('signupLink');
        toggleDiv('profileLink', '');
      }
      if (_userData2.default.fail && _userData2.default.ready) {
        renderModal('modalDisplay', 'block', 'Internet Connection Error!');
        attachSwitchOffModalEvent('shutDownButton', 'modalDisplay');
      }
    }

    /**
      * @static
      *
      * @returns {object} - binds view to datacenter
      *
      * @description This method manipulates the views during profile fetch;
      * @memberOf UserViewController
      */

  }, {
    key: 'connectfetchUserProfileOperationToDataCenter',
    value: function connectfetchUserProfileOperationToDataCenter() {
      if (!_userData2.default.ready && _userData2.default.fetch) {
        renderModalLoader('modalDisplay', 'block', 'Loading Profile');
      }
      if (_userData2.default.ready) renderModalLoader('modalDisplay', 'none', '');
      if (_userData2.default.fail) {
        renderModal('modalDisplay', 'block', 'Internet Connection Error!');
        _QuestionViewController2.default.attachSwitchOffModalEvent('shutDownButton', 'modalDisplay');
      }

      if (_userData2.default.ready && _userData2.default.errors.length > 0 && !_userData2.default.fail) {
        console.log(_userData2.default.errors);
        if (_userData2.default.errors[0].message.includes('Unauthorized') || _userData2.default.errors[0].message.includes('signup')) {
          destroyData('token');
          destroyData('loginStatus');
          destroyData('loginId');
          _userData2.default.data.loginStatus = 0;
          _userData2.default.data.token = '';
          renderNotification('notificationDisplay', 'block', 'Your session has expired, Please login');
          setTimeout(function () {
            return renderNotification('notificationDisplay', 'none');
          }, 4000);
          window.location.reload();
          window.location.hash = '#login';
          return;
        }
        if (_userData2.default.data.profile.length > 0 && _userData2.default.ready && _userData2.default.errors[0].message.includes('found')) {
          renderModalLoader('modalDisplay', 'none', '');
          renderUserProfile('profileDisplay', 'block', _userData2.default.data.profile);
          _QuestionViewController2.default.attachrefreshEvent('refresh');
          _QuestionViewController2.default.attachrefreshEvent('refreshTwo');
        }

        if (_userData2.default.data.profile.length === 0 && _userData2.default.ready) {
          renderModalLoader('modalDisplay', 'none', '');
          _QuestionViewController2.default.attachrefreshEvent('refresh');
          _QuestionViewController2.default.attachrefreshEvent('refreshTwo');
        }
      }

      if (_userData2.default.ready && _userData2.default.data.questions.length > 0 && _userData2.default.data.profile.length > 0) {
        renderModalLoader('modalDisplay', 'none', '');
        renderUserProfile('profileDisplay', 'block', _userData2.default.data.profile);
        renderMostAnsweredQuestions('mostAnsweredQuestionsDisplay', 'block', _userData2.default.data.questions);
        renderRecentQuestions('recentQuestionsDisplay', 'block', _userData2.default.data.questions);
        attachViewEvents('viewButton');
        toggleAllByClassName('load');
        _QuestionViewController2.default.attachrefreshEvent('refresh');
        _QuestionViewController2.default.attachrefreshEvent('refreshTwo');
      }
    }

    /**
      * @static
      *
      * @returns {object} - binds update profile views to datacenter
      *
      * @description This method binds update profile actions to datacenter;
      * @memberOf QuestionViewController
      */

  }, {
    key: 'connectUpdateUserProfileOperationToDataCenter',
    value: function connectUpdateUserProfileOperationToDataCenter() {
      if (!_userData2.default.ready && _userData2.default.fetch) {
        console.log('I am here');
        renderNotificationInButton('updateProfileButton', 'block', 'Saving...', '');
      }
      if (_userData2.default.ready) renderNotificationInButton('updateProfileButton', 'block', '', 'Update');
      if (_userData2.default.ready && _userData2.default.errors.length > 0 && !_userData2.default.fail) {
        if (_userData2.default.errors[0].message.includes('Unauthorized') || _userData2.default.errors[0].message.includes('signup')) {
          destroyData('token');
          destroyData('loginStatus');
          destroyData('loginId');
          _userData2.default.data.loginStatus = 0;
          _userData2.default.data.token = '';
          renderNotification('notificationDisplay', 'block', 'Your session has expired, Please login');
          setTimeout(function () {
            return renderNotification('notificationDisplay', 'none');
          }, 4000);
          window.location.reload();
          window.location.hash = '#login';
          return;
        }
        showErrorsOnProfileUpdateForm();
      }
      if (_userData2.default.data.updateStatus === 1) {
        _userData2.default.data.token = '';
        renderNotification('notificationDisplay', 'block', 'Profile update was successful');
        setTimeout(function () {
          return renderNotification('notificationDisplay', 'none');
        }, 3500);
        window.location.reload();
      }
      if (_userData2.default.fail && _userData2.default.ready) {
        renderModal('modalDisplay', 'block', 'Internet Connection Error!');
        _QuestionViewController2.default.attachSwitchOffModalEvent('shutDownButton', 'modalDisplay');
      }
    }

    /**
      * @static
      *
      * @returns {object} - binds update profile views to datacenter
      *
      * @description This method binds update profile actions to datacenter;
      * @memberOf QuestionViewController
      */

  }, {
    key: 'connectUpdateProfilePhotoOperationToDataCenter',
    value: function connectUpdateProfilePhotoOperationToDataCenter() {
      if (!_userData2.default.ready && _userData2.default.fetch) {
        console.log('I am here');
        renderNotificationInButton('updateProfileButton', 'block', 'Uploading Photo...', '');
      }
      if (_userData2.default.ready) renderNotificationInButton('updateProfileButton', 'block', '', 'Update');
      if (_userData2.default.ready && _userData2.default.errors.length > 0 && !_userData2.default.fail) {
        renderNotification('notificationDisplay', 'block', 'Error Occurred uploading profile photo');
        setTimeout(function () {
          return renderNotification('notificationDisplay', 'none');
        }, 4000);
      }
      if (_userData2.default.data.updatePhotoStatus === 1) {
        renderNotification('notificationDisplay', 'block', 'Photo update was successful');
        setTimeout(function () {
          return renderNotification('notificationDisplay', 'none');
        }, 3500);
      }
      if (_userData2.default.fail && _userData2.default.ready) {
        renderModal('modalDisplay', 'block', 'Internet Connection Error!');
        _QuestionViewController2.default.attachSwitchOffModalEvent('shutDownButton', 'modalDisplay');
      }
    }

    /**
    * @static
    *
    * @returns {object} - binds view to datacenter
    *
    * @description This method validates the signup page;
    * @memberOf UserViewController
    */

  }, {
    key: 'validateSignup',
    value: function validateSignup() {
      var email = document.getElementById('email');
      var fullName = document.getElementById('fullName');
      var password = document.getElementById('password');
      var confirmPassword = document.getElementById('confirmPassword');
      email.addEventListener('keyup', function () {
        return UserViewController.validateField(email.value, 'email');
      });
      fullName.addEventListener('keyup', function () {
        return UserViewController.validateField(fullName.value, 'fullName');
      });
      password.addEventListener('keyup', function () {
        return UserViewController.validateField(password.value, 'password');
      });
      confirmPassword.addEventListener('keyup', function () {
        var elementId = 'confirmPasswordNotificationError';
        var indicator = 'goodConfirmPassword';
        var message = '* Password does not match';
        var fieldName = 'confirmPassword';
        if (validateConfirmPassword(password.value, confirmPassword.value) || !password.value) {
          renderNotifications(fieldName, elementId, message, indicator, 'none');
        } else {
          renderNotifications(fieldName, elementId, '', indicator, 'inline', '90%');
        }
      });
    }

    /**
    * @static
    *
    * @param {string} fieldValue - the value of the field
    * @param {string} fieldName - The name of the field under validation
    * @returns {object} - ,manages views on validation
    *
    * @description This method validates each field on the signup page and renders notification to user;
    * @memberOf UserViewController
    */

  }, {
    key: 'validateField',
    value: function validateField(fieldValue, fieldName) {
      var elementId = void 0,
          indicator = void 0,
          message = '';
      if (fieldName === 'fullName') {
        elementId = 'nameNotificationError';indicator = 'goodFullName';
        message = '* Enter Full Name in this format <p>* [firstname lastname]  <= separated by space</p> ';
      }
      if (fieldName === 'email') {
        elementId = 'emailNotificationError';indicator = 'goodEmail';
        message = '* Enter a valid email';
      }
      if (fieldName === 'password') {
        elementId = 'passwordNotificationError';indicator = 'goodPassword';
        message = '* Password must be at least 5 characters and must contain a number or special characters like ^%$&#';
      }
      if (!isValid(fieldValue, fieldName)) renderNotifications(fieldName, elementId, message, indicator, 'none');else renderNotifications(fieldName, elementId, '', indicator, 'inline', '90%');
    }

    /**
    * @static
    *
    * @param {string} message
    * @returns {object} - binds view to datacenter
    *
    * @description This method demands login action from the user;
    * @memberOf UserViewController
    */

  }, {
    key: 'loginOnDemand',
    value: function loginOnDemand(message) {
      renderModal('modalDisplay', 'block', 'Please Login to post ' + message);
      UserViewController.attachRedirectToLoginModalEvent('shutDownButton', 'modalDisplay');
    }

    /**
      * @static
      *
      * @param {string} elementId - the id of the element
      * @param {string} targetId - the id of the target element
      * @returns {object} - binds view to datacenter
      *
      * @description This method redirects the user to login page;
      * @memberOf UserViewController
      */

  }, {
    key: 'attachRedirectToLoginModalEvent',
    value: function attachRedirectToLoginModalEvent(elementId, targetId) {
      var targetDiv = document.getElementById(elementId);
      if (targetDiv) {
        targetDiv.addEventListener('click', function () {
          renderModal(targetId, 'none');
          window.location.hash = '#login';
          return null;
        });
      }
    }
  }]);

  return UserViewController;
}();

exports.default = UserViewController;

},{"../../helper/ResourceHelper.js":6,"../../helper/Validation.js":7,"../../models/userData.js":9,"../../views/RenderUi.js":10,"./QuestionViewController.js":3}],5:[function(require,module,exports){
'use strict';

var _QuestionViewController = require('./QuestionViewController.js');

var _QuestionViewController2 = _interopRequireDefault(_QuestionViewController);

var _QuestionApiController = require('../apiControllers/QuestionApiController.js');

var _QuestionApiController2 = _interopRequireDefault(_QuestionApiController);

var _UserViewController = require('./UserViewController.js');

var _UserViewController2 = _interopRequireDefault(_UserViewController);

var _UserApiController = require('../apiControllers/UserApiController.js');

var _UserApiController2 = _interopRequireDefault(_UserApiController);

var _dataCenter = require('../../models/dataCenter.js');

var _dataCenter2 = _interopRequireDefault(_dataCenter);

var _userData = require('../../models/userData.js');

var _userData2 = _interopRequireDefault(_userData);

var _ResourceHelper = require('../../helper/ResourceHelper.js');

var _ResourceHelper2 = _interopRequireDefault(_ResourceHelper);

var _RenderUi = require('../../views/RenderUi.js');

var _RenderUi2 = _interopRequireDefault(_RenderUi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var retrieveData = _ResourceHelper2.default.retrieveData,
    destroyData = _ResourceHelper2.default.destroyData;
var toggleDiv = _RenderUi2.default.toggleDiv,
    renderNotification = _RenderUi2.default.renderNotification,
    renderNotificationInButton = _RenderUi2.default.renderNotificationInButton,
    togglePhoto = _RenderUi2.default.togglePhoto,
    renderUpdateAnswerPopUp = _RenderUi2.default.renderUpdateAnswerPopUp,
    renderDeleteQuestionPopUpModal = _RenderUi2.default.renderDeleteQuestionPopUpModal;
var validateSignup = _UserViewController2.default.validateSignup,
    loginOnDemand = _UserViewController2.default.loginOnDemand,
    connectfetchUserProfileOperationToDataCenter = _UserViewController2.default.connectfetchUserProfileOperationToDataCenter;
var connectQuestionsDisplayToDataCenter = _QuestionViewController2.default.connectQuestionsDisplayToDataCenter,
    searchQuestionInHistory = _QuestionViewController2.default.searchQuestionInHistory,
    renderQuestionInHistory = _QuestionViewController2.default.renderQuestionInHistory,
    searchAnswerInHistory = _QuestionViewController2.default.searchAnswerInHistory,
    renderAnswerInHistory = _QuestionViewController2.default.renderAnswerInHistory;
var postQuestion = _QuestionApiController2.default.postQuestion,
    postAnswer = _QuestionApiController2.default.postAnswer,
    updateAnswer = _QuestionApiController2.default.updateAnswer,
    deleteQuestion = _QuestionApiController2.default.deleteQuestion,
    preferAnswer = _QuestionApiController2.default.preferAnswer,
    upvoteAnswer = _QuestionApiController2.default.upvoteAnswer,
    downvoteAnswer = _QuestionApiController2.default.downvoteAnswer,
    fetchComment = _QuestionApiController2.default.fetchComment,
    postComment = _QuestionApiController2.default.postComment,
    fetchQuestions = _QuestionApiController2.default.fetchQuestions,
    fetchSearchQuestions = _QuestionApiController2.default.fetchSearchQuestions,
    fetchQuestion = _QuestionApiController2.default.fetchQuestion;
var signUpUser = _UserApiController2.default.signUpUser,
    loginUser = _UserApiController2.default.loginUser,
    fetchUserProfile = _UserApiController2.default.fetchUserProfile,
    updateUserProfile = _UserApiController2.default.updateUserProfile,
    updatePhotoToCloud = _UserApiController2.default.updatePhotoToCloud;


var signupAction = function signupAction() {
  var signupButton = document.getElementById('signupButton');
  validateSignup();
  signupButton.addEventListener('click', function (e) {
    var email = document.getElementById('email').value;
    var fullName = document.getElementById('fullName').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    var _fullName$split = fullName.split(' '),
        _fullName$split2 = _toArray(_fullName$split),
        firstName = _fullName$split2[0],
        lastName = _fullName$split2.slice(1);

    e.preventDefault();
    signUpUser(firstName, lastName.join(''), email, password, confirmPassword);
  });
};

var loginAction = function loginAction() {
  var loginButton = document.getElementById('loginButton');
  loginButton.addEventListener('click', function (e) {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    e.preventDefault();
    loginUser(email, password);
  });
};

var askAction = function askAction() {
  var askButton = document.getElementById('askButton');
  askButton.addEventListener('click', function (e) {
    e.preventDefault();
    var questionTitle = document.getElementById('questionTitle').value;
    var questionDescription = document.getElementById('questionDescription').value;

    if (!_userData2.default.data.loginStatus) _userData2.default.data.loginStatus = retrieveData('loginStatus');
    if (!_userData2.default.data.loginStatus) {
      destroyData('loginStatus');
      return loginOnDemand('a question');
    }
    if (!_userData2.default.data.token) {
      _userData2.default.data.token = retrieveData('token');
    }
    postQuestion(questionTitle, questionDescription);
  });
};

var logoutAction = function logoutAction() {
  var logoutButton = document.getElementById('logoutLink');
  logoutButton.addEventListener('click', function (e) {
    e.preventDefault();
    destroyData('loginStatus');
    destroyData('token');
    renderNotification('notificationDisplay', 'block', 'You have logged out');
    setTimeout(function () {
      return renderNotification('notificationDisplay', 'none');
    }, 4500);
    window.location.reload();
    window.location.hash = '';
  });
};

var forceLogout = function forceLogout() {
  if (!_userData2.default.data.loginStatus) _userData2.default.data.loginStatus = retrieveData('loginStatus');
  if (!_userData2.default.data.loginStatus) {
    destroyData('loginStatus');
    window.location.reload();
    window.location.hash = '';
  }
};

var updateProfileAction = function updateProfileAction() {
  var photo = document.getElementById('imageUpload');
  var imageHolder = document.getElementById('imageHolder');
  var photoUrl = void 0;
  try {
    photoUrl = window.URL.createObjectURL(photo.files[0]);
    imageHolder.src = photoUrl;
    imageHolder.onload = function () {
      return window.URL.revokeObjectURL(photo.files[0]);
    };
    toggleDiv('imageHolder', 'block');
    toggleDiv('dummyImage');
  } catch (err) {
    if (_userData2.default.data.profile[0].photo !== 'image-url') {
      toggleDiv('imageHolder', 'block');
      toggleDiv('dummyImage');
    } else {
      toggleDiv('dummyImage', 'block');
      toggleDiv('imageHolder');
      _userData2.default.data.photo = 'image-url';
    }
  }
};

var uploadPhotoAction = function uploadPhotoAction() {
  var photo = document.getElementById('imageUpload');
  photo.addEventListener('change', function () {
    var imageHolder = document.getElementById('imageHolder');
    var photoUrl = window.URL.createObjectURL(photo.files[0]);
    imageHolder.src = photoUrl;
    imageHolder.onload = function () {
      return window.URL.revokeObjectURL(photo.files[0]);
    };
    var reader = new FileReader();
    reader.onload = function (b) {
      var newUrl = b.srcElement.result;
      _userData2.default.data.photo = newUrl;
    };
    reader.readAsDataURL(photo.files[0]);
    toggleDiv('imageHolder', 'block');
    toggleDiv('dummyImage');
  });
};

var pageDisplay = document.getElementById('pageDisplay');
pageDisplay.addEventListener('click', function (e) {
  if (e.target.id === 'refresh') window.location.reload();
  if (e.target.id === 'answerButton') {
    var answer = document.getElementById('answer').value;
    e.preventDefault();
    if (!_userData2.default.data.loginStatus) _userData2.default.data.loginStatus = retrieveData('loginStatus');
    if (!_userData2.default.data.loginStatus) {
      destroyData('loginStatus');
      return _UserViewController2.default.loginOnDemand('an answer');
    }
    if (!_userData2.default.data.token) {
      _userData2.default.data.token = retrieveData('token');
    }
    postAnswer(answer, +e.target.attributes[1].value);
  }
  if (e.target.innerText === 'Save') {
    var company = document.getElementById('companyEdit').value;
    var jobRole = document.getElementById('jobRoleEdit').value;
    var imageHolder = document.getElementById('imageHolder');
    updateProfileAction();

    if (!_userData2.default.data.token) {
      _userData2.default.data.token = retrieveData('token');
    }
    if (_userData2.default.data.photo === 'image-url') {
      updateUserProfile(_userData2.default.data.photo, company, jobRole);
    } else if (imageHolder.src === _userData2.default.data.profile[0].photo) {
      updateUserProfile(imageHolder.src, company, jobRole);
    } else {
      updatePhotoToCloud(_userData2.default.data.photo, company, jobRole);
    }
  }

  if (e.target.id === 'updateProfileButton' && e.target.innerText === 'Update') {
    var _company = document.getElementById('companyDisplay').innerText;
    var _jobRole = document.getElementById('jobRoleDisplay').innerText;
    toggleDiv('jobRoleDisplay');
    toggleDiv('jobRoleEdit', 'block');
    toggleDiv('companyDisplay');
    toggleDiv('companyEdit', 'block');
    toggleDiv('imageUpload', 'block');
    document.getElementById('companyEdit').value = _company;
    document.getElementById('jobRoleEdit').value = _jobRole;
    renderNotificationInButton('updateProfileButton', 'block', '', 'Save');
  }

  if (e.target.id === 'imageUpload') {
    uploadPhotoAction();
  }

  if (e.target.id === 'imageHolder') {
    var _imageHolder = document.getElementById('imageHolder');
    togglePhoto('photoDisplay', 'block', _imageHolder.src);
  }

  if (e.target.id === 'cancelPhotoButton') {
    togglePhoto('photoDisplay');
  }

  if (e.target.id === 'updateAnswerPopUpButton') {
    renderUpdateAnswerPopUp('updateAnswerPopUpDisplay', 'block', +e.target.attributes[0].value);
  }
  if (e.target.id === 'turnOffUpdateAnswer') {
    renderUpdateAnswerPopUp('updateAnswerPopUpDisplay');
  }

  if (e.target.id === 'updateAnswerButton') {
    e.preventDefault();
    if (!_userData2.default.data.token) {
      _userData2.default.data.token = retrieveData('token');
    }
    var _answer = document.getElementById('answerForUpdate').value;
    updateAnswer(_answer, e.target.attributes[0].value);
  }

  if (e.target.id === 'deleteQuestion') {
    renderDeleteQuestionPopUpModal('updateAnswerPopUpDisplay', 'block', _dataCenter2.default.data.questionWithAnswers.id);
  }

  if (e.target.id === 'turnOffDeleteQuestion') {
    renderDeleteQuestionPopUpModal('updateAnswerPopUpDisplay');
  }

  if (e.target.id === 'confirmDeleteQuestion') {
    if (!_userData2.default.data.token) {
      _userData2.default.data.token = retrieveData('token');
    }
    deleteQuestion(e.target.attributes[0].value);
  }

  if (e.target.id.startsWith('prefer')) {
    if (!_userData2.default.data.token) {
      _userData2.default.data.token = retrieveData('token');
    }
    preferAnswer(e, e.target.attributes[0].value);
  }
  if (e.target.id.startsWith('star')) {
    var prefer = document.getElementById(e.target.attributes[0].value);
    prefer.click();
  }

  if (e.target.id.startsWith('upvote')) {
    if (!_userData2.default.data.token) {
      _userData2.default.data.token = retrieveData('token');
    }
    upvoteAnswer(e, e.target.attributes[0].value);
  }
  if (e.target.id.startsWith('thumbUp')) {
    var upvote = document.getElementById(e.target.attributes[0].value);
    upvote.click();
  }

  if (e.target.id.startsWith('downvote')) {
    if (!_userData2.default.data.token) {
      _userData2.default.data.token = retrieveData('token');
    }
    downvoteAnswer(e, e.target.attributes[0].value);
  }
  if (e.target.id.startsWith('thumbDown')) {
    var downvote = document.getElementById(e.target.attributes[0].value);
    downvote.click();
  }

  if (e.target.id.startsWith('comment') || e.target.id.startsWith('viewComment')) {
    if (!_userData2.default.data.token) {
      _userData2.default.data.token = retrieveData('token');
    }
    window.location.hash = '#comments/questions/' + e.target.attributes[0].value;
    var answerId = window.location.hash.substring(window.location.hash.lastIndexOf('/') + 1);
    if (!_userData2.default.data.id) _userData2.default.data.id = retrieveData('loginId');
    if (searchAnswerInHistory(answerId)) return renderAnswerInHistory(answerId);
    fetchComment(e.target.attributes[0].value);
  }

  if (e.target.id === 'commenButton') {
    e.preventDefault();
    if (!_userData2.default.data.token) {
      _userData2.default.data.token = retrieveData('token');
    }
    var comment = document.getElementById('boxComment').value;
    postComment(comment, e.target.attributes[0].value);
  }
});

window.addEventListener('load', function () {
  _userData2.default.data.loginStatus = retrieveData('loginStatus');
  _userData2.default.data.id = retrieveData('loginId');
  if (_userData2.default.data.loginStatus) {
    toggleDiv('loginLink');
    toggleDiv('signupLink');
  } else {
    toggleDiv('profileLink');
  }
  if (window.location.hash === '') fetchQuestions();
  if (window.location.hash.startsWith('#questions')) {
    var url = window.location.hash.substring(window.location.hash.lastIndexOf('-') + 1);
    _dataCenter2.default.url = url;
    fetchQuestion(url);
  }

  if (window.location.hash.startsWith('#comments')) {
    var _url = window.location.hash.substring(20);
    fetchComment(_url);
  }
  if (window.location.hash === '#signup') {
    if (_userData2.default.data.loginStatus) window.location.hash = '';else {
      signupAction();
    }
  }

  if (window.location.hash === '#login') {
    if (_userData2.default.data.loginStatus) window.location.hash = '';else {
      loginAction();
    }
  }
  if (window.location.hash === '#ask') {
    askAction();
  }

  if (window.location.hash === '#profile') {
    toggleDiv('logoutLink', 'block');
    forceLogout();
    logoutAction();
    if (!_userData2.default.data.token) {
      _userData2.default.data.token = retrieveData('token');
    }
    fetchUserProfile();
  } else {
    toggleDiv('logoutLink');
  }
});

window.addEventListener('hashchange', function () {
  if (window.location.hash === '') {
    if (_dataCenter2.default.data.questions.length === 0 && !_dataCenter2.default.search) {
      fetchQuestions();
    }
    if (!_dataCenter2.default.search && _dataCenter2.default.data.questions.length > 0) connectQuestionsDisplayToDataCenter();
  }
  if (window.location.hash.startsWith('#questions')) {
    var url = window.location.hash.substring(window.location.hash.lastIndexOf('-') + 1);
    if (!_userData2.default.data.id) _userData2.default.data.id = retrieveData('loginId');
    if (searchQuestionInHistory(url)) return renderQuestionInHistory(url);

    _dataCenter2.default.url = url;
    fetchQuestion(url);
  }

  if (window.location.hash.startsWith('#comments')) {
    var _url2 = window.location.hash.substring(20);
    var answerId = window.location.hash.substring(window.location.hash.lastIndexOf('/') + 1);
    if (!_userData2.default.data.id) _userData2.default.data.id = retrieveData('loginId');
    if (searchAnswerInHistory(answerId)) return renderAnswerInHistory(answerId);
    fetchComment(_url2);
  }

  if (window.location.hash === '#signup') {
    if (_userData2.default.data.loginStatus) window.location.hash = '';else {
      signupAction();
    }
  }

  if (window.location.hash === '#login') {
    if (_userData2.default.data.loginStatus) window.location.hash = '';else {
      loginAction();
    }
  }

  if (window.location.hash === '#ask') {
    askAction();
  }

  if (window.location.hash === '#profile' || window.location.hash === '#logout') {
    toggleDiv('logoutLink', 'block');
    forceLogout();
    logoutAction();
    if (!_userData2.default.data.token) {
      _userData2.default.data.token = retrieveData('token');
    }
    if (!_userData2.default.data.profile.length) fetchUserProfile();else {
      connectfetchUserProfileOperationToDataCenter();
    }
  } else {
    toggleDiv('logoutLink');
  }
});

var searchButton = document.getElementById('searchButton');
var searchBox = document.getElementById('searchBox');
searchButton.addEventListener('click', function () {
  return fetchSearchQuestions();
});
searchBox.addEventListener('keyup', function (e) {
  e.preventDefault();
  if (e.keyCode === 13) searchButton.click();
});

},{"../../helper/ResourceHelper.js":6,"../../models/dataCenter.js":8,"../../models/userData.js":9,"../../views/RenderUi.js":10,"../apiControllers/QuestionApiController.js":1,"../apiControllers/UserApiController.js":2,"./QuestionViewController.js":3,"./UserViewController.js":4}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
  * @class ResourceHelper
  *
  * @description this class helps with fetching resources from datacenter
  */
var ResourceHelper = function () {
  function ResourceHelper() {
    _classCallCheck(this, ResourceHelper);
  }

  _createClass(ResourceHelper, null, [{
    key: 'getInformationFromDataCenter',

    /**
      * @static
      *
      * @param {string} dataResource - the resource
      * @param {string} resourceField - the attribute of the resource
      * @param {string} resourceId - The id of the resource
      * @param {string} neededData - The actual data needed
      * @returns {object} - binds view to datacenter
      *
      * @description This method checks for a question in history;
      * @memberOf ResourceHelper
      */
    value: function getInformationFromDataCenter(dataResource, resourceField, resourceId, neededData) {
      var result = dataResource.find(function (x) {
        return +x[resourceField] === +resourceId;
      });
      return result[neededData];
    }

    /**
      * @static
      *
      * @param {string} key - the encryptionkey
      * @param {string} data - the data
      *
      * @returns {object} - encrypted data
      *
      * @description This mehthod encrypts data;
      * @memberOf ResourceHelper
      */

  }, {
    key: 'encrypt',
    value: function encrypt(key, data) {
      var newData = data.split('').reverse().join('') + key;
      return newData;
    }

    /**
      * @static
      *
      * @param {string} key - the encryptionkey
      * @param {string} data - the data
      *
      * @returns {object} - encrypted data
      *
      * @description This mehthod encrypts data;
      * @memberOf ResourceHelper
      */

  }, {
    key: 'decrypt',
    value: function decrypt(key, data) {
      var newData = data.substring(0, data.length - key.length).split('').reverse().join('');
      return newData;
    }

    /**
      * @static
      *
      * @param {string} dataSite - the site you want to store the token
      * @param {string} data - the data
      *
      * @returns {object} - encrypted data
      *
      * @description This mehthod stores token data on browser;
      * @memberOf ResourceHelper
      */

  }, {
    key: 'storeData',
    value: function storeData(dataSite, data) {
      localStorage.setItem(dataSite, JSON.stringify(data));
    }

    /**
      * @static
      *
      * @param {string} dataSite - the site you want to retrieve the token
      * @param {string} data - the data
      *
      * @returns {object} - stores the data
      *
      * @description This mehthod encrypts data;
      * @memberOf ResourceHelper
      */

  }, {
    key: 'retrieveData',
    value: function retrieveData(dataSite) {
      var data = void 0;
      var token = localStorage.getItem(dataSite);
      if (token) {
        data = JSON.parse(token);
        return data;
      }
      return '';
    }

    /**
      * @static
      *
      * @param {string} dataSite - the site where you store the data you want to destroy.
      * @param {string} data - the data
      *
      * @returns {object} - destroys the data
      *
      * @description This mehthod destroys token data
      * @memberOf ResourceHelper
      */

  }, {
    key: 'destroyData',
    value: function destroyData(dataSite) {
      var token = localStorage.getItem(dataSite);
      if (token) localStorage.removeItem(dataSite);
    }
  }]);

  return ResourceHelper;
}();

exports.default = ResourceHelper;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class Validation
 *
 * @description Validates Input fields
 */
var Validation = function () {
  function Validation() {
    _classCallCheck(this, Validation);
  }

  _createClass(Validation, null, [{
    key: 'isValid',

    /**
        * @description -This method validates an email from the email field
        *
        * @param {string} fieldValue - The email recieved
        * @param {string} fieldName - The email recieved
        *
        * @returns {integer} - returns 1 on valid email or 0 otherwise
        *
        * @memberOf Validation class
        * @static
        */
    value: function isValid(fieldValue, fieldName) {
      var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var passwordRegex = /^((?=.*[a-z])|(?=.*[A-Z]))((?=.*[0-9])|(?=.*[!@#\$%\^&\*]))(?=.{5,})/;
      var nameRegex = /^(?=.*[a-zA-Z]+$)(?=.{3,})/;
      var firstName = void 0,
          lastName = void 0;
      switch (fieldName) {
        case 'email':
          if (emailRegex.test(fieldValue)) return 1;
          return 0;
        case 'password':
          if (passwordRegex.test(fieldValue)) return 1;
          return 0;
        default:
          var _fieldValue$split = fieldValue.split(' ');

          var _fieldValue$split2 = _toArray(_fieldValue$split);

          firstName = _fieldValue$split2[0];
          lastName = _fieldValue$split2.slice(1);

          if (nameRegex.test(firstName) && nameRegex.test(lastName.join(''))) return 1;
          return 0;
      }
    }

    /**
        * @description -This method validates an email from the email field
        *
        * @param {string} password - The original password value
        * @param {string} confirmPassword - The confirm password value
        *
        * @returns {integer} - returns 1 on valid email or 0 otherwise
        *
        * @memberOf Validation class
        * @static
        */

  }, {
    key: 'validateConfirmPassword',
    value: function validateConfirmPassword(password, confirmPassword) {
      if (password !== confirmPassword) return 1;
      return 0;
    }
  }]);

  return Validation;
}();

exports.default = Validation;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var questionData = {
  data: {
    questions: [],
    searchedQuestions: [],
    questionWithAnswers: [],
    answerWithComments: [],
    users: []
  },
  history: [],
  answerHistory: [],
  errors: [],
  search: '',
  retrieveId: '',
  loadMore: 0,
  initialCount: 6,
  ready: 0,
  fail: 0,
  fetch: 0
};

exports.default = questionData;

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var userAuthData = {
  data: {
    loginStatus: 0,
    profile: [],
    questions: []
  },
  errors: [],
  ready: 0,
  fail: 0,
  fetch: 0
};

exports.default = userAuthData;

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dataCenter = require('../models/dataCenter.js');

var _dataCenter2 = _interopRequireDefault(_dataCenter);

var _userData = require('../models/userData.js');

var _userData2 = _interopRequireDefault(_userData);

var _ResourceHelper = require('../helper/ResourceHelper.js');

var _ResourceHelper2 = _interopRequireDefault(_ResourceHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var getInformationFromDataCenter = _ResourceHelper2.default.getInformationFromDataCenter;

/**
  * @class RenderUi
  *
  * @description this class render all Ui components to the client
  */

var RenderUi = function () {
  function RenderUi() {
    _classCallCheck(this, RenderUi);
  }

  _createClass(RenderUi, null, [{
    key: 'renderNotification',

    /**
      * @static
      *
      * @param {string} elementId - This is the id of the element to display the notification box
      * @param {string} setDisplay - This sets the display of the notifciation box
      * @param {string} message - This is the message to be displayed on the notification box
      * @returns {object} - renders the notification box
      *
      * @description This method renders a modal on the client
      * @memberOf RenderUi
      */
    value: function renderNotification(elementId) {
      var setDisplay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'none';
      var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      var targetDiv = document.getElementById(elementId);
      targetDiv.innerHTML = message;
      targetDiv.style.display = setDisplay;
    }

    /**
      * @static
      *
      * @param {string} elementId - This is the id of the element to display the notification
      * @param {string} setDisplay - This sets the display of the notifciation box
      * @param {string} message - This is the message to be displayed on the notification box
      * @param {string} defaultLabel - This is the fallback label on the button
      * @returns {object} - renders the notification box
      *
      * @description This method renders a modal on the client
      * @memberOf RenderUi
      */

  }, {
    key: 'renderNotificationInButton',
    value: function renderNotificationInButton(elementId) {
      var setDisplay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'none';
      var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var defaultLabel = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'Signup';

      var content = message ? '<span><i class ="fas fa-spinner fa-pulse"></i></span> &nbsp ' + message : '' + defaultLabel;
      var targetDiv = document.getElementById(elementId);
      targetDiv.innerHTML = content;
      targetDiv.style.display = setDisplay;
    }

    /**
      * @static
      *
      * @param {string} e - The event object passed in.
      * @param {string} elementId - This is the id of the element to display the notification star
      * @param {string} setDisplay - This sets the display of the notifciation star
      * @param {string} starColor - This sets the color of the star
      * @param {string} status - The status of the prefered star
      * @param {string} ready - The prefered status of the star
      * @returns {object} - renders the notification star
      *
      * @description This method renders notification on stars
      * @memberOf RenderUi
      */

  }, {
    key: 'renderNotificationInStar',
    value: function renderNotificationInStar(e, elementId) {
      var setDisplay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'none';
      var starColor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
      var status = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      var ready = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';

      var newKey = e.target.attributes[0].value;
      if (!e.target.attributes[0].value.startsWith('prefer')) newKey = e.target.id;
      var animation = '';
      var star = 'far fa-star';
      if (ready) star = 'fas fa-star';
      if (!status) animation = 'fa-spin';
      var animatedStar = '<i key=' + newKey + ' id = "star" class=\'' + star + ' ' + animation + ' stars\' style ="color:' + starColor + '"></i>';
      var targetDiv = document.getElementById(elementId);
      targetDiv.innerHTML = animatedStar;
      targetDiv.style.display = setDisplay;
    }

    /**
      * @static
      *
      * @returns {object} - renders the notification box
      *
      * @description This method clears notification in stars
      * @memberOf RenderUi
      */

  }, {
    key: 'clearNotificationsInStar',
    value: function clearNotificationsInStar() {
      var stars = document.querySelectorAll('.stars');
      if (stars.length) {
        [].concat(_toConsumableArray(stars)).forEach(function (x) {
          x.style.color = '';
          x.classList.toggle('fas');
          x.classList.toggle('far');
        });
      }
    }

    /**
      * @static
      *
      * @param {string} elementId - This is the id of the button element
      * @param {string} setDisplay - This sets the display of the button;
      * @returns {object} - renders a button;
      *
      * @description This method renders a button
      * @memberOf RenderUi
      */

  }, {
    key: 'toggleButton',
    value: function toggleButton(elementId) {
      var setDisplay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'none';

      var targetButton = document.getElementById(elementId);
      targetButton.style.display = setDisplay;
    }

    /**
      * @static
      *
      * @param {string} elementId - This is the id of the dashboardTitle
      * @param {string} newTitle - This is the new title of the dashboard
      * @param {string} data - This is the data to be attached to the title
      * @returns {object} - renders a button;
      *
      * @description This method renders a button
      * @memberOf RenderUi
      */

  }, {
    key: 'modifyTitle',
    value: function modifyTitle(elementId, newTitle) {
      var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      var targetDiv = document.getElementById(elementId);
      var newData = data ? ': ' + data : '';
      targetDiv.innerHTML = '<h3>' + newTitle + ' ' + newData + '</h3>';
    }

    /**
      * @static
      *
      * @param {string} elementId - This is the id of the div element
      * @param {string} setDisplay - This sets the display of the div element;
      * @returns {object} - renders a div ;
      *
      * @description This method renders a div element
      * @memberOf RenderUi
      */

  }, {
    key: 'toggleDiv',
    value: function toggleDiv(elementId) {
      var setDisplay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'none';

      var targetButton = document.getElementById(elementId);
      targetButton.style.display = setDisplay;
    }

    /**
      * @static
      *
      * @param {string} elementId - This is the id of the div element
      * @param {string} setDisplay - This sets the display of the div element;
      * @param {string} imageSrc - This sets the display of the div element;
      * @returns {object} - renders a div ;
      *
      * @description This method renders a div element
      * @memberOf RenderUi
      */

  }, {
    key: 'togglePhoto',
    value: function togglePhoto(elementId) {
      var setDisplay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'none';
      var imageSrc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      var targetDiv = document.getElementById(elementId);
      targetDiv.innerHTML = '<div class ="modal container " id ="zoomedPhoto" style ="" >\n    <div class = "row">\n      <div class = "col-2"></div>\n      <div class = "col-3">\n        <div  class ="photoCloseButton"><span id = "cancelPhotoButton" class = "photoCollapseButton">x</span></div>\n        <div>\n          <img style ="" class ="zoomPhoto" src ="' + imageSrc + '">\n  \n  \n        </div>\n      </div>\n     <div class = "col-2"></div>\n    </div>\n  </div>';
      targetDiv.style.display = setDisplay;
    }

    /**
      * @static
      *
      * @param {string} elementId - This is the id of the div element
      * @param {string} setDisplay - This sets the display of the div element;
      * @param {integer} answerId - This is the id of the answer to be updated;
      * @returns {object} - renders a div ;
      *
      * @description This method renders a div element
      * @memberOf RenderUi
      */

  }, {
    key: 'renderUpdateAnswerPopUp',
    value: function renderUpdateAnswerPopUp(elementId) {
      var setDisplay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'none';
      var answerId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      var targetDiv = document.getElementById(elementId);
      var answer = '';
      var questionId = '';
      if (answerId) {
        answer = getInformationFromDataCenter(_dataCenter2.default.data.questionWithAnswers.answers, 'id', answerId, 'answer');
        questionId = getInformationFromDataCenter(_dataCenter2.default.data.questionWithAnswers.answers, 'id', answerId, 'questionId');
      }

      targetDiv.innerHTML = '\n    <div class ="modal container pd-2">\n    <div class = "row">\n      <div class = "col-2"></div>\n      <div class = "col-3">\n          <div class = "card">\n              <div class = "row">\n                  <div class = "col">\n                    <div class= "turnOffUpdateAnswerModal" id ="turnOffUpdateAnswer">X</div>\n                    <form class = "" method = "POST">\n                    \n                      <label for="password"><b>Update answer</b></label>\n                      <textarea  class ="mt-4 txtarea pd-2" id = "answerForUpdate">' + answer + '</textarea>\n                  \n                      <button key="' + questionId + '/answers/' + answerId + '" id = "updateAnswerButton" > \n                      Update\n                      </button>\n                  </form>\n                  </div>\n                </div>\n          </div>\n      </div>\n      <div class = "col-2"></div>\n    </div>\n\n \n  </div>\n    ';
      targetDiv.style.display = setDisplay;
    }

    /**
      * @static
      *
      * @param {string} elementId - This is the id of the div element
      * @param {string} setDisplay - This sets the display of the div element;
      * @param {integer} questionId - This is the id of the question in question;
      * @returns {object} - renders a div ;
      *
      * @description This method renders a div element
      * @memberOf RenderUi
      */

  }, {
    key: 'renderDeleteQuestionPopUpModal',
    value: function renderDeleteQuestionPopUpModal(elementId) {
      var setDisplay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'none';
      var questionId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      var targetDiv = document.getElementById(elementId);
      targetDiv.innerHTML = '\n    <div class ="modal container pd-2">\n    <div class = "row mt-4">\n      <div class = "col-2"></div>\n      <div class = "col-3">\n          <div class = "card">\n              <div class = "row">\n                  <div class = "col">\n                    <div class= "turnOffUpdateAnswerModal" id ="turnOffDeleteQuestion">X</div>\n                   <div class ="question">Are you sure you want to delete this question?</div>\n                   <div class = "mt-4"><button key=' + questionId + ' id ="confirmDeleteQuestion"type="answer">Yes</button></div>\n                  </div>\n                </div>\n          </div>\n      </div>\n      <div class = "col-2"></div>\n    </div>\n\n \n  </div>\n    ';
      targetDiv.style.display = setDisplay;
    }

    /**
      * @static
      *
      * @param {string} elementId - This is the id of the element to display the modal
      * @param {string} setDisplay - This sets the display of the modal div
      * @param {string} message - This is the message to be displayed
      * @returns {object} - renders the modal element
      *
      * @description This method renders a modal on the client
      * @memberOf RenderUi
      */

  }, {
    key: 'renderModal',
    value: function renderModal(elementId, setDisplay) {
      var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      var targetDiv = document.getElementById(elementId);
      targetDiv.style.display = setDisplay;
      targetDiv.innerHTML = '<div class = "container modal" >\n    <div class = "row" >\n      <div class = "col"></div>\n      <div class = "col">\n       <div class = "card">\n         <div class = "container">\n           <div class = "row mt-4 pd-1" >\n             <div class = "col-2">\n               <div class = "symbol-display">\n                 <div class = "alignSymbol">!</div>\n               </div>\n               \n             </div>\n             <div class = "col-5">\n               <div class = "question">' + (message || 'No message available!') + '</div>\n   \n             </div>\n           </div>\n          \n             <div class = "col" style = "text-align: right; padding:1%" ><span></span><span></span><a\n             >\n             <button type= "answer" id = "shutDownButton" >Ok</button></a></div>\n          \n         </div>\n       </div>\n      </div>\n      <div class ="col"></div>\n    </div>\n       </div> ';
    }

    /**
      * @static
      *
      * @param {string} elementId - This is the id of the element to display the modal
      * @param {string} setDisplay - This sets the display of the modal div
      * @param {string} message - This is the message to be displayed
      * @returns {object} - renders the modal element
      *
      * @description This method renders a loading modal during asynchronous activity
      * @memberOf RenderUi
      */

  }, {
    key: 'renderModalLoader',
    value: function renderModalLoader(elementId, setDisplay) {
      var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      var targetDiv = document.getElementById(elementId);
      targetDiv.innerHTML = '<div class = "container modal" >\n    <div class = "row" >\n      <div class = "col"></div>\n      <div class = "col">\n       <div class = "card">\n         <div class = "container">\n           <div class = "row mt-4 pd-1" >\n             <div class = "col-2">\n               <div class = "symbol-display">\n                 <div class = "alignSymbol"><span><i class ="fas fa-spinner fa-pulse"></i></span></div>\n               </div>\n               \n             </div>\n             <div class = "col-5">\n               <div class = "question">' + (message || 'No message available!') + '</div>\n   \n             </div>\n           </div>\n          \n         </div>\n       </div>\n      </div>\n      <div class ="col"></div>\n    </div>\n       </div> ';
      targetDiv.style.display = setDisplay;
    }

    /**
      * @static
      *
      * @param {string} elementId - This is the id of the element to display the notification box
      * @param {string} setDisplay - This sets the display of the notifciation box
      * @param {string} message - This is the message to be displayed on the notification box
      * @returns {object} - renders the notification box
      *
      * @description This method renders a notification div
      * @memberOf RenderUi
      */

  }, {
    key: 'notifyEmptyResult',
    value: function notifyEmptyResult(elementId) {
      var setDisplay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'none';
      var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      var targetDiv = document.getElementById(elementId);
      targetDiv.innerHTML = '    <div class = "container" >\n    <div class ="row no-questions" >\n      \n      <div class ="alignCardWidth" >\n          <div class = "card" >\n              <div class = "container">\n                <div class = "row mt-4 pd-1" >\n                  <div class = "col-2">\n                    <div class = "symbol-display">\n                      <div class = "alignSymbol" >!</div>\n                    </div>\n                    \n                  </div>\n                  <div class = "col-5">\n                    <div class = "question" > ' + (message || 'No Questions Yet! refresh page') + '  </div>\n  \n                  </div>\n                </div>\n               \n                  <div class = "col" style="text-align:right"><span></span><span></span><a id ="refresh"><button  type= "answer">Refresh</button></a></div>\n               \n              </div>\n            </div>\n      </div>\n      \n    </div>\n  </div>';
      targetDiv.style.display = setDisplay;
    }

    /**
      * @static
      *
      * @param {string} commentId - This is the id of the comment to be displayed
      * @param {string} comment - The comment to be displayed
      * @returns {object} - renders the particularcomment
      *
      * @description This method renders a particular comment in a div
      * @memberOf RenderUi
      */

  }, {
    key: 'renderComment',
    value: function renderComment(commentId, comment) {
      return '<div class = "row">\n    <div class = "col">' + comment + '\n      <div class = "row mt-4">\n        <div class = "col"><div class = "ft">\n        Comment by \n        ' + getInformationFromDataCenter(_dataCenter2.default.data.users, 'id', getInformationFromDataCenter(_dataCenter2.default.data.answerWithComments.comments, 'id', commentId, 'userId'), 'fullName') + ' \n        &nbsp on &nbsp <span class = "darkgray">\n        ' + getInformationFromDataCenter(_dataCenter2.default.data.answerWithComments.comments, 'id', commentId, 'date') + '\n            &nbsp at &nbsp\n            ' + getInformationFromDataCenter(_dataCenter2.default.data.answerWithComments.comments, 'id', commentId, 'time') + '\n        </span></div></div>\n        <div class = "col ">\n          </div>\n         \n      </div>\n    </div>\n\n  </div>\n\n  <div>&nbsp</div>\n  <div class = "underline">&nbsp</div>';
    }

    /**
      * @static
      *
      * @param {string} elementId - This is the id of the element that will display the question
      * @param {string} setDisplay - The sets the visibility of the div element
      * @returns {object} - renders a an answer with all its comments to the client side
      *
      * @description This method renders a particular question in a div.
      * @memberOf RenderUi
      */

  }, {
    key: 'renderAnswerWithComments',
    value: function renderAnswerWithComments(elementId) {
      var setDisplay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'none';

      var targetDiv = document.getElementById(elementId);
      targetDiv.style.display = setDisplay;
      var answerId = _dataCenter2.default.data.answerWithComments.id;
      var questionId = _dataCenter2.default.data.answerWithComments.questionid;
      var approved = _dataCenter2.default.data.answerWithComments.approved;

      var preferIndicator = 'far fa-star';
      var styleIndicator = '';
      if (approved) {
        preferIndicator = 'fas fa-star';styleIndicator = 'hotpink';
      }
      var header = '<div class =""> <h3> Comments </h3></div><div class = "underline">&nbsp</div>';
      var commentHeader = '<div class =""> <h4>' + _dataCenter2.default.data.answerWithComments.comments.length + ' \n    Comment</h3></div><div class = "underline">&nbsp</div>';
      if (_dataCenter2.default.data.answerWithComments.comments.length > 1) {
        commentHeader = '<div class =""> <h4>' + _dataCenter2.default.data.answerWithComments.comments.length + ' \n      Comments</h3></div><div class = "underline">&nbsp</div>';
      }
      var answer = '<div class = "row">\n    <div class = "col-5 pr-1" >' + _dataCenter2.default.data.answerWithComments.answer + ' \n      <div class = "mt-4 ft">Answered by \n      ' + getInformationFromDataCenter(_dataCenter2.default.data.users, 'id', _dataCenter2.default.data.answerWithComments.userid, 'fullName') + '  \n      &nbsp <span class = "darkgray" >\n      ' + _dataCenter2.default.data.answerWithComments.date + '\n      &nbsp at &nbsp\n      ' + _dataCenter2.default.data.answerWithComments.time.substr(0, 15) + '\n      </span></div>\n    </div>\n    <div class = "col-2 ">\n      <div class = "row ">\n          <div class = "col-3">' + _dataCenter2.default.data.answerWithComments.upvotes + ' upvotes</div>\n          <div class = "col-2"><span key="' + questionId + '/answers/' + answerId + '" id ="prefer' + answerId + '" style ="padding:auto">\n          <i key ="prefer' + answerId + '" class=\'' + preferIndicator + ' stars\' id ="star" style="color:' + styleIndicator + '; text-align:center"></i>\n          </span></div>\n          <div class = "col-3">' + _dataCenter2.default.data.answerWithComments.downvotes + ' downvotes</div>\n      </div>\n    </div>\n  </div>\n\n  <div>&nbsp</div>\n  <div class = "underline;">&nbsp</div>';
      var formatComments = _dataCenter2.default.data.answerWithComments.comments.map(function (x) {
        return RenderUi.renderComment(x.id, x.comment);
      });
      var refinedComments = formatComments.join(' ');
      var addComment = '<form class = "" method = "POST">\n        \n    <label for="password"><b>Add Comment</b></label>\n    <textarea  class ="mt-2 txtarea pd-2" id = "boxComment"></textarea>\n\n    <button key= "' + questionId + '/answers/' + answerId + '" id = "commenButton" > \n    Add\n    </button>\n</form>';
      var formattedAnswerDisplay = '\n<div id = "updateAnswerPopUpDisplay"></div>\n<div class = "container question-background " >\n<div class = "row ">\n    <div class = "col">\n        <div class = "question-card">\n            ' + header + '\n            ' + answer + '\n            ' + commentHeader + '\n            ' + refinedComments + '\n            ' + addComment + '\n        </div>\n        </div>\n        </div>\n        \n        </div>';
      targetDiv.innerHTML = formattedAnswerDisplay;
    }

    /**
      * @static
      *
      * @param {string} answerId - This is the id of the answer to be displayed
      * @param {string} answer - The answer to be displayed
      * @param {string} upVotes - This is the total upvotes to this answer
      * @param {string} downVotes - This is the total downvotes to this answer
      * @param {string} approved - This is indicates if an answer is preffered or not
      * @param {string} numberOfComments - This is the number of comments to a particular answer
      * @returns {object} - renders the particular answer
      *
      * @description This method renders a particular answer in a div
      * @memberOf RenderUi
      */

  }, {
    key: 'renderAnswer',
    value: function renderAnswer(answerId, answer, upVotes, downVotes) {
      var approved = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var numberOfComments = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

      var preferIndicator = 'far fa-star';
      var styleIndicator = '';
      if (approved) {
        preferIndicator = 'fas fa-star';styleIndicator = 'hotpink';
      }
      var numberOfCommentsDisplay = 'View all comments';
      if (numberOfComments > 2) numberOfCommentsDisplay = 'View all ' + numberOfComments + ' comments';
      var updateAnswerButton = '<div class ="" style ="">\n    <div> <span key="' + answerId + '" id ="updateAnswerPopUpButton" style ="padding:10px 20px; border: 1px solid lightgrey; float:right">\n     <i key="' + answerId + '" id="updateAnswerPopUpButton" class ="far fa-edit blue resize"> </i></span></div>\n    <div>&nbsp</div\n    <div>&nbsp</div\n   </div>\n    ';
      var questionId = _dataCenter2.default.data.questionWithAnswers.id;
      var userId = getInformationFromDataCenter(_dataCenter2.default.data.questionWithAnswers.answers, 'id', answerId, 'userId');
      if (userId !== _userData2.default.data.id) updateAnswerButton = '';
      return '<div class = "row">\n   <div class = "col-5">' + answer + ' \n     <div class = "row mt-4">\n       <div class = "col"><div class = "ft">Answered by \n       ' + getInformationFromDataCenter(_dataCenter2.default.data.users, 'id', getInformationFromDataCenter(_dataCenter2.default.data.questionWithAnswers.answers, 'id', answerId, 'userId'), 'fullName') + '  \n    &nbsp <span class = "darkgray" >\n    ' + getInformationFromDataCenter(_dataCenter2.default.data.questionWithAnswers.answers, 'id', answerId, 'date') + '\n    &nbsp at &nbsp\n    ' + getInformationFromDataCenter(_dataCenter2.default.data.questionWithAnswers.answers, 'id', answerId, 'time') + '\n    </span></div></div>\n       <div class = "col ">\n         <div class = "row">\n           <div class = "col"><button key="' + questionId + '/answers/' + answerId + '" id ="comment' + answerId + '"type =comment>Comment</button></div>\n           \n           <div class = "col " > <div key ="' + questionId + '/answers/' + answerId + '" class = "darkgray commentLink"  id ="viewComment' + answerId + '">\n           ' + numberOfCommentsDisplay + '</div></div>\n           \n         </div>\n         \n         </div>\n        \n\n     </div>\n   </div>\n   <div class = "col-2">\n     <div class = "row">\n         <div class = "col" > <span id ="numUpvotes' + answerId + '">' + upVotes + '</span> upvotes</div>\n         <div class = "col"><span  id ="numDownvotes' + answerId + '">' + downVotes + '</span> downvotes</div>\n     </div>\n\n     <div class = "row">\n         <div class = "col"><span key= "' + questionId + '/answers/' + answerId + '" id ="upvote' + answerId + '" style ="padding:auto" >\n         <i key="upvote' + answerId + '" class="fas fa-thumbs-up" id ="thumbUp"></i></span></div>\n         \n         <div class = "col"><span key="' + questionId + '/answers/' + answerId + '" id ="prefer' + answerId + '" style ="padding:auto">\n          <i key ="prefer' + answerId + '" class=\'' + preferIndicator + ' stars\' id ="star" style="color:' + styleIndicator + '"></i>\n          </span></div>\n\n         <div class = "col"><span key= "' + questionId + '/answers/' + answerId + '"  id= "downvote' + answerId + '" style ="padding:auto">\n          <i key ="downvote' + answerId + '" id= "thumbDownk" class="fas fa-thumbs-down" ></i></span></div>\n\n     </div>\n   </div>\n\n </div>\n\n ' + updateAnswerButton + '\n\n <div class = "underline">&nbsp</div>';
    }

    /**
      * @static
      *
      * @param {string} questionId - This is the id of the question to be displayed
      * @param {string} questionTitle - The question Title of the question to be displayed
      * @param {string} answerNumber - This is the number of  answers  to this question
      * @param {string} totalUpVotes - This is the total upvotes to all answers to this question
      * @param {string} totalDownVotes - This is the total downvotes to to all answers to this question
      * @returns {object} - renders the particular question
      *
      * @description This method renders a particular question in a div
      * @memberOf RenderUi
      */

  }, {
    key: 'renderQuestion',
    value: function renderQuestion(questionId, questionTitle, answerNumber, totalUpVotes, totalDownVotes) {
      var newQuestionTitle = void 0;
      if (questionTitle.length > 55) {
        newQuestionTitle = questionTitle.substr(0, 88) + ' ...';
      }
      var answerNumberDisplay = answerNumber + ' Answer';
      if (answerNumber > 1) answerNumberDisplay = answerNumber + ' Answers';
      return '<div class = "card">\n      <div class = "container">\n        <div class = "row mt-4 pd-1" >\n          <div class = "col-2">\n            <div class = "symbol-display">\n              <div class = "alignSymbol">' + questionTitle.substr(0, 1) + '</div>\n            </div>\n            \n          </div>\n          <div class = "col-5">\n            <div class = "question">' + (newQuestionTitle || questionTitle) + '</div>\n\n          </div>\n        </div>\n        <div class = "row mt-2 pd-1">\n          <div class = "col"> <span>' + answerNumberDisplay + '</span></div>\n    <div class = "col"><span> <i class="fas fa-thumbs-up"></i></span>&nbsp ' + totalUpVotes + '<span></span></div>\n          <div class = "col"><span> <i class="fas fa-thumbs-down "></i></span>&nbsp ' + totalDownVotes + '<span><span></span></div>\n          <div class = "col"><span></span><span></span><a href =#question-' + questionId + ' >\n          <button class="viewButton" key=' + questionId + ' type= "answer">View</button></a></div>\n        </div>\n      </div>\n    </div>';
    }

    /**
      * @static
      *
      * @param {string} elementId - This is the id of the element that will display the question
      * @param {string} setDisplay - The sets the visibility of the div element
      * @returns {object} - renders a particular question to the client side
      *
      * @description This method renders a particular question in a div.
      * @memberOf RenderUi
      */

  }, {
    key: 'renderQuestionWithAnswers',
    value: function renderQuestionWithAnswers(elementId) {
      var setDisplay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'none';

      var targetDiv = document.getElementById(elementId);
      targetDiv.style.display = setDisplay;

      var formatAnswers = _dataCenter2.default.data.questionWithAnswers.answers.map(function (x) {
        return RenderUi.renderAnswer(x.id, x.answer, x.upvotes, x.downvotes, x.approved, x.numberOfComments);
      });
      var refineAnswers = formatAnswers.join(' ');
      var calcVotes = function calcVotes(votes) {
        var i = 0;
        _dataCenter2.default.data.questionWithAnswers.answers.forEach(function (x) {
          i += x[votes];
        });
        return i;
      };
      var deleteButton = '\n    <div>&nbsp</div>\n    <div>&nbsp</div>\n    <div class ="underline"></div>\n    <div class ="mt-2" style ="text-align:right;">\n    <button type ="deleteButton" id="deleteQuestion"> Delete this question </button></div>';
      var userId = _dataCenter2.default.data.questionWithAnswers.userId;

      if (userId !== _userData2.default.data.id) deleteButton = '';
      var totalUpVotes = calcVotes('upvotes');
      var totalDownVotes = calcVotes('downvotes');
      var numberOfAnswers = _dataCenter2.default.data.questionWithAnswers.answers.length;
      var answerNumberDisplay = numberOfAnswers + ' Answer';
      if (numberOfAnswers > 1) answerNumberDisplay = numberOfAnswers + ' Answers';
      var answerHeader = '<div class =""> <h3>' + answerNumberDisplay + '</h3></div><div class = "underline">&nbsp</div>';
      var question = '<h2>' + _dataCenter2.default.data.questionWithAnswers.questionTitle + '</h2>\n    <div class = "underline">&nbsp</div>\n    <div class = "row">\n      <div class = "col-5 pr-1" >' + _dataCenter2.default.data.questionWithAnswers.questionDescription + ' \n        <div class = "mt-4 ft">Asked by \n        ' + getInformationFromDataCenter(_dataCenter2.default.data.users, 'id', _dataCenter2.default.data.questionWithAnswers.userId, 'fullName') + '  \n        &nbsp <span class = "darkgray" >\n        ' + _dataCenter2.default.data.questionWithAnswers.date + '\n        &nbsp at &nbsp\n        ' + _dataCenter2.default.data.questionWithAnswers.time.substr(0, 15) + '\n        </span></div>\n      </div>\n      <div class = "col-2 ">\n        <div class = "row ">\n            <div class = "col">' + totalUpVotes + ' upvotes</div>\n            <div class = "col">' + totalDownVotes + ' downvotes</div>\n        </div>\n      </div>\n    </div>\n\n    <div>&nbsp</div>\n    <div class = "underline;">&nbsp</div>';

      var addAnswer = '<form class = "" method = "POST">\n        \n    <label for="password"><b>Add an answer</b></label>\n    <textarea  class ="mt-2 txtarea pd-2" id = "answer"></textarea>\n\n    <button type="submit" key=' + _dataCenter2.default.data.questionWithAnswers.id + ' id = "answerButton" > \n    Add\n    </button>\n</form>';

      var formattedQuestionDisplay = '\n    <div id = "updateAnswerPopUpDisplay"></div>\n    <div class = "container question-background " >\n    <div class = "row ">\n        <div class = "col">\n            <div class = "question-card">\n                ' + question + '\n                ' + answerHeader + '\n                ' + refineAnswers + '\n                ' + addAnswer + '\n                ' + deleteButton + '\n            </div>\n            </div>\n            </div>\n            \n            </div>';
      targetDiv.innerHTML = formattedQuestionDisplay;
    }

    /**
      * @static
      *
      * @param {string} elementId - This is the id of the element to be displayed
      * @param {string} setDisplay - The sets the visibility of the div element
      * @param {integer} length - This is the number of  questions to be rendered
      * @param {string} questionsArray - This is the question array data to be passed in
      * @returns {object} - renders all questions to the home page
      *
      * @description This method renders a particular question in a div.
      * @memberOf RenderUi
      */

  }, {
    key: 'renderAllQuestions',
    value: function renderAllQuestions(elementId, setDisplay, length, questionsArray) {
      var targetDiv = document.getElementById(elementId);
      targetDiv.style.display = setDisplay;
      var questions = [];

      var _ref = [].concat(_toConsumableArray(questionsArray));

      questions = _ref.slice(0);

      if (length > questionsArray.length) {
        length = questionsArray.length;
      }
      questions.length = length;
      _dataCenter2.default.loadMore = length;
      var formattedQuestionDispay = void 0;
      var i = 0;
      var counter = 0;
      var formatQuestions = questions.map(function (x) {
        return '<div class ="col">\n      ' + RenderUi.renderQuestion(x.id, x.questionTitle, x.numberOfAnswers, x.upvotes, x.downvotes) + '</div>';
      });
      var setQuestionInRow = '';
      var formatQuestionsWithRows = formatQuestions.map(function (x) {
        setQuestionInRow += x;
        i += 1;
        counter += 1;
        if (i === 3 || counter === formatQuestions.length) {
          i = 0;
          var formattedQuestions = setQuestionInRow;
          setQuestionInRow = '';
          return '<div class ="row">' + formattedQuestions + '</div>';
        }
      });
      var refinedQuestions = formatQuestionsWithRows.filter(function (x) {
        return x !== undefined;
      });
      formattedQuestionDispay = refinedQuestions.join(' ');

      if (length % 3 === 1) {
        var questionUnderReform = refinedQuestions.pop();
        var reformedQuestion = questionUnderReform.split(' ').join(' ');
        reformedQuestion = reformedQuestion.substring(0, reformedQuestion.length - 6);
        reformedQuestion += '<div class = "col"></div><div class = "col"></div></div>';

        formattedQuestionDispay = refinedQuestions.join(' ') + reformedQuestion;
      }
      if (length % 3 === 2) {
        var _questionUnderReform = refinedQuestions.pop();

        var _reformedQuestion = _questionUnderReform.split(' ').join(' ');
        _reformedQuestion = _reformedQuestion.substring(0, _reformedQuestion.length - 6);
        _reformedQuestion += '<div class ="col"></div></div>';
        formattedQuestionDispay = refinedQuestions + _reformedQuestion;
      }
      var loadMoreButton = '<div class ="mb-1 mt-1 load" style="text-align: center"><button id ="loadMore" type="answer">Load more</button></div>\n    ';
      targetDiv.innerHTML = '<div class = "container " style = "background-color: #f1f1f1">\n              ' + formattedQuestionDispay + ' \n              \n              </div>\n              ' + loadMoreButton + '\n              ';
    }

    /**
      * @static
      *
      * @param {string} fieldName - This is the name of the fieldname in question
      * @param {string} elementId - This is the id of the div element in question
      * @param {integer} message - This is the message that will be displayed to the user
      * @param {string} indicator - This is id of the element that will display a good sign
      * @param {string} display - This sets the display of the  indicator
      * @param {string} width - This is id of the element that will display a good sign
      *
      * @returns {object} - renders all questions to the home page
      *
      * @description This method renders a particular question in a div.
      * @memberOf RenderUi
      */

  }, {
    key: 'renderNotifications',
    value: function renderNotifications(fieldName, elementId) {
      var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var indicator = arguments[3];
      var display = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'none';
      var width = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';

      var fieldDiv = document.getElementById(fieldName);
      var targetDiv = document.getElementById(elementId);
      var askbg = document.getElementById('ask-bg');
      var good = document.getElementById(indicator);
      targetDiv.style.display = 'block';
      good.style.display = display;
      good.style.marginLeft = '2%';
      good.style.color = 'hotpink';
      fieldDiv.style.width = width;
      targetDiv.innerHTML = message;
      targetDiv.style.color = 'red';
      targetDiv.style.fontSize = '15px';
      targetDiv.style.paddingBottom = '3%';
      askbg.style.height = '1000px';
    }

    /**
      * @static
      *
      * @returns {object} - shows errors on signup form
      *
      * @description This method renders a modal on the client
      * @memberOf RenderUi
      */

  }, {
    key: 'showErrors',
    value: function showErrors() {
      var firstName = document.getElementById('fullName');
      var email = document.getElementById('email');
      var password = document.getElementById('password');
      var confirmPassword = document.getElementById('confirmPassword');
      firstName.style.borderColor = '';
      email.style.borderColor = '';
      password.style.borderColor = '';
      confirmPassword.style.borderColor = '';
      RenderUi.renderNotification('notificationDisplay', 'block', _userData2.default.errors[0].message);
      setTimeout(function () {
        return RenderUi.renderNotification('notificationDisplay', 'none');
      }, 3500);
      if (_userData2.default.errors[0].message.includes('name')) {
        firstName.style.borderColor = 'red';
      }
      if (_userData2.default.errors[0].message.includes('email')) {
        email.style.borderColor = 'red';
      }
      if (!_userData2.default.errors[0].message.includes('confirm') && _userData2.default.errors[0].message.includes('password')) {
        password.style.borderColor = 'red';
      }
      if (_userData2.default.errors[0].message.includes('confirm')) {
        confirmPassword.style.borderColor = 'red';
      }
    }

    /**
      * @static
      *
      * @returns {object} - shows errors on post question  form
      *
      * @description This method renders a validation messages and signs
      * @memberOf RenderUi
      */

  }, {
    key: 'showErrorsOnPostQuestionForm',
    value: function showErrorsOnPostQuestionForm() {
      var questionTitle = document.getElementById('questionTitle');
      var questionDescription = document.getElementById('questionDescription');
      questionTitle.style.borderColor = '';
      questionDescription.style.borderColor = '';
      RenderUi.renderNotification('notificationDisplay', 'block', _dataCenter2.default.errors[0].message);
      setTimeout(function () {
        return RenderUi.renderNotification('notificationDisplay', 'none');
      }, 3500);
      if (_dataCenter2.default.errors[0].message.includes('Title')) {
        questionTitle.style.borderColor = 'red';
      }
      if (_dataCenter2.default.errors[0].message.includes('Description')) {
        questionDescription.style.borderColor = 'red';
      }
    }

    /**
      * @static
      *
      * @returns {object} - shows errors on post answer form
      *
      * @description This method renders a validation messages and signs
      * @memberOf RenderUi
      */

  }, {
    key: 'showErrorsOnPostAnswerForm',
    value: function showErrorsOnPostAnswerForm() {
      var answer = document.getElementById('answer');
      answer.style.borderColor = '';
      RenderUi.renderNotification('notificationDisplay', 'block', _dataCenter2.default.errors[0].message);
      setTimeout(function () {
        return RenderUi.renderNotification('notificationDisplay', 'none');
      }, 3500);
      if (_dataCenter2.default.errors[0].message.includes('answer')) {
        answer.style.borderColor = 'red';
      }
    }

    /**
      * @static
      *
      * @returns {object} - shows errors on post comment form
      *
      * @description This method renders a validation messages and signs
      * @memberOf RenderUi
      */

  }, {
    key: 'showErrorsOnPostCommentForm',
    value: function showErrorsOnPostCommentForm() {
      var comment = document.getElementById('boxComment');
      comment.style.borderColor = '';
      RenderUi.renderNotification('notificationDisplay', 'block', _dataCenter2.default.errors[0].message);
      setTimeout(function () {
        return RenderUi.renderNotification('notificationDisplay', 'none');
      }, 3500);
      if (_dataCenter2.default.errors[0].message.includes('comment')) {
        comment.style.borderColor = 'red';
      }
    }

    /**
      * @static
      *
      * @returns {object} - shows errors on update answer form
      *
      * @description This method renders a validation messages and signs
      * @memberOf RenderUi
      */

  }, {
    key: 'showErrorsOnUpdateAnswerForm',
    value: function showErrorsOnUpdateAnswerForm() {
      var answer = document.getElementById('answerForUpdate');
      answer.style.borderColor = '';
      RenderUi.renderNotification('notificationDisplay', 'block', _dataCenter2.default.errors[0].message);
      setTimeout(function () {
        return RenderUi.renderNotification('notificationDisplay', 'none');
      }, 3500);
      if (_dataCenter2.default.errors[0].message.includes('answer')) {
        answer.style.borderColor = 'red';
      }
    }

    /**
      * @static
      *
      * @returns {object} - shows errors on update answer form
      *
      * @description This method renders a validation messages and signs
      * @memberOf RenderUi
      */

  }, {
    key: 'showErrorsOnPreferAnswer',
    value: function showErrorsOnPreferAnswer() {
      if (_dataCenter2.default.errors[0].message.includes('answer')) {
        RenderUi.renderNotification('notificationDisplay', 'block', 'You cant prefer this answer');
        setTimeout(function () {
          return RenderUi.renderNotification('notificationDisplay', 'none');
        }, 3500);
      }
    }

    /**
      * @static
      *
      * @returns {object} - shows errors on update answer form
      *
      * @description This method renders a validation messages and signs
      * @memberOf RenderUi
      */

  }, {
    key: 'showErrorsOnVoteAnswer',
    value: function showErrorsOnVoteAnswer() {
      if (_dataCenter2.default.errors[0].message.includes('answer')) {
        RenderUi.renderNotification('notificationDisplay', 'block', _dataCenter2.default.errors[0].message);
        setTimeout(function () {
          return RenderUi.renderNotification('notificationDisplay', 'none');
        }, 3500);
      }
    }

    /**
      * @static
      *
      * @returns {object} - shows errors on update profile form
      *
      * @description This method renders a validation messages and signs
      * @memberOf RenderUi
      */

  }, {
    key: 'showErrorsOnProfileUpdateForm',
    value: function showErrorsOnProfileUpdateForm() {
      var jobRole = document.getElementById('jobRoleEdit');
      var company = document.getElementById('companyEdit');
      jobRole.style.borderColor = '';
      company.style.borderColor = '';
      RenderUi.renderNotification('notificationDisplay', 'block', _userData2.default.errors[0].message);
      setTimeout(function () {
        return RenderUi.renderNotification('notificationDisplay', 'none');
      }, 3500);
      if (_userData2.default.errors[0].message.includes('company')) {
        company.style.borderColor = 'red';
      }
      if (_userData2.default.errors[0].message.includes('jobRole')) {
        jobRole.style.borderColor = 'red';
      }
    }

    /**
      * @static
      *
      * @param {string} elementId - This is the id of the element that will display the profile
      * @param {string} setDisplay - The sets the visibility of the div element
      * @param {string} profileArray - This is the profileData of the currently logged in user
      * @param {string} userQuestionsArray - These are questions asked by this user
      * @returns {object} - renders user's data on the client side
      *
      * @description This method renders the user's profile.
      * @memberOf RenderUi
      */

  }, {
    key: 'renderUserProfile',
    value: function renderUserProfile(elementId, setDisplay, profileArray) {
      var targetDiv = document.getElementById(elementId);
      var profileDisplay = '' + RenderUi.renderProfileDetail(profileArray);
      targetDiv.style.display = setDisplay;
      targetDiv.innerHTML = profileDisplay;
      if (profileArray[0].photo !== 'image-url') {
        RenderUi.toggleDiv('dummyImage');
        RenderUi.toggleDiv('imageHolder', 'block');
      }
    }

    /**
      * @static
      *
      * @param {string} elementId - This is the id of the element to be displayed
      * @param {string} setDisplay - The sets the visibility of the div element
      * @param {string} questionsArray - This is the question array data to be passed in
      * @returns {object} - renders recent questions to the profile page
      *
      * @description This method renders recents question in a div.
      * @memberOf RenderUi
      */

  }, {
    key: 'renderRecentQuestions',
    value: function renderRecentQuestions(elementId, setDisplay, questionsArray) {
      var todaysDate = new Date(Date.now()).toDateString();
      var recentQuestions = questionsArray.filter(function (x) {
        return x.date.includes(todaysDate.split(' ')[1]) && x.date.includes(todaysDate.split(' ')[3]);
      });
      if (recentQuestions.length > 0) {
        RenderUi.renderAllQuestions('recentQuestionsDisplay', 'block', recentQuestions.length, recentQuestions);
      }
    }

    /**
      * @static
      *
      * @param {string} elementId - This is the id of the element to be displayed
      * @param {string} setDisplay - The sets the visibility of the div element
      * @param {string} questionsArray - This is the question array data to be passed in
      * @returns {object} - renders recent questions to the profile page
      *
      * @description This method renders mostAnswered question in a div.
      * @memberOf RenderUi
      */

  }, {
    key: 'renderMostAnsweredQuestions',
    value: function renderMostAnsweredQuestions(elementId, setDisplay, questionsArray) {
      var mostAnsweredQuestions = [].concat(_toConsumableArray(questionsArray));
      mostAnsweredQuestions = mostAnsweredQuestions.sort(function (x, y) {
        return y.numberOfAnswers - x.numberOfAnswers;
      });
      var refinedMostAnsweredQuestions = mostAnsweredQuestions.filter(function (x) {
        return x.numberOfAnswers > 0;
      });
      if (refinedMostAnsweredQuestions.length > 0) {
        if (refinedMostAnsweredQuestions.length > 6) {
          RenderUi.renderAllQuestions('mostAnsweredQuestionsDisplay', 'block', 6, refinedMostAnsweredQuestions);
        } else {
          RenderUi.renderAllQuestions('mostAnsweredQuestionsDisplay', 'block', refinedMostAnsweredQuestions.length, mostAnsweredQuestions);
        }
      }
    }

    /**
      * @static
      *
      * @param {string} profileArray - This is the profileData of the currently logged in user
      * @returns {object} - renders user's data on the client side
      *
      * @description This method renders the user's profile.
      * @memberOf RenderUi
      */

  }, {
    key: 'renderProfileDetail',
    value: function renderProfileDetail(profileArray) {
      var userProfileData = '\n    <div id = "photoDisplay"></div>\n    <div class = "container image-background profile-height" style = "margin: 0 auto;">\n    \n    <div class = "row ">\n        \n        <div class = "col mt-17" >\n          <h1 style = "color: white; text-align: center">Welcome to StackOverFlow-Lite</h1>\n        </div>\n        <div class = "col">\n          <div class = "profile-box" >\n            <div class = "container">\n              <div class = "col profile-header" >My Profile</div>\n              <div class = "row">\n                <div class = "col-2"> \n                  <div class = "user-icon-div" id ="dummyImage" style ="display:block"> <i class = "fa fa-user user-icon-profile"></i></div>\n                  <div class = "mt-1" > <img id ="imageHolder" class ="profilePhoto" src ="' + profileArray[0].photo + '"></div>\n                  <input type ="file" name =" file"  id= "imageUpload" style ="width:100%; display:none" accept ="images/*">\n                  </div>\n                  \n                <div class = "col-5"> \n                  <div class = "container mt-7 ml-3">\n                    <div class = "row mt-2">\n                        <div class = "col-3"><div class = "name">Name:</div></div>\n                        <div class = "col-5"><div class = "name">' + profileArray[0].fullName + '</div> </div>\n                    </div>\n                  \n                    <div class = "row mt-2">\n                        <div class = "col-3"><div class = "name">Job role:</div></div>\n                        <div class = "col-5"><div id ="jobRoleDisplay" class = "name">' + profileArray[0].jobRole + '</div> <div><input style ="display:none"id ="jobRoleEdit" type ="text"></div></div>\n                    </div>\n\n                    <div class = "row mt-2">\n                        <div class = "col-3"><div class = "name">Company:</div></div>\n                        <div class = "col-5"><div id ="companyDisplay"class = "name">' + profileArray[0].company + '</div><div><input style ="display:none" id ="companyEdit" type ="text"></div></div>\n                    </div>\n\n\n                  \n                    <div class = "row mt-7">\n                        <div class = "col"><div class = "name"><button id ="updateProfileButton">Update</button></div></div>\n                        \n                    </div>\n\n                 \n\n                  </div>\n\n                </div>\n              </div>\n              \n              <div class = "col mt-7" style = "font-weight:bold; font-size: 18pt;">Stats</div>\n              <div class = "row mt-2" style = "margin-left: 1%">\n                  <div class = "col-2"><div class = "name">You asked:</div></div>\n                  <div class = "col-5"><div class = "name">' + profileArray[0].numberOfQuestions + ' Questions</div></div>\n              </div>\n\n              <div class = "row mt-2" style = "margin-left: 1%">\n                  <div class = "col-2"><div class = "name">You answered:</div></div>\n                  <div class = "col-5"><div class = "name">' + profileArray[0].numberOfAnswers + ' Questions</div></div>\n              </div>\n              \n\n              <div class = "row mt-2" style = "margin-left: 1%">\n                  <div class = "col-2"><div class = "name">You earned:</div></div>\n                  <div class = "col-5"><div class = "name">' + profileArray[0].earnedUpvotes + ' Upvotes</div></div>\n              </div>\n\n            </div>\n      </div>\n                </div>\n    </div>\n\n   \n   </div>';
      return userProfileData;
    }
  }]);

  return RenderUi;
}();

exports.default = RenderUi;

},{"../helper/ResourceHelper.js":6,"../models/dataCenter.js":8,"../models/userData.js":9}]},{},[5]);
