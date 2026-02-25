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
      case 'resetCategories':
        return resetTable(ctx, 'categories', 'categories');
      case 'resetPinned':
        return resetTable(ctx, 'pinned', 'pinned');

      case 'createCategory': {
        const id = await nextCounter(ctx, 'categories');
        const name = String(values[0] || '').trim().toLowerCase();
        if (!name) return [];
        const doc = { id, name };
        await ctx.db.insert('categories', doc);
        return [doc];
      }

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
        const hasImage = values.length >= 6;
        const questionTitle = values[0];
        const questionDescription = values[1];
        const imageUrl = hasImage ? values[2] : '';
        const time = hasImage ? values[3] : values[2];
        const date = hasImage ? values[4] : values[3];
        const userId = hasImage ? values[5] : values[4];
        const categoryIdx = hasImage ? 6 : 5;
        const categoryId = values.length > categoryIdx && values[categoryIdx] != null ? toNumber(values[categoryIdx]) : undefined;
        const doc = {
          id,
          questiontitle: questionTitle,
          questiondescription: questionDescription,
          imageurl: imageUrl || '',
          time,
          date,
          userid: toNumber(userId),
          archived: false,
          ...(categoryId !== undefined && { categoryid: categoryId })
        };
        await ctx.db.insert('questions', doc);
        return [doc];
      }

      case 'archiveQuestion': {
        const questionId = toNumber(values[0]);
        const userId = toNumber(values[1]);
        const archived = values[2] === true || values[2] === 'true';
        const question = await firstByField(ctx, 'questions', 'by_legacy_id', 'id', questionId);
        if (!question || question.userid !== userId) return [{ error: 'forbidden' }];
        await ctx.db.patch(question._id, { archived });
        return [{ id: questionId, archived }];
      }

      case 'pinQuestion': {
        const questionId = toNumber(values[0]);
        const userId = toNumber(values[1]);
        const existingPin = await ctx.db.query('pinned').withIndex('by_questionid_userid', q => q.eq('questionid', questionId).eq('userid', userId)).first();
        if (existingPin) return [existingPin];
        const id = await nextCounter(ctx, 'pinned');
        const doc = { id, questionid: questionId, userid: userId };
        await ctx.db.insert('pinned', doc);
        return [doc];
      }

      case 'createAnswer': {
        const id = await nextCounter(ctx, 'answers');
        const hasImage = values.length >= 9;
        const answer = values[0];
        const upvotes = values[1];
        const downvotes = values[2];
        const approved = values[3];
        const imageUrl = hasImage ? values[4] : '';
        const time = hasImage ? values[5] : values[4];
        const date = hasImage ? values[6] : values[5];
        const questionId = hasImage ? values[7] : values[6];
        const userId = hasImage ? values[8] : values[7];
        const doc = {
          id,
          answer,
          upvotes: Number(upvotes),
          downvotes: Number(downvotes),
          approved: Boolean(approved),
          imageurl: imageUrl || '',
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
