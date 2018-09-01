const formatQuestionsWithAnswers = (data) => {
  const newQuestions = [];
  data.forEach((x) => {
    newQuestions.push({
      id: x.id,
      questionTitle: x.questiontitle,
      questionDescription: x.questiondescription,
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
      answers: [],
      numberOfAnswers: Number.parseInt(x.answersnumber, 10),
      time: x.time,
      date: x.date,
      userId: x.userid
    });
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
      answers: [],
      numberOfAnswers: Number.parseInt(x.answersnumber, 10),
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
      upvotes: x.upvotes,
      downvotes: x.downvotes,
      approved: x.approved,
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

export {
  formatQuestions, formatAnswers, formatComments, formatMostAnsweredQuestions, formatQuestionsWithAnswers
};
