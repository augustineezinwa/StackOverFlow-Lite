
const formatQuestions = (data) => {
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
      data: x.date,
      userId: x.userid,
      questionId: x.questionid
    });
  });
  return newAnswers;
};
export { formatQuestions, formatAnswers };
