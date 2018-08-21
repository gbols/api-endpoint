import Joi from "joi";
import db from "../../model";

const validatePostAQuestion = postQue => {
  const postShema = {
    question: Joi.string()
      .min(15)
      .required()
  };
  const result = Joi.validate(postQue, postShema);

  return result;
};

const validatePostAnAnswer = postAns => {
  const ansShema = {
    response: Joi.string()
      .min(15)
      .required()
  };
  const result = Joi.validate(postAns, ansShema);

  return result;
};

const getAllQuestions = (req, res) => {
  res.send(db);
};

const getSingleQuestion = (req, res) => {
  const questionId = parseInt(req.params.id);
  const result = findId(questionId);
  if (!result)
    return res
      .status(404)
      .send("The Qestion with the given Id was not found in the database");
  const selectedQuestion = db.filter(question => question.id === questionId);
  res.send(selectedQuestion);
};

const postQuestion = (req, res) => {
  const { error, value } = validatePostAQuestion(req.body);
  if (error) return res.status(404).send(error.message);
  const question = {
    id: db.length + 1,
    question: value.question,
    answers: []
  };
  db.unshift(question);
  res.json(question);
};

const postAnswer = (req, res) => {
  const questionId = parseInt(req.params.id);
  const result = findId(questionId);
  if (!result)
    return res
      .status(404)
      .send("The Qestion with the given Id was not found in the database");

  const { error, value } = validatePostAnAnswer(req.body);
  if (error) return res.status(404).send(error.message);
  const ans = {
    id : db.answers.length + 1,
    vote: 0,
    response: value.response,
    accepted: false
  };
  result.answers.unshift(ans);
  res.send(ans);
};

const deleteQuestion = (req, res) => {
  const questionId = parseInt(req.params.id);
  const result = findId(questionId);
  console.log(db.indexOf(result));
  db.splice(db.indexOf(result), 1);
  res.send(result);
};

function findId(questionId) {
  return db.find(question => question.id === questionId);
}

export { getAllQuestions, getSingleQuestion, postQuestion, postAnswer, deleteQuestion};
