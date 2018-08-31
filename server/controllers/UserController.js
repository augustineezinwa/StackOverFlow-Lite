import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dbConnect from '../connections/dbConnect';
import SqlHelper from '../helper/SqlHelper';
import CatchErrors from '../helper/CatchErrors';

const { catchDatabaseConnectionError } = CatchErrors;
const { createUser, checkEmail } = SqlHelper;
dotenv.config();
/**
  * @class UserController
  *
  * @description Performs login and signup operations on users
  */
class UserController {
  /**
  * @description -This method signs up users into StackOverFlow-Lite
  *
  * @param {object} request - The requestuest payload sent to the router
  * @param {object} response - The responseponse payload sent back from the controller
  *
  * @returns {object} - status Message and signs up user
  *
  * @description This controller authenticates a user during signup using jwt token.
  * @memberOf UserController
  * @static
  */
  static registerUser(request, response) {
    const {
      firstName,
      lastName,
      email,
      password
    } = request.body;
    dbConnect.query(createUser(firstName, lastName, email, password))
      .then((data) => {
        const {
          id,
          email,
          firstname
        } = data.rows[0];
        const payload = {
          id,
          email
        };
        const token = jwt.sign({ payload }, process.env.PRIVATE_KEY, { expiresIn: 777 * 70 });
        return response.status(201).json({
          status: 'success',
          data: {
            message: `${firstname}, you signed up successfully.`, token
          }
        });
      })
      .catch(error => catchDatabaseConnectionError(`Error writing to user table ${error}`, response));
  }

  /**
    * @description -This method logins users into StackOverFlow-Lite
    *
    * @param {object} request - The requestuest payload sent to the router
    * @param {object} response - The responseponse payload sent back from the controller
    *
    * @returns {object} - responseponse object and message
    *
    * @description This controller authenticates a user during login using jwt token.
    * @memberOf UserController
    * @static
    */
  static loginUser(request, response) {
    dbConnect.query(checkEmail(request.body.email))
      .then((data) => {
        if (data.rows.length < 1) {
          return response.status(404).json({
            status: 'fail',
            data: {
              message: 'Invalid email or password'
            }
          });
        }
        const {
          id, email, password
        } = data.rows[0];
        const payload = {
          id,
          email
        };

        if (bcrypt.compareSync(request.body.password, password)) {
          const token = jwt.sign({ payload }, process.env.PRIVATE_KEY, { expiresIn: 777 * 70 });
          const { firstname } = data.rows[0];
          return response.status(200).json({
            status: 'success',
            data: {
              message: `${firstname}, you are logged in`, token
            }
          });
        }
        return response.status(401).json({
          status: 'fail',
          data: {
            message: 'Invalid email or password'
          }
        });
      }).catch(error => catchDatabaseConnectionError(`Error reading user table ${error} `, response));
  }
}

export default UserController;
