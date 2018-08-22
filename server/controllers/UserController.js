import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dbConnect from '../connections/dbConnect';
import { createUser, checkEmail } from '../helper/sqlHelper';
import CatchErrors from '../helper/CatchErrors';

const { catchDatabaseConnectionError } = CatchErrors;
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
      .catch(err => catchDatabaseConnectionError('Error writing to user table', response));
  }
}

export default UserController;
