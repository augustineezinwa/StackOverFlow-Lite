import UsersMigration from './UsersMigration.js';
import QuestionsMigration from './QuestionsMigration.js';
import AnswersMigration from './AnswersMigration.js';
import CommentsMigration from './CommentsMigration.js';
import VotesMigration from './VotesMigration.js';

const { migrateUsers } = UsersMigration;
const { migrateQuestions } = QuestionsMigration;
const { migrateAnswers } = AnswersMigration;
const { migrateComments } = CommentsMigration;
const { migrateVotes } = VotesMigration;

migrateUsers()
  .then(data => migrateQuestions()
    .then(data => migrateAnswers()
      .then(data => migrateComments()
        .then(data => migrateVotes())
        .catch(err => console.log(err)))
      .catch(err => console.log(err)))
    .catch(err => console.log(err)))
  .catch(err => console.log(err));
