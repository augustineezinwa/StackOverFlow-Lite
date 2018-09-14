import userAuthData from '../../models/userData.js';
import UserViewController from '../viewControllers/UserViewController.js';
import ResourceHelper from '../../helper/ResourceHelper.js';

const {
  storeData, encrypt, decrypt, destroyData
} = ResourceHelper;
const {
  connectSignUpUserOperationToDataCenter,
  connectloginUserOperationToDataCenter
} = UserViewController;
/**
  * @class UserViewController
  *
  * @description this class manages fetch operations concerning the user
  */
class UserApiController {
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
  static signUpUser(firstName, lastName, email, password, confirmPassword) {
    userAuthData.errors.length = 0;
    userAuthData.data.loginStatus = 0;
    userAuthData.ready = 0;
    userAuthData.fail = 0;
    userAuthData.fetch = 1;
    connectSignUpUserOperationToDataCenter();
    window.fetch('https://stack-o-lite.herokuapp.com/api/v1/auth/signup', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',

      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        confirmPassword
      })
    }).then(response => response.json())
      .then((data) => {
        if (data.status === 'success') {
          userAuthData.data.loginStatus = 1;
          userAuthData.errors.length = 0;
          userAuthData.ready = 1;
          userAuthData.fetch = 0;
          userAuthData.data.message = data.message;
          userAuthData.data.token = encrypt('blowfish.io', data.data.token);
          connectSignUpUserOperationToDataCenter();
        } else {
          userAuthData.errors.push(data);
          userAuthData.ready = 1;
          userAuthData.fetch = 0;
          connectSignUpUserOperationToDataCenter();
        }
      })
      .catch((error) => {
        console.log(`${error}`);
        userAuthData.errors.push(error);
        userAuthData.fail = 1;
        userAuthData.ready = 1;
        userAuthData.fetch = 0;
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
  static loginUser(email, password) {
    userAuthData.errors.length = 0;
    userAuthData.data.loginStatus = 0;
    userAuthData.ready = 0;
    userAuthData.fail = 0;
    userAuthData.fetch = 1;
    connectloginUserOperationToDataCenter();
    window.fetch('https://stack-o-lite.herokuapp.com/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',

      },
      body: JSON.stringify({
        email,
        password
      })
    }).then(response => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === 'success') {
          userAuthData.data.loginStatus = 1;
          userAuthData.errors.length = 0;
          userAuthData.ready = 1;
          userAuthData.fetch = 0;
          userAuthData.data.message = data.message;
          userAuthData.data.token = encrypt('blowfish.io', data.data.token);
          connectloginUserOperationToDataCenter();
        } else {
          userAuthData.errors.push(data);
          console.log(userAuthData);
          userAuthData.ready = 1;
          userAuthData.fetch = 0;
          connectloginUserOperationToDataCenter();
        }
      })
      .catch((error) => {
        console.log(`${error}`);
        userAuthData.errors.push(error);
        userAuthData.fail = 1;
        userAuthData.ready = 1;
        userAuthData.fetch = 0;
        connectloginUserOperationToDataCenter();
      });
  }
}

export default UserApiController;
