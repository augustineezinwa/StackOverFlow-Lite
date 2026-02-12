/* eslint-disable import/extensions, import/prefer-default-export, max-len, no-underscore-dangle, implicit-arrow-linebreak */
import { mutationGeneric } from 'convex/server';
import { v } from 'convex/values';
import {
  getAll,
  firstByField,
  findByField,
  removeDocs,
  setCounter,
  nextCounter,
  toNumber
} from './legacyShared.js';

const resetTable = async (ctx, table, counterKey) => {
  await removeDocs(ctx, await getAll(ctx, table));
  await setCounter(ctx, counterKey, 0);
  return [];
};

export const run = mutationGeneric({
  args: { op: v.string(), values: v.optional(v.array(v.any())) },
  handler: async (ctx, args) => {
    const values = args.values || [];

    switch (args.op) {
      case 'resetUsers':
        return resetTable(ctx, 'users', 'users');
      case 'resetQuestions':
        return resetTable(ctx, 'questions', 'questions');
      case 'resetAnswers':
        return resetTable(ctx, 'answers', 'answers');
      case 'resetComments':
        return resetTable(ctx, 'comments', 'comments');
      case 'resetVotesTable':
        return resetTable(ctx, 'votes', 'votes');

      case 'createUser': {
        const id = await nextCounter(ctx, 'users');
        const [firstName, lastName, email, password, jobRole, company, photo, time, date] = values;
        const doc = {
          id,
          firstname: firstName,
          lastname: lastName,
          email,
          password,
          jobrole: jobRole,
          company,
          photo,
          time,
          date
        };
        await ctx.db.insert('users', doc);
        return [doc];
      }

      case 'createQuestion': {
        const id = await nextCounter(ctx, 'questions');
        const [questionTitle, questionDescription, time, date, userId] = values;
        const doc = {
          id,
          questiontitle: questionTitle,
          questiondescription: questionDescription,
          time,
          date,
          userid: toNumber(userId)
        };
        await ctx.db.insert('questions', doc);
        return [doc];
      }

      case 'createAnswer': {
        const id = await nextCounter(ctx, 'answers');
        const [answer, upvotes, downvotes, approved, time, date, questionId, userId] = values;
        const doc = {
          id,
          answer,
          upvotes: Number(upvotes),
          downvotes: Number(downvotes),
          approved: Boolean(approved),
          time,
          date,
          questionid: toNumber(questionId),
          userid: toNumber(userId)
        };
        await ctx.db.insert('answers', doc);
        return [doc];
      }

      case 'createComment': {
        const id = await nextCounter(ctx, 'comments');
        const [comment, upvotes, downvotes, time, date, answerId, questionId, userId] = values;
        const doc = {
          id,
          comment,
          upvotes: Number(upvotes),
          downvotes: Number(downvotes),
          time,
          date,
          answerid: toNumber(answerId),
          questionid: toNumber(questionId),
          userid: toNumber(userId)
        };
        await ctx.db.insert('comments', doc);
        return [doc];
      }

      case 'createUpvote':
      case 'createDownvote': {
        const id = await nextCounter(ctx, 'votes');
        const [vote, time, date, answerId, questionId, userId] = values;
        const doc = {
          id,
          vote: Number(vote),
          time,
          date,
          answerid: toNumber(answerId),
          questionid: toNumber(questionId),
          userid: toNumber(userId)
        };
        await ctx.db.insert('votes', doc);
        return [doc];
      }

      case 'updateAnAnswer': {
        const answer = await firstByField(ctx, 'answers', 'by_legacy_id', 'id', toNumber(values[1]));
        if (!answer) return [];
        await ctx.db.patch(answer._id, { answer: values[0] });
        return [{ ...answer, answer: values[0] }];
      }

      case 'deactivateUserPrefferedAnswer': {
        const answers = await findByField(ctx, 'answers', 'by_questionid', 'questionid', toNumber(values[0]));
        await Promise.all(answers
          .filter(answer => answer.approved === true)
          .map(answer => ctx.db.patch(answer._id, { approved: false })));
        return [];
      }

      case 'prefferAnswer': {
        const answer = await firstByField(ctx, 'answers', 'by_legacy_id', 'id', toNumber(values[0]));
        if (!answer) return [];
        await ctx.db.patch(answer._id, { approved: true });
        return [{ ...answer, approved: true }];
      }

      case 'deleteAQuestion': {
        const questionId = toNumber(values[0]);
        const question = await firstByField(ctx, 'questions', 'by_legacy_id', 'id', questionId);
        if (!question) return [];

        const answers = await findByField(ctx, 'answers', 'by_questionid', 'questionid', questionId);
        const answerIds = new Set(answers.map(answer => answer.id));
        const comments = await getAll(ctx, 'comments');
        const votes = await getAll(ctx, 'votes');

        await removeDocs(ctx, comments.filter(comment =>
          comment.questionid === questionId || answerIds.has(comment.answerid)));
        await removeDocs(ctx, votes.filter(vote =>
          vote.questionid === questionId || answerIds.has(vote.answerid)));
        await removeDocs(ctx, answers);
        await ctx.db.delete(question._id);
        return [];
      }

      case 'resetVotes': {
        const answerId = toNumber(values[0]);
        const userId = toNumber(values[1]);
        const votes = await findByField(ctx, 'votes', 'by_answerid', 'answerid', answerId);
        await removeDocs(ctx, votes.filter(vote => vote.userid === userId));
        return [];
      }

      case 'persistVotes': {
        const upvotes = Number(values[0]);
        const downvotes = Number(values[1]);
        const answer = await firstByField(ctx, 'answers', 'by_legacy_id', 'id', toNumber(values[2]));
        if (!answer) return [];
        await ctx.db.patch(answer._id, { upvotes, downvotes });
        return [{ ...answer, upvotes, downvotes }];
      }

      case 'updateUser': {
        const user = await firstByField(ctx, 'users', 'by_legacy_id', 'id', toNumber(values[0]));
        if (!user) return [];
        const patch = { jobrole: values[1], company: values[2], photo: values[3] };
        await ctx.db.patch(user._id, patch);
        return [{ ...user, ...patch }];
      }

      default:
        return [];
    }
  }
});
