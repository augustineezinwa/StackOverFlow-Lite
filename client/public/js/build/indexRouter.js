(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _routeTable = require('./routeTable.js');

var _routeTable2 = _interopRequireDefault(_routeTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pageDisplay = document.getElementById('pageDisplay');

var renderPage = function renderPage() {
  if (!_routeTable2.default[window.location.hash]) _routeTable2.default[window.location.hash] = pageDisplay.innerHTML;
  pageDisplay.innerHTML = _routeTable2.default[window.location.hash] || _routeTable2.default[''];
};

window.addEventListener('hashchange', renderPage);
window.addEventListener('load', renderPage);

},{"./routeTable.js":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _login = require('../views/login.js');

var _login2 = _interopRequireDefault(_login);

var _home = require('../views/home.js');

var _home2 = _interopRequireDefault(_home);

var _signup = require('../views/signup.js');

var _signup2 = _interopRequireDefault(_signup);

var _ask = require('../views/ask.js');

var _ask2 = _interopRequireDefault(_ask);

var _profile = require('../views/profile.js');

var _profile2 = _interopRequireDefault(_profile);

var _questions = require('../views/questions.js');

var _questions2 = _interopRequireDefault(_questions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routeTable = {
  '': _home2.default,
  '#login': _login2.default,
  '#signup': _signup2.default,
  '#ask': _ask2.default,
  '#profile': _profile2.default
};

exports.default = routeTable;

},{"../views/ask.js":3,"../views/home.js":4,"../views/login.js":5,"../views/profile.js":6,"../views/questions.js":7,"../views/signup.js":8}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var ask = "    <div class = \"container image-background ask-bg\">\n    \n<div class = \"row\">\n    \n    <div class = \"col adjust\">\n      <h1 class =\"header\">Welcome to StackOverFlow-Lite</h1>\n    </div>\n    <div class = \"col\">\n        <div class = \"login-box\">\n        <h2>Ask A Question</h2>\n        <form class = \"\" method = \"POST\">\n            <label for=\"title\"><b>Enter Question Title</b></label>\n            <input type=\"text\" id = \"questionTitle\" >\n\n            <label for=\"password\"><b>Describe your Question</b></label>\n            <textarea  class =\"mt-2 txtarea pd-2\" id = \"questionDescription\" ></textarea>\n\n            <button type=\"submit\" id = \"askButton\"> <span id =\"askNotification\">Ask</span></button>\n        </form>\n    </div>\n            </div>\n</div>\n  \n</div>";

exports.default = ask;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var home = " <div class = \"container image-background\" style = \"margin: 0 auto\">\n    \n<div class = \"row \">\n    \n    <div class = \"col mt-10\">\n      <h1 style = \"color: white; text-align: center\">Welcome to StackOverFlow-Lite</h1>\n    </div>\n   \n</div>\n  \n</div>\n\n<div class = \"container dashboardfooter \" id=\"dashBoardTitle\" ><h3>Trending Questions</h3></div>\n\n<div id= \"questionsDisplay\">\n<div class = \"container\" >\n<div class =\"row no-questions\" >\n  \n  <div class =\"alignCardWidth\" >\n      <div class = \"card\" >\n          <div class = \"container\">\n            <div class = \"row mt-4 pd-1\" >\n              <div class = \"col-2\">\n                <div class = \"symbol-display\">\n                  <div class = \"alignSymbol\" >!</div>\n                </div>\n                \n              </div>\n              <div class = \"col-5\">\n                <div class = \"question\" >No Questions yet!  &nbsp Refresh page  </div>\n\n              </div>\n            </div>\n           \n              <div class = \"col\" style=\"text-align:right\"><span></span><span></span><a href =\"/\"><button type= \"answer\">Refresh</button></a></div>\n           \n          </div>\n        </div>\n  </div>\n  \n</div>\n</div>\n\n</div>\n";

exports.default = home;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var login = "<div class = \"container image-background ask-bg\" style = \"margin: 0 auto;\">\n    \n<div class = \"row \">\n    \n    <div class = \"col \" style = \"margin-top:18%\">\n      <h1 style = \"color: white; text-align: center\">Welcome to StackOverFlow-Lite</h1>\n    </div>\n    <div class = \"col\">\n        <div class = \"login-box\">\n        <h2>Login</h2>\n        <form class = \"\"method = \"POST\">\n            <label for=\"email\"><b>Enter Email</b></label>\n            <input type=\"text\" name=\"email\"  id =\"email\">\n            \n            <label for=\"password\"><b>Enter password</b></label>\n            <input type=\"password\" name=\"password\" id=\"password\">\n            \n            <button type=\"submit\"id=\"loginButton\"> <span id =\"loginNotification\">Login</span></button>\n        </form>\n    </div>\n            </div>\n</div>\n  \n</div>\n\n\n<div class = \"container \" style = \"background-color: #f1f1f1\">\n\n\n</div>\n\n\n";

exports.default = login;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var profile = "  \n\n<div id =\"profileDisplay\"> \n<div id = \"photoDisplay\"></div>\n<div class = \"container image-background profile-height\" style = \"margin: 0 auto;\">\n    \n<div class = \"row \">\n    \n    <div class = \"col mt-17\" >\n      <h1 style = \"color: white; text-align: center\">Welcome to StackOverFlow-Lite</h1>\n    </div>\n    <div class = \"col\">\n      <div class = \"profile-box\" >\n        <div class = \"container\">\n          <div class = \"col profile-header\" >My Profile</div>\n          <div class = \"row\">\n            <div class = \"col-2\"> \n            <div class = \"user-icon-div\" id =\"dummyImage\" style =\"display:block\"> <i class = \"fa fa-user user-icon-profile\"></i></div>\n            <div class = \"mt-1\" > <img id =\"imageHolder\" class =\"profilePhoto\" src =\"http://donkeys.com\"></div>\n            <input type =\"file\" name =\" file\"  id= \"imageUpload\" style =\"width:100%; display:none\" accept =\"images/*\">\n            </div>\n              \n            <div class = \"col-5\"> \n              <div class = \"container mt-7 ml-3\">\n                <div class = \"row mt-2\">\n                    <div class = \"col-3\"><div class = \"name\">Name:</div></div>\n                    <div class = \"col-5\"><div class = \"name\">---- -----</div></div>\n                </div>\n              \n                <div class = \"row mt-2\">\n                    <div class = \"col-3\"><div class = \"name\">Job role:</div></div>\n                    <div class = \"col-5\"><div id=\"jobRoleDisplay\" class = \"name\">---- --- ---</div><div><input style =\"display:none\" id =\"jobRoleEdit\" type =\"text\"></div></div>\n                </div>\n\n                <div class = \"row mt-2\">\n                    <div class = \"col-3\"><div class = \"name\">Company:</div></div>\n                    <div class = \"col-5\"><div id = \"companyDisplay\"class = \"name\">----</div><div><input style =\"display:none\" id =\"companyEdit\" type =\"text\"></div></div>\n                </div>\n\n\n              \n                <div class = \"row mt-7\">\n                    <div class = \"col-3\"><div class = \"name\"><button id =\"updateProfileButton\">Update</button></div></div>\n                    <div class = \"col-5\"><div class = \"name\"></div></div>\n                </div>\n\n             \n\n              </div>\n\n            </div>\n          </div>\n          \n          <div class = \"col mt-7\" style = \"font-weight:bold; font-size: 18pt;\">Stats</div>\n          <div class = \"row mt-2\" style = \"margin-left: 1%\">\n              <div class = \"col-2\"><div class = \"name\">You asked:</div></div>\n              <div class = \"col-5\"><div class = \"name\">- Questions</div></div>\n          </div>\n\n          <div class = \"row mt-2\" style = \"margin-left: 1%\">\n              <div class = \"col-2\"><div class = \"name\">You answered:</div></div>\n              <div class = \"col-5\"><div class = \"name\">- Questions</div></div>\n          </div>\n          \n\n          <div class = \"row mt-2\" style = \"margin-left: 1%\">\n              <div class = \"col-2\"><div class = \"name\">You earned:</div></div>\n              <div class = \"col-5\"><div class = \"name\">- Upvotes</div></div>\n          </div>\n\n        </div>\n  </div>\n            </div>\n</div>\n\n\n</div>\n</div>\n\n<div class = \"container profiledashboardfooter\" ><h3>Your Questions with Most Answers</h3></div>\n\n\n<div id= \"mostAnsweredQuestionsDisplay\">\n<div class = \"container\" >\n<div class =\"row no-questions\" >\n  \n  <div class =\"alignCardWidth\" >\n      <div class = \"card\" >\n          <div class = \"container\">\n            <div class = \"row mt-4 pd-1\" >\n              <div class = \"col-2\">\n                <div class = \"symbol-display\">\n                  <div class = \"alignSymbol\" >!</div>\n                </div>\n                \n              </div>\n              <div class = \"col-5\">\n                <div class = \"question\" >No Questions yet!  &nbsp Refresh page  </div>\n\n              </div>\n            </div>\n           \n              <div class = \"col\" style=\"text-align:right\"><span></span><span></span><a href =\"/\"><button id =\"refreshTwo\"type= \"answer\">Refresh</button></a></div>\n           \n          </div>\n        </div>\n  </div>\n  \n</div>\n</div>\n\n</div>\n\n<div class = \"container profiledashboardfooter mt-1\" ><h3>Your Recent Questions</h3></div>\n\n<div id= \"recentQuestionsDisplay\">\n<div class = \"container\" >\n<div class =\"row no-questions\" >\n  \n  <div class =\"alignCardWidth\" >\n      <div class = \"card\" >\n          <div class = \"container\">\n            <div class = \"row mt-4 pd-1\" >\n              <div class = \"col-2\">\n                <div class = \"symbol-display\">\n                  <div class = \"alignSymbol\" >!</div>\n                </div>\n                \n              </div>\n              <div class = \"col-5\">\n                <div class = \"question\" >No Questions yet!  &nbsp Refresh page  </div>\n\n              </div>\n            </div>\n           \n              <div class = \"col\" style=\"text-align:right\"><span></span><span></span><a href =\"/\"><button id =\"refresh\"type= \"answer\">Refresh</button></a></div>\n           \n          </div>\n        </div>\n  </div>\n  \n</div>\n</div>\n\n</div>";

exports.default = profile;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var questions = "\n<div class = \"container question-background \" >\n\n    <div class = \"row \">\n        \n        <div class = \"col\">\n            <div class = \"question-card\">\n            <h2>My Android refuses to run its latest version ?</h2>\n            <div class = \"underline\">&nbsp</div>\n            <div class = \"row\">\n              <div class = \"col-5\">My android device is not responding since I installed its latest operating system\n                <div class = \"mt-4 ft\">Asked by Augustine Ezinwa  &nbsp <span class = \"darkgray\" > 15 mins ago</span></div>\n              </div>\n              <div class = \"col-2\">\n                <div class = \"row\">\n                    <div class = \"col\"> 20 upvotes</div>\n                    <div class = \"col\">1 downvotes</div>\n                </div>\n              </div>\n            </div>\n\n            <div>&nbsp</div>\n            <div class = \"underline;\">&nbsp</div>\n\n            <div class =\"\"> <h3>3 Answers</h3></div>\n\n            <div class = \"underline\">&nbsp</div>\n            <div class = \"row\">\n              <div class = \"col-5\">Consider resetting your device to factory settings. \n                <div class = \"row mt-4\">\n                  <div class = \"col\"><div class = \"ft\">Answered by Augustine Ezinwa  &nbsp <span class = \"darkgray\" >15 mins ago</span></div></div>\n                  <div class = \"col \">\n                    <div class = \"row\">\n                      <div class = \"col\"> <a href =\"\"  id =\"fish\"><button type =comment>Comment</button></a></div>\n                      \n                      <div class = \"col \" > <div class = \"darkgray\">View Comments </div></div>\n                      \n                    </div>\n                    \n                    </div>\n                   \n\n                </div>\n              </div>\n              <div class = \"col-2\">\n                <div class = \"row\">\n                    <div class = \"col\"> 20 upvotes</div>\n                    <div class = \"col\">1 downvotes</div>\n                </div>\n\n                <div class = \"row\">\n                    <div class = \"col\"><span> <i class=\"fas fa-thumbs-up blue resize\"></i></span></div>\n                    <div class = \"col\"><span> <i class=\"fas fa-star blue resize\"></i></span></div>\n                    <div class = \"col\"><span> <i class=\"fas fa-thumbs-down blue resize\"></i></span></div>\n                </div>\n              </div>\n\n            </div>\n     \n            \n          \n\n            <div>&nbsp</div>\n\n            <div class = \"underline\">&nbsp</div>\n\n            <div class = \"row\">\n                <div class = \"col-5\">Consider resetting your device to factory settings. \n                  <div class = \"row mt-4\">\n                    <div class = \"col\"><div class = \"ft\">Answered by Augustine Ezinwa  &nbsp <span class = \"darkgray\">15 mins ago</span></div></div>\n                    <div class = \"col \">\n                      <div class = \"row\">\n                        <div class = \"col\"> <button type =\"comment\">Comment</button></div>\n                        \n                        <div class = \"col darkgray\" >  View Comments </div>\n                        \n                      </div>\n                      \n                      </div>\n                     \n\n                  </div>\n                </div>\n                <div class = \"col-2\">\n                  <div class = \"row\">\n                      <div class = \"col\"> 20 upvotes</div>\n                      <div class = \"col\">1 downvotes</div>\n                  </div>\n\n                  <div class = \"row\">\n                      <div class = \"col\"><span> <i class=\"fas fa-thumbs-up blue resize\"></i></span></div>\n                      <div class = \"col\"><span> <i class=\"fas fa-star blue resize\"></i></span></div>\n                      <div class = \"col\"><span> <i class=\"fas fa-thumbs-down blue resize\"></i></span></div>\n                  </div>\n                </div>\n              </div>\n\n              <div>&nbsp</div>\n\n              <div class = \"underline\">&nbsp</div>\n            <form class = \"\">\n    \n                <label for=\"password\"><b>Add an answer</b></label>\n                <textarea  class =\"mt-2 txtarea\"required ></textarea>\n    \n                <button type=\"submit\"> Add</button>\n            </form>\n        </div>\n                </div>\n    </div>\n      \n   </div>\n";

exports.default = questions;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
                value: true
});
var signup = "\n<div class = \"container image-background ask-bg \"id=\"ask-bg\" style = \"margin: 0 auto;\">\n\n    <div class = \"row \">\n        \n        <div class = \"col \"style =\"margin-top: 18%\">\n          <h1 style = \"color: white; text-align: center;z-index: 10\">Welcome to StackOverFlow-Lite</h1>\n        </div>\n        <div class = \"col\">\n            <div class = \"login-box\">\n            <h2>Signup</h2>\n            <form class = \"\" method = \"POST\">\n                <label for=\"email\"><b>Enter Full Name</b></label>\n                <input type=\"text\" name=\"fullName\" id=\"fullName\" ><span id =\"goodFullName\"><i class =\"fa fa-check\"></i></span>\n                <div id = \"nameNotificationError\"></div>\n\n                <label for=\"email\"><b>Enter Email</b></label>\n                <input type=\"text\" name=\"email\" id =\"email\"><span id =\"goodEmail\"><i class =\"fa fa-check\"></i></span>\n                <div id = \"emailNotificationError\"></div>\n\n                <label for=\"password\"><b>Enter password</b></label>\n                <input type=\"password\" name=\"password\" id =\"password\"><span id =\"goodPassword\"><i class =\"fa fa-check\"></i></span>\n                <div id = \"passwordNotificationError\"></div>\n\n                <label for=\"password\"><b>Confirm password</b></label>\n                <input type=\"password\" name=\"password\" id =\"confirmPassword\"><span id =\"goodConfirmPassword\"><i class =\"fa fa-check\"></i></span>\n                <div id = \"confirmPasswordNotificationError\"></div>\n\n                <button type=\"\" id =\"signupButton\"> <span id =\"signupNotification\">Signup</span></button>\n            </form>\n        </div>\n                </div>\n    </div>\n      \n   </div>\n\n<div class = \"container \" style = \"background-color: #f1f1f1\">\n\n\n</div>\n\n";

exports.default = signup;

},{}]},{},[1]);
