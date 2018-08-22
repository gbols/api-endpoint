"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSingleQuestion = exports.getAllQuestions = undefined;

var _model = require("../../model");

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAllQuestions = function getAllQuestions(req, res) {
  res.json(_model2.default);
};

var getSingleQuestion = function getSingleQuestion(req, res) {
  var questionId = parseInt(req.params.id);
  var result = findId(questionId);
  if (!result) return res.status(404).send("The Qestion with the given Id was not found in the database");
  var selectedQuestion = _model2.default.filter(function (question) {
    return question.id === questionId;
  });
  res.json(selectedQuestion);
};

function findId(questionId) {
  return _model2.default.find(function (question) {
    return question.id === questionId;
  });
}

exports.getAllQuestions = getAllQuestions;
exports.getSingleQuestion = getSingleQuestion;