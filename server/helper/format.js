
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

export { formatQuestions };
