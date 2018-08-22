
/**
 * @class CatchErrors
 *
 * @description catches 500 errors across StackOverFlow-Lite.
 */
class CatchErrors {
  /**
        * @description -This method takes care of any error resulting from connecting to a database
        *
        * @param {object} err - The error object catched by this handler
        * @param {object} res - The response object sent back to the client
        *
        * @returns {object} - returns the response object
        *
        * @memberOf CatchErrors class
        * @static
        */
  static catchDatabaseConnectionError(err, res) {
    return res.status(500).json({
      status: 'fail',
      message: 'database connection error!'

    });
  }

  /**
        * @description -This method takes care of any error resulting from writing to a table
        *
        * @param {object} err - The error object catched by this handler
        * @param {object} res - The response object sent back to the client
        *
        * @returns {object} - returns the response object
        *
        * @memberOf CatchErrors class
        * @static
        */
  static catchTableWriteError(err, res) {
    return res.status(500).json({
      status: 'fail',
      message: 'table write error!'

    });
  }

  /**
        * @description -This method takes care of any error resulting from reading from a table
        *
        * @param {object} err - The error object catched by this handler
        * @param {object} res - The response object sent back to the client
        *
        * @returns {object} - returns the response object to the middleware
        *
        * @memberOf CatchErrors class
        * @static
        */
  static catchTableReadError(err, res) {
    return res.status(500).json({
      status: 'fail',
      message: 'table read error!'
    });
  }

  /**
        * @description -This method takes care of any error resulting from creating a table
        *
        * @param {object} err - The error object catched by this handler
        * @param {object} res - The response object sent back to the client
        *
        * @returns {object} - returns the response object
        *
        * @memberOf CatchErrors class
        * @static
        */
  static catchTableCreationError(err, res) {
    return res.status(500).json({
      status: 'fail',
      data: {
        message: 'table creation error!'
      }
    });
  }
}
export default CatchErrors;
