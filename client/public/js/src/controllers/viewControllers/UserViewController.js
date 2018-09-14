import Validation from '../../helper/Validation.js';
import RenderUi from '../../views/RenderUi.js';
import userAuthData from '../../models/userData.js';
import QuestionViewController from './QuestionViewController.js';
import ResourceHelper from '../../helper/ResourceHelper.js';

const { attachSwitchOffModalEvent } = QuestionViewController;
const { isValid, validateConfirmPassword } = Validation;
const {
  renderNotifications, renderNotification, renderNotificationInButton, renderModal, showErrors,
  toggleDiv
} = RenderUi;
const { storeData, destroyData } = ResourceHelper;
/**
  * @class UserViewController
  *
  * @description this class manages events and views on the signup and login pages
  */
class UserViewController {
  /**
    * @static
    *
    * @returns {object} - binds view to datacenter
    *
    * @description This method binds users actions to datacenter;
    * @memberOf UserViewController
    */
  static connectSignUpUserOperationToDataCenter() {
    if (!userAuthData.ready && userAuthData.fetch) {
      renderNotificationInButton('signupNotification', 'block', 'Signing up ...');
    }
    if (userAuthData.ready) renderNotificationInButton('signupNotification', 'block');
    if (userAuthData.ready && userAuthData.errors.length > 0) {
      showErrors();
    }
    if (userAuthData.data.loginStatus === 1) {
      storeData('token', userAuthData.data.token);
      storeData('loginStatus', 1);
      userAuthData.data.token = '';
      renderNotification('notificationDisplay', 'block', userAuthData.data.message);
      setTimeout(() => renderNotification('notificationDisplay', 'none'), 4000);
      window.location.hash = '';
      toggleDiv('loginLink');
      toggleDiv('signupLink');
      toggleDiv('profileLink', '');
    }
    if (userAuthData.fail && userAuthData.ready) {
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
  static connectloginUserOperationToDataCenter() {
    if (!userAuthData.ready && userAuthData.fetch) {
      renderNotificationInButton('loginNotification', 'block', 'Logging in ...');
    }
    if (userAuthData.ready) renderNotificationInButton('loginNotification', 'block','', 'Login');
    if (userAuthData.ready && userAuthData.errors.length > 0 && !userAuthData.fail) {
      console.log(userAuthData.errors);
      renderNotification('notificationDisplay', 'block', userAuthData.errors[0].message);
      setTimeout(() => renderNotification('notificationDisplay', 'none'), 4000);
    }
    if (userAuthData.data.loginStatus === 1) {
      storeData('token', userAuthData.data.token);
      storeData('loginStatus', 1);
      userAuthData.data.token = '';
      renderNotification('notificationDisplay', 'block', userAuthData.data.message);
      setTimeout(() => renderNotification('notificationDisplay', 'none'), 4000);
      window.location.hash = '';
      toggleDiv('loginLink');
      toggleDiv('signupLink');
      toggleDiv('profileLink', '');
    }
    if (userAuthData.fail && userAuthData.ready) {
      renderModal('modalDisplay', 'block', 'Internet Connection Error!');
      attachSwitchOffModalEvent('shutDownButton', 'modalDisplay');
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
  static validateSignup() {
    const email = document.getElementById('email');
    const fullName = document.getElementById('fullName');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    email.addEventListener('keyup', () => UserViewController.validateField(email.value, 'email'));
    fullName.addEventListener('keyup', () => UserViewController.validateField(fullName.value, 'fullName'));
    password.addEventListener('keyup', () => UserViewController.validateField(password.value, 'password'));
    confirmPassword.addEventListener('keyup', () => {
      const elementId = 'confirmPasswordNotificationError';
      const indicator = 'goodConfirmPassword';
      const message = '* Password does not match';
      const fieldName = 'confirmPassword';
      if (validateConfirmPassword(password.value, confirmPassword.value) || !password.value) {
        renderNotifications(fieldName, elementId, message, indicator, 'none');
      } else { renderNotifications(fieldName, elementId, '', indicator, 'inline', '90%'); }
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
  static validateField(fieldValue, fieldName) {
    let elementId, indicator, message = '';
    if (fieldName === 'fullName') {
      elementId = 'nameNotificationError'; indicator = 'goodFullName';
      message = '* Enter Full Name in this format <p>* [firstname lastname]  <= separated by space</p> ';
    }
    if (fieldName === 'email') {
      elementId = 'emailNotificationError'; indicator = 'goodEmail';
      message = '* Enter a valid email';
    }
    if (fieldName === 'password') {
      elementId = 'passwordNotificationError'; indicator = 'goodPassword';
      message = '* Password must be at least 5 characters and must contain a number or special characters like ^%$&#';
    }
    if (!isValid(fieldValue, fieldName)) renderNotifications(fieldName, elementId, message, indicator, 'none');
    else renderNotifications(fieldName, elementId, '', indicator, 'inline', '90%');
  }
}
export default UserViewController;
