import { queryGeneric } from 'convex/server';
import { v } from 'convex/values';
import {
  getAll,
  firstByField,
  findByField,
  toNumber
} from './legacyShared.js';

const withQuestionAggregates = (questions, answers) => {
  const answersByQuestion = new Map();
  answers.forEach((answer) => {
    const key = answer.questionid;
    if (!answersByQuestion.has(key)) {
      answersByQuestion.set(key, []);
    }
    answersByQuestion.get(key).push(answer);
  });

  return questions.map((question) => {
    const foundAnswers = answersByQuestion.get(question.id) || [];
    const upvotes = foundAnswers.reduce((sum, answer) => sum + Number(answer.upvotes || 0), 0);
    const downvotes = foundAnswers.reduce((sum, answer) => sum + Number(answer.downvotes || 0), 0);
    return {
      ...question,
      answersnumber: foundAnswers.length,
      upvotes,
      downvotes
    };
  });
};

const isNotArchived = (q) => q.archived !== true;

const withAskerInfo = async (ctx, questions) => {
  if (!questions || questions.length === 0) return questions;
  const users = await getAll(ctx, 'users');
  const userById = new Map(users.map(u => [u.id, u]));
  return questions.map((q) => {
    const user = userById.get(q.userid);
    return {
      ...q,
      // photoUrl = question owner's profile photo (users.photo)
      photoUrl: user ? (user.photo || '') : '',
      // imageUrl = image uploaded/attached to the question (questions.imageurl)
      imageUrl: q.imageurl != null ? q.imageurl : '',
      askedBy: user ? `${user.firstname || ''} ${user.lastname || ''}`.trim() : ''
    };
  });
};

const withUserAggregates = (users, answers, questions) => {
  const answersByUser = new Map();
  answers.forEach((answer) => {
    const key = answer.userid;
    if (!answersByUser.has(key)) {
      answersByUser.set(key, []);
    }
    answersByUser.get(key).push(answer);
  });

  const questionsByUser = new Map();
  questions.forEach((question) => {
    const key = question.userid;
    if (!questionsByUser.has(key)) {
      questionsByUser.set(key, []);
    }
    questionsByUser.get(key).push(question);
  });

  return users.map((user) => {
    const ownedAnswers = answersByUser.get(user.id) || [];
    const ownedQuestions = questionsByUser.get(user.id) || [];
    return {
      ...user,
      answersnumber: ownedAnswers.length,
      upvotes: ownedAnswers.reduce((sum, answer) => sum + Number(answer.upvotes || 0), 0),
      downvotes: ownedAnswers.reduce((sum, answer) => sum + Number(answer.downvotes || 0), 0),
      questionsnumber: ownedQuestions.length
    };
  });
};

export const run = queryGeneric({
  args: { op: v.string(), values: v.optional(v.array(v.any())) },
  handler: async (ctx, args) => {
    const values = args.values || [];

    switch (args.op) {
      case 'checkEmail': {
        const user = await firstByField(ctx, 'users', 'by_email', 'email', values[0]);
        return user ? [user] : [];
      }

      case 'getAllCategories': {
        const categories = await getAll(ctx, 'categories');
        return categories.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      }

      case 'getAUserQuestion': {
        const userId = toNumber(values[0]);
        const questionId = toNumber(values[1]);
        const question = await firstByField(ctx, 'questions', 'by_legacy_id', 'id', questionId);
        if (!question || question.userid !== userId) return [];
        return [question];
      }

      case 'searchVotes': {
        const answerId = toNumber(values[0]);
        const userId = toNumber(values[1]);
        const vote = toNumber(values[2]);
        const votes = await findByField(ctx, 'votes', 'by_answerid', 'answerid', answerId);
        return votes.filter(item => item.userid === userId && item.vote === vote);
      }

      case 'getAUserAnswer': {
        const userId = toNumber(values[0]);
        const answerId = toNumber(values[1]);
        const answer = await firstByField(ctx, 'answers', 'by_legacy_id', 'id', answerId);
        if (!answer || answer.userid !== userId) return [];
        return [answer];
      }

      case 'getAQuestion': {
        const question = await firstByField(ctx, 'questions', 'by_legacy_id', 'id', toNumber(values[0]));
        const withAsker = question ? await withAskerInfo(ctx, [question]) : [];
        return withAsker;
      }

      case 'getAnAnswer': {
        const answer = await firstByField(ctx, 'answers', 'by_legacy_id', 'id', toNumber(values[0]));
        if (!answer || answer.questionid !== toNumber(values[1])) return [];
        return [answer];
      }

      case 'getAllAnswersForAQuestion': {
        const questionId = toNumber(values[0]);
        const answers = await findByField(ctx, 'answers', 'by_questionid', 'questionid', questionId);
        const comments = await getAll(ctx, 'comments');
        const commentsByAnswer = new Map();
        comments.forEach((comment) => {
          if (!commentsByAnswer.has(comment.answerid)) {
            commentsByAnswer.set(comment.answerid, 0);
          }
          commentsByAnswer.set(comment.answerid, commentsByAnswer.get(comment.answerid) + 1);
        });
        return answers.map(answer => ({ ...answer, commentsnumber: commentsByAnswer.get(answer.id) || 0 }));
      }

      case 'getAllCommentsForAnAnswer':
        return findByField(ctx, 'comments', 'by_answerid', 'answerid', toNumber(values[0]));

      case 'getAUserComment': {
        const comment = await firstByField(ctx, 'comments', 'by_legacy_id', 'id', toNumber(values[0]));
        if (!comment || comment.userid !== toNumber(values[1])) return [];
        return [comment];
      }

      case 'getAllQuestions': {
        const limit = Math.min(Math.max(1, Number(values[0]) || 20), 100);
        const cursor = values[1] != null && values[1] !== '' ? toNumber(values[1]) : null;
        const categoryName = values[2] != null && String(values[2]).trim() !== '' ? String(values[2]).trim().toLowerCase() : null;

        let questions = (await getAll(ctx, 'questions')).filter(isNotArchived);
        if (categoryName) {
          const category = await firstByField(ctx, 'categories', 'by_name', 'name', categoryName);
          if (!category) {
            return { questions: [], nextCursor: null };
          }
          questions = questions.filter(q => q.categoryid === category.id);
        }
        const answers = await getAll(ctx, 'answers');
        let aggregated = withQuestionAggregates(questions, answers)
          .sort((a, b) => b.id - a.id);
        if (cursor != null) {
          aggregated = aggregated.filter(q => q.id < cursor);
        }
        const take = limit + 1;
        const slice = aggregated.slice(0, take);
        const hasMore = slice.length > limit;
        const page = slice.slice(0, limit);
        const nextCursor = hasMore ? page[page.length - 1].id : null;
        const withAsker = await withAskerInfo(ctx, page);
        return { questions: withAsker, nextCursor };
      }

      case 'getAllUserQuestions': {
        const userId = toNumber(values[0]);
        const questions = (await findByField(ctx, 'questions', 'by_userid', 'userid', userId)).filter(isNotArchived);
        const answers = await getAll(ctx, 'answers');
        const aggregated = withQuestionAggregates(questions, answers);
        return withAskerInfo(ctx, aggregated);
      }

      case 'getUpvotesForAnswer': {
        const answerId = toNumber(values[0]);
        const votes = await findByField(ctx, 'votes', 'by_answerid', 'answerid', answerId);
        return votes.filter(vote => vote.vote === 1);
      }

      case 'getDownvotesForAnswer': {
        const answerId = toNumber(values[0]);
        const votes = await findByField(ctx, 'votes', 'by_answerid', 'answerid', answerId);
        return votes.filter(vote => vote.vote === 0);
      }

      case 'searchQuestion': {
        const search = String(values[0] || '').toLowerCase();
        const questions = (await getAll(ctx, 'questions')).filter(isNotArchived);
        const answers = await getAll(ctx, 'answers');
        const filtered = withQuestionAggregates(questions, answers).filter(item =>
          item.questiontitle.toLowerCase().includes(search)
          || item.questiondescription.toLowerCase().includes(search));
        return withAskerInfo(ctx, filtered);
      }

      case 'getQuestionsWithMostAnswers': {
        const questions = (await getAll(ctx, 'questions')).filter(isNotArchived);
        const answers = await getAll(ctx, 'answers');
        const aggregated = withQuestionAggregates(questions, answers)
          .sort((a, b) => Number(b.answersnumber) - Number(a.answersnumber))
          .map(item => ({
            ...item,
            answersnumber: Number(item.answersnumber)
          }));
        return withAskerInfo(ctx, aggregated);
      }

      case 'findUser': {
        const userId = toNumber(values[0]);
        const users = await getAll(ctx, 'users');
        const answers = await getAll(ctx, 'answers');
        const questions = await getAll(ctx, 'questions');
        return withUserAggregates(users, answers, questions).filter(user => user.id === userId);
      }

      case 'getUsers': {
        const users = await getAll(ctx, 'users');
        const answers = await getAll(ctx, 'answers');
        const questions = await getAll(ctx, 'questions');
        return withUserAggregates(users, answers, questions);
      }

      case 'getPinnedQuestionsForUser': {
        const userId = toNumber(values[0]);
        const pinnedList = await findByField(ctx, 'pinned', 'by_userid', 'userid', userId);
        const questionIds = new Set(pinnedList.map(p => p.questionid));
        if (questionIds.size === 0) return [];
        const allQuestions = await getAll(ctx, 'questions');
        const questions = allQuestions.filter(q => questionIds.has(q.id) && isNotArchived(q));
        const answers = await getAll(ctx, 'answers');
        const aggregated = withQuestionAggregates(questions, answers)
          .sort((a, b) => b.id - a.id);
        return withAskerInfo(ctx, aggregated);
      }

      default:
        return [];
    }
  }
});
