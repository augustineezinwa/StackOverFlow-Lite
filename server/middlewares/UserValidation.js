import bcrypt from 'bcrypt';
import CatchErrors from '../helper/CatchErrors';
import dbConnect from '../connections/dbConnect';
import { checkEmail } from '../helper/sqlHelper';

const { catchTableReadError } = CatchErrors;
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
    request.checkBody('firstName', 'enter a valid name').matches(/^[a-zA-Z]+$/);
    request.checkBody('lastName', 'enter a valid name').matches(/^[a-zA-Z]+$/);
    request.checkBody('email', 'enter a valid email-address').isEmail();
    request.checkBody('password', 'password cant be empty').exists();
    request.checkBody('password', 'password must contain a number or special character').matches(/^(?=.*\d)(?=.*[a-zA-Z])/);
    request.checkBody('password', 'password must contain at least six characters').isLength({ min: 6 });
    request.checkBody('confirmPassword', 'password cant be empty').exists();
    request.checkBody('confirmPassword', 'password does not match').equals(request.body.password);
    const errors = request.validationErrors();
    if (!errors) {
      request.body.password = bcrypt.hashSync(request.body.password, 10);
      return next();
    }
    return response.status(422).json({
      status: 'fail',
      data: {
        [`${errors[0].param}`]: `${errors[0].msg}`
      }
    });
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
      .catch(error => catchTableReadError(error, response));
  }
}

export default UserValidation;
