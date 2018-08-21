"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postQuestion = exports.getSingleQuestion = exports.getAllQuestions = undefined;

var _joi = require("joi");

var _joi2 = _interopRequireDefault(_joi);

var _model = require("../../model");

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validatePostAQuestion = function validatePostAQuestion(postQue) {
  var postShema = {
    question: _joi2.default.string().min(15).required()
  };
  var result = _joi2.default.validate(postQue, postShema);

  return result;
};

var getAllQuestions = function getAllQuestions(req, res) {
  res.send(_model2.default);
};

var getSingleQuestion = function getSingleQuestion(req, res) {
  var questionId = parseInt(req.params.id);
  var result = findId(questionId);
  if (!result) return res.status(404).send("The Qestion with the given Id was not found in the database");
  var selectedQuestion = _model2.default.filter(function (question) {
    return question.id === questionId;
  });
  res.send(selectedQuestion);
};

var postQuestion = function postQuestion(req, res) {
  var _validatePostAQuestio = validatePostAQuestion(req.body),
      error = _validatePostAQuestio.error,
      value = _validatePostAQuestio.value;

  if (error) return res.status(404).send(error.message);
  var question = {
    question: value.question,
    answers: []
  };
  _model2.default.push(question);
  res.json(question);
};

function findId(questionId) {
  return _model2.default.find(function (question) {
    return question.id === questionId;
  });
}

exports.getAllQuestions = getAllQuestions;
exports.getSingleQuestion = getSingleQuestion;
exports.postQuestion = postQuestion;