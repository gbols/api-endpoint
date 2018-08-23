"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.acceptAnswer = exports.postAnswer = exports.deleteQuestion = exports.postQuestion = exports.getSingleQuestion = exports.getAllQuestions = undefined;

var _pg = require("pg");

var _joi = require("joi");

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var pool = new _pg.Pool({
  user: "xpqpkfkytwtawv",
  host: "ec2-54-163-246-5.compute-1.amazonaws.com",
  database: "d85f5m5n2i0fo1",
  password: "aea9af9e850047d541527c27730364949631366f72ca4630763718066a13f498",
  port: 5432,
  ssl: true
});

var getAllQuestions = function getAllQuestions(req, res) {
  pool.connect(function (err, client, done) {
    if (err) {
      return res.send("error fetching client from pool", err);
    }
    client.query("SELECT * FROM questions", function (err, result) {
      if (err) return res.send("error was found when running query " + err);
      res.send(result.rows);
    });
    done();
  });
};

var getSingleQuestion = function getSingleQuestion(req, res) {
  pool.connect(function (err, client, done) {
    if (err) return res.status(500).send("error was found when connecting to the server " + err.message);
    client.query("SELECT * FROM questions WHERE question_id = $1", [Number(req.params.id)], function (err, result) {
      if (err) return res.send("error was found when running query on the database " + err.message);
      if (result.rows.length === 0) return res.send("The given question does not exit in the database");

      client.query("SELECT * FROM answers WHERE question_id = $1", [Number(req.params.id)], function (error, ansResult) {
        if (error) return res.status(500).send("error was found when connecting to the server " + err);
        if (ansResult.rows.length === 0) return res.send("The given answer was not found in the database");
        var trio = [].concat(_toConsumableArray(result.rows));
        var answers = [].concat(_toConsumableArray(ansResult.rows));
        trio[0].answers = answers;
        res.send(trio);
      });
    });
    done();
  });
};

var validatePostQuestion = function validatePostQuestion(question) {
  var queSchema = {
    question: _joi2.default.string().required()
  };
  return _joi2.default.validate(question, queSchema);
};

var postQuestion = function postQuestion(req, res) {
  pool.connect(function (err, client, done) {
    if (err) return res.status(500).send("error was found connecting to the server " + err.message);

    var _validatePostQuestion = validatePostQuestion(),
        error = _validatePostQuestion.error,
        result = _validatePostQuestion.result;

    if (error) return res.status(404).send("" + error.message);
    client.query("INSERT INTO questions (question,user_id,username) VALUES($1, $2, $3)", [req.body.question, req.body.user_id, req.body.username]);
    done();
    res.send("question was succesfully added");
  });
};

var deleteQuestion = function deleteQuestion(req, res) {
  pool.connect(function (err, client, done) {
    if (err) return res.status(500).send("error was found connecting to the server " + err.message);
    client.query("SELECT question FROM questions WHERE question_id = $1 AND user_id = $2", [Number(req.params.id), req.body.user_id], function (err, result) {
      if (err) return res.status(500).send("error was found when connecting to the database " + err.message);
      if (result.rows.length === 0) {
        return res.send("You can't delete this question because its not in the dtabase!");
      }
      client.query("DELETE FROM questions WHERE question_id = $1", [Number(req.params.id)], function (error, delResult) {
        if (error) return res.send("error was found connecting to the database " + err.message);

        res.send("the question was deleted from the database " + delResult.rows);
      });
    });
    done();
  });
};

var validatePostAnswer = function validatePostAnswer(ans) {
  var ansSchema = {
    answer: _joi2.default.string().required()
  };
  return _joi2.default.validate(ans, ansSchema);
};

var postAnswer = function postAnswer(req, res) {
  pool.connect(function (err, client, done) {
    if (err) return res.status(500).send("error was found when connecting to the server " + err.message);

    var _validatePostAnswer = validatePostAnswer(req.body.response),
        errReport = _validatePostAnswer.error;

    if (errReport) return res.status(404).send(errReport.message);
    client.query("SELECT question FROM questions WHERE question_id = $1", [Number(req.params.id)], function (queErr, result) {
      if (queErr) return res.send("error was found connecting to the server " + err.message);
      if (result.rows.length === 0) return res.send("The question with the ID can't be found in the database!...");
      client.query("INSERT INTO answers (question_id,user_id,response,vote,username,accepted) VALUES($1, $2, $3, $4, $5, $6)", [req.body.question_id, req.body.user_id, req.body.response, req.body.vote, req.body.username, false], function (error, queResult) {
        if (error) return res.send("error was found connecting to the database " + err.message);
      });
    });
    done();
    res.send("Answer was posted succesfully");
  });
};

var acceptAnswer = function acceptAnswer(req, res) {
  pool.connect(function (err, client, done) {
    if (err) return res.status(500).send("error was found when running the request " + err.message);
    client.query("SELECT question FROM questions WHERE question_id = $questionId", [Number(req.params.qId)], function (error, result) {
      if (error) return res.status(500).send("Error connecting to the database! ... " + error);
      if (result.rows.length === 0) return res.status(404).send("The given question wasn't found in the database!");

      client.query("SELECT accepted FROM  answers WHERE answer_id = $answerId", [Number(req.params.aId)], function (ansErr, ansResult) {
        if (ansErr) return res.send("error was found when connecting to the database " + ansErr.message);
        if (ansResult.rows.length === 0) return res.status(404).send("The given answer wasn't found in the database!");

        client.query("UPDATE answers SET accepted = $1 WHERE answer_id = $2 and user_id = $3", [req.body.accepted, Number(req.params.aId), req.body.user_id], function (errUpdate, updateResult) {
          if (errUpdate) return res.send("error was found when connecting to the database " + errUpdate.message);
          if (updateResult.rows.length === 0) res.status(404).send("You do not have permission to accept the answer");else {
            res.status(200).send("you have succesfully accepted the answer");
          }
        });
      });
    });
    done();
  });
};

exports.getAllQuestions = getAllQuestions;
exports.getSingleQuestion = getSingleQuestion;
exports.postQuestion = postQuestion;
exports.deleteQuestion = deleteQuestion;
exports.postAnswer = postAnswer;
exports.acceptAnswer = acceptAnswer;