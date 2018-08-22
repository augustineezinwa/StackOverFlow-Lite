import UsersMigration from './UsersMigration';
import QuestionsMigration from './QuestionsMigration';
import AnswersMigration from './AnswersMigration';
import CommentsMigration from './CommentsMigration';

const { migrateUsers } = UsersMigration;
const { migrateQuestions } = QuestionsMigration;
const { migrateAnswers } = AnswersMigration;
const { migrateComments } = CommentsMigration;

migrateUsers()
  .then(data => migrateQuestions()
    .then(data => migrateAnswers()
      .then(data => migrateComments())
      .catch(err => console.log(err)))
    .catch(err => console.log(err)))
  .catch(err => console.log(err));
