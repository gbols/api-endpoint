"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postQuestion = exports.getSingleQuestion = exports.getAllQuestions = exports.signOut = exports.signUp = undefined;

var _pg = require("pg");

var _model = require("../../model");

var _model2 = _interopRequireDefault(_model);

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

var signUp = function signUp(req, res) {
  pool.connect(function (err, client, done) {
    if (err) {
      return res.send("error fetching client from pool", err);
    }
    client.query("INSERT INTO users(username, email, password) VALUES($1, $2, $3)", [req.body.username, req.body.email, req.body.password]);
    done();
    res.send("User created successfully");
  });
};

var signOut = function signOut(req, res) {
  res.send("you have successfully signed out");
};

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
    if (err) return res.send("error was found when running the request " + err);
    client.query("SELECT * FROM questions WHERE question_id = $1", [Number(req.params.id)], function (err, result) {
      if (err) return res.send("error was found when running query " + err);
      if (result.rows.length === 0) return res.send("error was found when running query " + err);

      client.query("SELECT * FROM answers WHERE question_id = $1", [Number(req.params.id)], function (error, ansResult) {
        if (error) return res.send("error was found when running query " + err);
        if (ansResult.rows.length === 0) return res.send("error was found when running query " + err);
        res.send(["Question:"].concat(_toConsumableArray(result.rows), ["Answers:"], _toConsumableArray(ansResult.rows)));
      });
    });
    done();
  });
};

var postQuestion = function postQuestion(req, res) {
  pool.connect(function (err, client, done) {
    if (err) return res.send("error was found when running the request " + err);
    client.query('INSERT INTO questions (question,user_id,username) VALUES($1, $2, $3)', [req.body.question, req.body.user_id, req.body.username]);
    done();
    res.send('question was succesfully added');
  });
};

exports.signUp = signUp;
exports.signOut = signOut;
exports.getAllQuestions = getAllQuestions;
exports.getSingleQuestion = getSingleQuestion;
exports.postQuestion = postQuestion;