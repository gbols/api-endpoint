"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _model = require("./model");

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { validateId } from "./helper";

var app = (0, _express2.default)();

app.use(_express2.default.json());

app.get("/", function (req, res) {
  res.send("use the following URI /api/v1/questions");
});

app.get("/api/v1/questions", function (req, res) {
  res.send(_model2.default);
});

app.get("/api/v1/questions/:id", function (req, res) {
  var ques = _model2.default.find(function (que) {
    return Number(que.id) === Number(req.params.id);
  });
  if (!ques) return res.status(404).send("The question with the given ID was not found");
  res.send(_model2.default[req.params.id - 1]);
});

app.post("/api/v1/questions", function (req, res) {
  var question = {
    id: _model2.default.length + 1,
    question: req.body.question,
    answers: []
  };
  _model2.default.push(question);
  res.send(question);
});

app.post("/api/v1/questions/:id/answers", function (req, res) {
  var ques = _model2.default.find(function (que) {
    return que.id === parseInt(req.params.id);
  });
  if (!ques) return res.status(404).send("The question with the given ID was not found");
  var ans = {
    vote: 0,
    response: req.body.answer
  };
  _model2.default[req.params.id - 1].answers.push(ans);
  res.send(ans);
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log("listening on port 3000 ......");

exports.default = app;