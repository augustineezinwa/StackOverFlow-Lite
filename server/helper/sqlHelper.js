const createTableForUsers = () => `DROP TABLE IF EXISTS users CASCADE;
                                CREATE TABLE users(id  SERIAL UNIQUE PRIMARY KEY,
                                    firstName TEXT  NOT NULL,
                                    lastName  TEXT  NOT NULL,
                                    email VARCHAR(60) UNIQUE NOT NULL,
                                    password VARCHAR(130) NOT NULL,
                                    jobRole VARCHAR(60) NOT NULL,
                                    company VARCHAR(60) NOT NULL,
                                    photo VARCHAR(100) NOT NULL,
                                    time VARCHAR(80) NOT NULL,
                                    date VARCHAR(80) NOT NULL);`;

const createTableForQuestions = () => `DROP TABLE IF EXISTS questions CASCADE;
                                    CREATE TABLE questions(id SERIAL UNIQUE PRIMARY KEY,
                                    questionTitle VARCHAR(100) NOT NULL,
                                    questionDescription VARCHAR(300) NOT NULL,
                                    time VARCHAR(80) NOT NULL,
                                    date VARCHAR(80) NOT NULL,
                                    userId SERIAL references users(ID) ON DELETE CASCADE);`;

const createTableForAnswers = () => `DROP TABLE IF EXISTS answers CASCADE;
                                    CREATE TABLE answers(id SERIAL UNIQUE PRIMARY KEY,
                                    answer VARCHAR(300) NOT NULL,
                                    upvotes INT NOT NULL,
                                    downvotes INT NOT NULL,
                                    approved BOOLEAN NOT NULL,
                                    time VARCHAR(80) NOT NULL,
                                    date VARCHAR(80) NOT NULL,
                                    questionId SERIAL references questions(ID) ON DELETE CASCADE,
                                    userId SERIAL references users(ID) ON DELETE CASCADE);`;

const createTableForComments = () => `DROP TABLE IF EXISTS comments CASCADE;
                                     CREATE TABLE comments(id SERIAL UNIQUE PRIMARY KEY,
                                     comment VARCHAR(300) NOT NULL,
                                     upvotes SERIAL NOT NULL,
                                     downvotes SERIAL NOT NULL,
                                     time VARCHAR(80) NOT NULL,
                                     date VARCHAR(80) NOT NULL,
                                     answerId SERIAL references answers(ID) ON DELETE CASCADE,
                                     questionId SERIAL references questions(ID) ON DELETE CASCADE,
                                     userId SERIAL references users(ID) ON DELETE CASCADE);`;

const createUser = (firstName, lastName, email, password, jobRole = 'Update your job role',
  company = 'Update your company name', photo = 'image-url') => {
  const query = {
    text: `INSERT INTO users(firstName, lastName, email, password, jobRole, company, photo, time, date)
                                            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
    values: [firstName, lastName, email, password, jobRole, company, photo,
      (new Date(Date.now())).toTimeString(), (new Date(Date.now())).toDateString()]
  };
  return query;
};

const checkEmail = (email) => {
  const query = {
    text: 'SELECT * FROM users WHERE users.email = $1',
    values: [email]
  };
  return query;
};

const createQuestion = (questionTitle, questionDescription, id) => {
  const query = {
    text: `INSERT INTO questions(questionTitle, questionDescription, time, date, userId)
           VALUES($1, $2, $3, $4, $5) RETURNING * `,
    values: [questionTitle, questionDescription,
      (new Date(Date.now())).toTimeString(), (new Date(Date.now())).toDateString(), id]
  };
  return query;
};

const getAUserQuestion = (userId, id) => {
  const query = {
    text: 'SELECT * FROM questions where questions.userid = $1 and questions.id = $2',
    values: [userId, id]
  };
  return query;
};

const createAnswer = (answer, id, questionId) => {
  const query = {
    text: `INSERT INTO answers(answer, upvotes, downvotes, approved, time, date, questionid,  userid)
           VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING * `,
    values: [answer, 0, 0, false,
      (new Date(Date.now())).toTimeString(), (new Date(Date.now())).toDateString(), questionId, id]
  };
  return query;
};

const createComment = (comment, id, questionId, answerId) => {
  const query = {
    text: `INSERT INTO comments(comment, upvotes, downvotes, time, date, answerid, questionId, userid)
           VALUES($1, $2, $3, $4, $5, $6, $7,$8 ) RETURNING * `,
    values: [comment, 0, 0,
      (new Date(Date.now())).toTimeString(), (new Date(Date.now())).toDateString(), answerId, questionId, id]
  };
  return query;
};

const getAUserAnswer = (userId, id) => {
  const query = {
    text: 'SELECT * FROM answers where answers.userid = $1 and answers.id = $2',
    values: [userId, id]
  };
  return query;
};

const getAQuestion = (questionId) => {
  const query = {
    text: 'SELECT * FROM questions where questions.id = $1',
    values: [questionId]
  };
  return query;
};

const getAnAnswer = (answerId, questionId) => {
  const query = {
    text: 'SELECT * FROM answers where answers.id = $1 and answers.questionId = $2',
    values: [answerId, questionId]
  };
  return query;
};

const updateAnAnswer = (answer, answerId) => {
  const query = {
    text: 'UPDATE answers SET answer = $1 where answers.id =$2',
    values: [answer, answerId]
  };
  return query;
};
const deactivateUserPrefferedAnswer = (questionId) => {
  const query = {
    text: 'UPDATE answers SET approved = false where answers.approved =true and answers.questionid= $1',
    values: [questionId]
  };
  return query;
};
const prefferAnswer = (answerId) => {
  const query = {
    text: 'UPDATE answers SET approved= true where answers.id =$1',
    values: [answerId]
  };
  return query;
};
const getAllAnswersForAQuestion = (questionId) => {
  const query = {
    text: 'SELECT * FROM answers where answers.questionid = $1',
    values: [questionId]
  };
  return query;
};

const getAllCommentsForAnAnswer = (answerId) => {
  const query = {
    text: 'SELECT * from comments where comments.answerid =$1',
    values: [answerId]
  };
  return query;
};

const getAUserComment = (userId, id) => {
  const query = {
    text: 'SELECT * from comments where comments.id =$1 and comments.userid =$2',
    values: [id, userId]
  };
  return query;
};
const getAllQuestions = () => {
  const query = {
    text: 'SELECT * FROM questions'
  };
  return query;
};

const deleteAQuestion = (questionId) => {
  const query = {
    text: 'DELETE FROM questions where questions.id = $1',
    values: [questionId]
  };
  return query;
};

export {
  createTableForUsers, createTableForAnswers, createTableForQuestions, createTableForComments,
  checkEmail, createUser, createQuestion, getAUserQuestion, createAnswer, getAUserAnswer, getAQuestion,
  getAllQuestions, getAllAnswersForAQuestion, deleteAQuestion, getAnAnswer, updateAnAnswer, deactivateUserPrefferedAnswer,
  prefferAnswer, createComment, getAllCommentsForAnAnswer, getAUserComment
};
