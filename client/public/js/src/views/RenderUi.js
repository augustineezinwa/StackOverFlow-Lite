import questionData from '../models/dataCenter.js';

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
    targetDiv.innerHTML += `<div class = "container modal" >
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
               
                  <div class = "col" style="text-align:right"><span></span><span></span><a href ="/"><button type= "answer">Refresh</button></a></div>
               
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
      newQuestionTitle = `${questionTitle.substr(0, 50)} ...`;
      console.log(newQuestionTitle);
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
          <div class = "col"><span></span><span></span><a href ="questions.html" key=${questionId}><button type= "answer">View</button></a></div>
        </div>
      </div>
    </div>`;
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
}

export default RenderUi;
