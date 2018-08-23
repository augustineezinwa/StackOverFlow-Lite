import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
  * @class Security
  * @description Grants authorization to users upon valid jwt tokens
  */
class Security {
/**
  * @description -This method verifies a user before accessing any protected route.
  *
  * @param {object} request - The request payload sent to the router
  * @param {object} response - The response payload sent back from the secureRoute middleware
  * @param {object} next - The request payload sent to the next middleware in the stack.
  *
  * @returns {object} - status Message and verifies a token from a user, granting access.
  * @memberOf Security
  * @static
  */
  static guardRoute(request, response, next) {
    const token = request.body.token || request.query.token || request.headers.authorization;
    if (!token) {
      return response.status(401).json({
        status: 'fail',
        data: {
          message: 'Unauthorized!, please sign up or login!'
        }
      });
    }
    jwt.verify(token, process.env.PRIVATE_KEY, (error, decoded) => {
      if (error) {
        return response.status(401).json({
          status: 'fail',
          data: {
            message: 'Unauthorized!, please provide a valid token!'
          }
        });
      }
      const { id, email } = decoded.payload;
      request.id = id;
      request.email = email;
      return next();
    });
  }
}

export default Security;
