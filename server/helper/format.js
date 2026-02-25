const formatQuestionsWithAnswers = (data) => {
  const newQuestions = [];
  data.forEach((x) => {
    newQuestions.push({
      id: x.id,
      questionTitle: x.questiontitle,
      questionDescription: x.questiondescription,
      imageUrl: x.imageUrl || '',
      askedBy: x.askedBy || '',
      answers: [],
      time: x.time,
      date: x.date,
      userId: x.userid
    });
  });
  return newQuestions;
};

const formatQuestions = (data) => {
  const newQuestions = [];
  data.forEach((x) => {
    newQuestions.push({
      id: x.id,
      questionTitle: x.questiontitle,
      questionDescription: x.questiondescription,
      imageUrl: x.imageUrl || '',
      askedBy: x.askedBy || '',
      answers: [],
      numberOfAnswers: Number.parseInt(x.answersnumber, 10),
      time: x.time,
      date: x.date,
      userId: x.userid
    });
  });
  return newQuestions;
};

const safeInt = (v, def = 0) => {
  const n = Number.parseInt(v, 10);
  return Number.isNaN(n) ? def : n;
};

const formatAllQuestions = (data) => {
  if (!Array.isArray(data)) return [];
  const newQuestions = [];
  data.forEach((x) => {
    if (!x || typeof x !== 'object') return;
    const q = {
      id: x.id,
      questionTitle: x.questiontitle != null ? x.questiontitle : '',
      questionDescription: x.questiondescription != null ? x.questiondescription : '',
      imageUrl: x.imageUrl != null ? x.imageUrl : '',
      askedBy: x.askedBy != null ? x.askedBy : '',
      answers: [],
      numberOfAnswers: safeInt(x.answersnumber, 0),
      upvotes: safeInt(x.upvotes, 0),
      downvotes: safeInt(x.downvotes, 0),
      time: x.time != null ? x.time : '',
      date: x.date != null ? x.date : '',
      userId: x.userid
    };
    if (x.categoryid != null) q.categoryId = x.categoryid;
    newQuestions.push(q);
  });
  return newQuestions;
};

const formatMostAnsweredQuestions = (data) => {
  const newQuestions = [];
  data.forEach((x) => {
    newQuestions.push({
      id: x.id,
      questionTitle: x.questiontitle,
      questionDescription: x.questiondescription,
      imageUrl: x.imageUrl || '',
      askedBy: x.askedBy || '',
      answers: [],
      numberOfAnswers: Number.parseInt(Number(x.answersnumber), 10),
      time: x.time,
      date: x.date,
      userId: x.userid
    });
  });
  return newQuestions;
};

const formatAnswers = (data) => {
  const newAnswers = [];
  data.forEach((x) => {
    newAnswers.push({
      id: x.id,
      answer: x.answer,
      imageUrl: x.imageurl || '',
      upvotes: x.upvotes,
      downvotes: x.downvotes,
      approved: x.approved,
      numberOfComments: Number.parseInt(Number(x.commentsnumber), 10),
      comments: [],
      time: x.time,
      date: x.date,
      userId: x.userid,
      questionId: x.questionid
    });
  });
  return newAnswers;
};

const formatComments = (data) => {
  const newComments = [];
  data.forEach((x) => {
    newComments.push({
      id: x.id,
      comment: x.comment,
      upvotes: x.upvotes,
      downvotes: x.downvotes,
      time: x.time,
      date: x.date,
      userId: x.userid,
      answerId: x.answerid,
      questionId: x.questionid
    });
  });
  return newComments;
};

const formatUsers = (data) => {
  const newUsers = [];
  data.forEach((x) => {
    newUsers.push({
      id: x.id,
      fullName: ((() => `${x.firstname} ${x.lastname}`)()),
      jobRole: x.jobrole,
      company: x.company,
      photo: x.photo,
      numberOfAnswers: Number.parseInt(Number(x.answersnumber), 10),
      earnedUpvotes: Number.parseInt(Number(x.upvotes), 10),
      earnedDownvotes: Number.parseInt(Number(x.downvotes), 10),
      numberOfQuestions: Number.parseInt(Number(x.questionsnumber), 10),
      time: x.time,
      date: x.date
    });
  });
  return newUsers;
};

const formatUserUpdate = (data) => {
  const newUsers = [];
  data.forEach((x) => {
    newUsers.push({
      id: x.id,
      fullName: ((() => `${x.firstname} ${x.lastname}`)()),
      jobRole: x.jobrole,
      company: x.company,
      photo: x.photo,
      time: x.time,
      date: x.date
    });
  });
  return newUsers;
};

const formatCategories = (data) => {
  if (!Array.isArray(data)) return [];
  return data.map((x) => ({ id: x.id, name: x.name || '' }));
};

export {
  formatQuestions, formatAnswers, formatComments, formatMostAnsweredQuestions, formatQuestionsWithAnswers,
  formatAllQuestions, formatUsers, formatUserUpdate, formatCategories
};
