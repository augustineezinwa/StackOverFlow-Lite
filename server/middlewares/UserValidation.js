import bcrypt from 'bcrypt';
import CatchErrors from '../helper/CatchErrors';
import dbConnect from '../connections/dbConnect';
import { checkEmail } from '../helper/sqlHelper';

const { catchDatabaseConnectionError } = CatchErrors;
/**
  * @class UserValidation
  *
  * @description Validates input fields on the user input
  */
class UserValidation {
  /**
    * @static
    *
    * @param {object} request - The request payload sent to the middleware
    * @param {object} response - The response payload sent back from the middleware
    * @param {object} next - The call back function to resume the next middleware
    *
    * @returns {object} - status Message and the response object
    *
    * @description This method validates the user input
    * @memberOf UserValidation
    */
  static validateLogin(request, response, next) {
    const { email, password } = request.body;
    if (!email) {
      return response.status(400).json({
        status: 'fail',
        data: {
          email: 'please provide an email to login'
        }
      });
    }
    if (!password) {
      return response.status(400).json({
        status: 'fail',
        data: {
          password: 'please provide password to login'
        }
      });
    }
    return next();
  }

  /**
    * @static
    *
    * @param {object} request - The request payload sent to the middleware
    * @param {object} response - The response payload sent back from the middleware
    * @param {object} next - The call back function to resume the next middleware
    *
    * @returns {object} - status Message and the response object
    *
    * @description This method validates the user input
    * @memberOf UserValidation
    */
  static validateUser(request, response, next) {
    const {
      firstName, lastName, email, password, confirmPassword
    } = request.body;
    const sendErrorResponse = (message, fieldName) => response.status(422).json({
      status: 'fail',
      data: {
        [`${fieldName}`]: message
      }
    });
    if (!firstName || !/^[a-zA-Z]+$/.test(firstName.trim())) { return sendErrorResponse('enter a valid name', 'firstName'); }
    if (!lastName || !/^[a-zA-Z]+$/.test(lastName.trim())) { return sendErrorResponse('enter a valid name', 'lastName'); }
    if (!email
      || !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.trim())) {
      return sendErrorResponse('enter a valid email-address', 'email');
    }
    if (!password) return sendErrorResponse('password cant be empty', 'password');
    if (!/^((?=.*\d)|(?=.*[!@#\$%\^&\*]))(?=.*[a-zA-Z])/.test(password)) { return sendErrorResponse('password must contain a number or special character', 'password'); }
    if (password.trim().length < 6) return sendErrorResponse('password must contain at least six characters', 'password');
    if (!confirmPassword) return sendErrorResponse('password cant be empty', 'confirmPassword');
    if (confirmPassword !== request.body.password) return sendErrorResponse('password does not match', 'confirmPassword');
    request.body.password = bcrypt.hashSync(request.body.password, 10);
    return next();
  }

  /**
    * @static
    *
    * @param {object} request - The request payload sent to the middleware
    * @param {object} response - The response payload sent back from the middleware
    * @param {object} next - The call back function to resume the next middleware
    *
    * @returns {object} - status Message and the response object
    *
    * @description This method checks if the a user's email is already in use
    * @memberOf UserValidation
    */
  static checkEmailReuse(request, response, next) {
    const { email } = request.body;
    dbConnect.query(checkEmail(email))
      .then((data) => {
        if (data.rows.length === 0) {
          return next();
        }
        return response.status(409).json({
          status: 'fail',
          data: {
            email: 'email is already in use'
          }
        });
      })
      .catch(error => catchDatabaseConnectionError(error, response));
  }
}

export default UserValidation;
