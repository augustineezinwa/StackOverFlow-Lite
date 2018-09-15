import questionData from '../models/dataCenter.js';
import userAuthData from '../models/userData.js';
import ResourceHelper from '../helper/ResourceHelper.js';

const { getInformationFromDataCenter } = ResourceHelper;

/**
  * @class RenderUi
  *
  * @description this class render all Ui components to the client
  */
class RenderUi {
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
  static renderNotification(elementId, setDisplay = 'none', message = '') {
    const targetDiv = document.getElementById(elementId);
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
  static renderNotificationInButton(elementId, setDisplay = 'none', message = '', defaultLabel = 'Signup') {
    const content = (message) ? `<span><i class ="fas fa-spinner fa-pulse"></i></span> &nbsp ${message}`
      : `${defaultLabel}`;

    const targetDiv = document.getElementById(elementId);
    targetDiv.innerHTML = content;
    targetDiv.style.display = setDisplay;
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
  static toggleButton(elementId, setDisplay = 'none') {
    const targetButton = document.getElementById(elementId);
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
  static modifyTitle(elementId, newTitle, data = '') {
    const targetDiv = document.getElementById(elementId);
    const newData = data ? `: ${data}` : '';
    targetDiv.innerHTML = `<h3>${newTitle} ${newData}</h3>`;
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
  static toggleDiv(elementId, setDisplay = 'none') {
    const targetButton = document.getElementById(elementId);
    targetButton.style.display = setDisplay;
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
  static renderModal(elementId, setDisplay, message = '') {
    const targetDiv = document.getElementById(elementId);
    targetDiv.style.display = setDisplay;
    targetDiv.innerHTML = `<div class = "container modal" >
    <div class = "row" >
      <div class = "col"></div>
      <div class = "col">
       <div class = "card">
         <div class = "container">
           <div class = "row mt-4 pd-1" >
             <div class = "col-2">
               <div class = "symbol-display">
                 <div class = "alignSymbol">!</div>
               </div>
               
             </div>
             <div class = "col-5">
               <div class = "question">${message || 'No message available!'}</div>
   
             </div>
           </div>
          
             <div class = "col" style = "text-align: right; padding:1%" ><span></span><span></span><a
             >
             <button type= "answer" id = "shutDownButton" >Ok</button></a></div>
          
         </div>
       </div>
      </div>
      <div class ="col"></div>
    </div>
       </div> `;
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
  static renderModalLoader(elementId, setDisplay, message = '') {
    const targetDiv = document.getElementById(elementId);
    targetDiv.innerHTML = `<div class = "container modal" >
    <div class = "row" >
      <div class = "col"></div>
      <div class = "col">
       <div class = "card">
         <div class = "container">
           <div class = "row mt-4 pd-1" >
             <div class = "col-2">
               <div class = "symbol-display">
                 <div class = "alignSymbol"><span><i class ="fas fa-spinner fa-pulse"></i></span></div>
               </div>
               
             </div>
             <div class = "col-5">
               <div class = "question">${message || 'No message available!'}</div>
   
             </div>
           </div>
          
         </div>
       </div>
      </div>
      <div class ="col"></div>
    </div>
       </div> `;
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
  static notifyEmptyResult(elementId, setDisplay = 'none', message = '') {
    const targetDiv = document.getElementById(elementId);
    targetDiv.innerHTML = `    <div class = "container" >
    <div class ="row no-questions" >
      
      <div class ="alignCardWidth" >
          <div class = "card" >
              <div class = "container">
                <div class = "row mt-4 pd-1" >
                  <div class = "col-2">
                    <div class = "symbol-display">
                      <div class = "alignSymbol" >!</div>
                    </div>
                    
                  </div>
                  <div class = "col-5">
                    <div class = "question" > ${message || 'No Questions Yet! refresh page'}  </div>
  
                  </div>
                </div>
               
                  <div class = "col" style="text-align:right"><span></span><span></span><a href ="/"><button id="refresh" type= "answer">Refresh</button></a></div>
               
              </div>
            </div>
      </div>
      
    </div>
  </div>`;
    targetDiv.style.display = setDisplay;
  }

  /**
    * @static
    *
    * @param {string} answerId - This is the id of the answer to be displayed
    * @param {string} answer - The answer to be displayed
    * @param {string} upVotes - This is the total upvotes to this answer
    * @param {string} downVotes - This is the total downvotes to this answer
    * @param {string} approved - This is indicates if an answer is preffered or not
    * @returns {object} - renders the particular answer
    *
    * @description This method renders a particular answer in a div
    * @memberOf RenderUi
    */
  static renderAnswer(answerId, answer, upVotes, downVotes, approved = false) {
    return `<div class = "row">
   <div class = "col-5">${answer} 
     <div class = "row mt-4">
       <div class = "col"><div class = "ft">Answered by 
       ${getInformationFromDataCenter(questionData.data.users, 'id',
    getInformationFromDataCenter(questionData.data.questionWithAnswers.answers, 'id', answerId, 'userId'), 'fullName')}  
    &nbsp <span class = "darkgray" >
    ${
  getInformationFromDataCenter(questionData.data.questionWithAnswers.answers, 'id', answerId, 'date')}
    &nbsp at &nbsp
    ${
  getInformationFromDataCenter(questionData.data.questionWithAnswers.answers, 'id', answerId, 'time')}
    </span></div></div>
       <div class = "col ">
         <div class = "row">
           <div class = "col"> <a href=""><button key="${answerId}"type =comment>Comment</button></a></div>
           
           <div class = "col " > <div class = "darkgray" key ="${answerId}">View Comments </div></div>
           
         </div>
         
         </div>
        

     </div>
   </div>
   <div class = "col-2">
     <div class = "row">
         <div class = "col"> ${upVotes} upvotes</div>
         <div class = "col">${downVotes} downvotes</div>
     </div>

     <div class = "row">
         <div class = "col"><span id ="thumbsUp" key= ${answerId}> <i class="fas fa-thumbs-up blue resize"></i></span></div>
         <div class = "col"><span id ="prefer" key=${answerId}> <i class="fas fa-star blue resize"></i></span></div>
         <div class = "col"><span id= "thumbsDown" key= ${answerId}> <i class="fas fa-thumbs-down blue resize"></i></span></div>
     </div>
   </div>

 </div>

 


 <div>&nbsp</div>

 <div class = "underline">&nbsp</div>`;
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
  static renderQuestion(questionId, questionTitle, answerNumber,
    totalUpVotes, totalDownVotes) {
    let newQuestionTitle;
    if (questionTitle.length > 55) {
      newQuestionTitle = `${questionTitle.substr(0, 70)} ...`;
    }
    return `<div class = "card">
      <div class = "container">
        <div class = "row mt-4 pd-1" >
          <div class = "col-2">
            <div class = "symbol-display">
              <div class = "alignSymbol">A</div>
            </div>
            
          </div>
          <div class = "col-5">
            <div class = "question">${newQuestionTitle || questionTitle}</div>

          </div>
        </div>
        <div class = "row mt-2 pd-1">
          <div class = "col"> <span> ${answerNumber} Answers</span></div>
    <div class = "col"><span> <i class="fas fa-thumbs-up"></i></span>&nbsp ${totalUpVotes}<span></span></div>
          <div class = "col"><span> <i class="fas fa-thumbs-down "></i></span>&nbsp ${totalDownVotes}<span><span></span></div>
          <div class = "col"><span></span><span></span><a href =#question-${questionId} >
          <button class="viewButton" key=${questionId} type= "answer">View</button></a></div>
        </div>
      </div>
    </div>`;
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
  static renderQuestionWithAnswers(elementId, setDisplay = 'none') {
    const targetDiv = document.getElementById(elementId);
    targetDiv.style.display = setDisplay;
    const formatAnswers = questionData.data
      .questionWithAnswers.answers.map(x => RenderUi.renderAnswer(x.id, x.answer, x.upvotes, x.downvotes, x.approved));
    const refineAnswers = formatAnswers.join(' ');
    const calcVotes = (votes) => {
      let i = 0;
      questionData.data.questionWithAnswers.answers.forEach((x) => { i += x[votes]; });
      return i;
    };

    const totalUpVotes = calcVotes('upvotes');
    const totalDownVotes = calcVotes('downvotes');
    const answerHeader = `<div class =""> <h3>${questionData.data.questionWithAnswers.answers.length} 
    Answers</h3></div><div class = "underline">&nbsp</div>`;
    const question = `<h2>${questionData.data.questionWithAnswers.questionTitle}</h2>
    <div class = "underline">&nbsp</div>
    <div class = "row">
      <div class = "col-5 pr-1" >${questionData.data.questionWithAnswers.questionDescription} 
        <div class = "mt-4 ft">Asked by 
        ${getInformationFromDataCenter(questionData.data.users, 'id', questionData.data.questionWithAnswers.userId, 'fullName')}  
        &nbsp <span class = "darkgray" >
        ${questionData.data.questionWithAnswers.date}
        &nbsp at &nbsp
        ${questionData.data.questionWithAnswers.time.substr(0, 15)}
        </span></div>
      </div>
      <div class = "col-2 ">
        <div class = "row ">
            <div class = "col">${totalUpVotes} upvotes</div>
            <div class = "col">${totalDownVotes} downvotes</div>
        </div>
      </div>
    </div>

    <div>&nbsp</div>
    <div class = "underline;">&nbsp</div>`;

    const addAnswer = `<form class = "" method = "POST">
        
    <label for="password"><b>Add an answer</b></label>
    <textarea  class ="mt-2 txtarea" id = "answer"></textarea>

    <button type="submit" key=${questionData.data.questionWithAnswers.id} id = "answerButton" > 
    Add
    </button>
</form>`;

    const formattedQuestionDisplay = `<div class = "container question-background " >
    <div class = "row ">
        <div class = "col">
            <div class = "question-card">
                ${question}
                ${answerHeader}
                ${refineAnswers}
                ${addAnswer}
            </div>
            </div>
            </div>
            </div>`;
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
  static renderAllQuestions(elementId, setDisplay, length, questionsArray) {
    const targetDiv = document.getElementById(elementId);
    targetDiv.style.display = setDisplay;
    let questions = [];
    [...questions] = [...questionsArray];
    if (length > questionsArray.length) { length = questionsArray.length; }
    questions.length = length;
    questionData.loadMore = length;
    let formattedQuestionDispay;
    let i = 0;
    let counter = 0;
    const formatQuestions = questions.map(x => `<div class ="col">
      ${RenderUi.renderQuestion(x.id, x.questionTitle, x.numberOfAnswers, x.upvotes, x.downvotes)}</div>`);
    let setQuestionInRow = '';
    const formatQuestionsWithRows = formatQuestions.map((x) => {
      setQuestionInRow += x;
      i += 1;
      counter += 1;
      if (i === 3 || counter === formatQuestions.length) {
        i = 0;
        const formattedQuestions = setQuestionInRow;
        setQuestionInRow = '';
        return `<div class ="row">${formattedQuestions}</div>`;
      }
    });
    const refinedQuestions = formatQuestionsWithRows.filter(x => x !== undefined);
    formattedQuestionDispay = refinedQuestions.join(' ');

    if (length % 3 === 1) {
      const questionUnderReform = refinedQuestions.pop();
      let reformedQuestion = questionUnderReform.split(' ').join(' ');
      reformedQuestion = reformedQuestion.substring(0, reformedQuestion.length - 6);
      reformedQuestion += '<div class = "col"></div><div class = "col"></div></div>';

      formattedQuestionDispay = refinedQuestions.join(' ') + reformedQuestion;
    }
    if (length % 3 === 2) {
      const questionUnderReform = refinedQuestions.pop();

      let reformedQuestion = questionUnderReform.split(' ').join(' ');
      reformedQuestion = reformedQuestion.substring(0, reformedQuestion.length - 6);
      reformedQuestion += '<div class ="col"></div></div>';
      formattedQuestionDispay = refinedQuestions + reformedQuestion;
    }
    const loadMoreButton = `<div class ="mb-1 mt-1" style="text-align: center"><button id ="loadMore" type="answer">Load more</button></div>
    `;
    targetDiv.innerHTML = `<div class = "container " style = "background-color: #f1f1f1">
              ${formattedQuestionDispay} 
              
              </div>
              ${loadMoreButton}
              `;
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
  static renderNotifications(fieldName, elementId, message = '', indicator, display = 'none', width = '') {
    const fieldDiv = document.getElementById(fieldName);
    const targetDiv = document.getElementById(elementId);
    const askbg = document.getElementById('ask-bg');
    const good = document.getElementById(indicator);
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
  static showErrors() {
    const firstName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    firstName.style.borderColor = '';
    email.style.borderColor = '';
    password.style.borderColor = '';
    confirmPassword.style.borderColor = '';
    RenderUi.renderNotification('notificationDisplay', 'block', userAuthData.errors[0].message);
    setTimeout(() => RenderUi.renderNotification('notificationDisplay', 'none'), 3500);
    if (userAuthData.errors[0].message.includes('name')) {
      firstName.style.borderColor = 'red';
    }
    if (userAuthData.errors[0].message.includes('email')) {
      email.style.borderColor = 'red';
    }
    if (!userAuthData.errors[0].message.includes('confirm')
      && userAuthData.errors[0].message.includes('password')) {
      password.style.borderColor = 'red';
    }
    if (userAuthData.errors[0].message.includes('confirm')) {
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
  static showErrorsOnPostQuestionForm() {
    const questionTitle = document.getElementById('questionTitle');
    const questionDescription = document.getElementById('questionDescription');
    questionTitle.style.borderColor = '';
    questionDescription.style.borderColor = '';
    RenderUi.renderNotification('notificationDisplay', 'block', questionData.errors[0].message);
    setTimeout(() => RenderUi.renderNotification('notificationDisplay', 'none'), 3500);
    if (questionData.errors[0].message.includes('Title')) {
      questionTitle.style.borderColor = 'red';
    }
    if (questionData.errors[0].message.includes('Description')) {
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
  static showErrorsOnPostAnswerForm() {
    const answer = document.getElementById('answer');
    console.log(answer);
    answer.style.borderColor = '';
    RenderUi.renderNotification('notificationDisplay', 'block', questionData.errors[0].message);
    setTimeout(() => RenderUi.renderNotification('notificationDisplay', 'none'), 3500);
    if (questionData.errors[0].message.includes('answer')) {
      answer.style.borderColor = 'red';
    }
  }
}

export default RenderUi;
