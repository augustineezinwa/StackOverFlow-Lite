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
        * @param {object} req - The request payload sent to the middleware
        * @param {object} res - The response payload sent back from the middleware
        * @param {object} next - The call back function to resume the next middleware
        *
        * @returns {object} - status Message and the response object
        *
        * @description This method validates the user input
        * @memberOf UserValidation
        */
  static validateUser(req, res, next) {
    req.checkBody('firstName', 'enter a valid name').matches(/^[a-zA-Z]+$/);
    req.checkBody('lastName', 'enter a valid name').matches(/^[a-zA-Z]+$/);
    req.checkBody('email', 'enter a valid email-address').isEmail();
    req.checkBody('password', 'password cant be empty').exists();
    req.checkBody('password', 'password must contain a number or special character').matches(/^(?=.*\d)(?=.*[a-zA-Z])/);
    req.checkBody('password', 'password must contain at least six characters').isLength({ min: 6 });
    req.checkBody('confirmPassword', 'password cant be empty').exists();
    req.checkBody('confirmPassword', 'password does not match').equals(req.body.password);
    const errors = req.validationErrors();
    if (!errors) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
      return next();
    }
    return res.status(422).json({
      status: 'fail',
      data: {
        [`${errors[0].param}`]: `${errors[0].msg}`
      }
    });
  }

  /**
        * @static
        *
        * @param {object} req - The request payload sent to the middleware
        * @param {object} res - The response payload sent back from the middleware
        * @param {object} next - The call back function to resume the next middleware
        *
        * @returns {object} - status Message and the response object
        *
        * @description This method checks if the a user's email is already in use
        * @memberOf UserValidation
        */
  static checkEmailReuse(req, res, next) {
    const { email } = req.body;
    dbConnect.query(checkEmail(email))
      .then((data) => {
        if (data.rows.length === 0) {
          return next();
        }
        return res.status(409).json({
          status: 'fail',
          data: {
            email: 'email is already in use'
          }
        });
      })
      .catch(err => catchTableReadError(err, res));
  }
}

export default UserValidation;
