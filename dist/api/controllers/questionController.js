"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.acceptAnswer = exports.postAnswer = exports.deleteQuestion = exports.postQuestion = exports.getSingleQuestion = exports.getAllQuestions = undefined;

var _pg = require("pg");

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// dotenv.config();

// const pool = new Pool({
//   user: process.env.USER,
//   host: process.env.HOST,
//   database: process.env.DATABASE,
//   password: process.env.PASSWORD,
//   port: process.env.PORT,
//   ssl: process.env.SSL
// });

var connectionstring = "postgres://pdyqtaaezaoqrn:efae001f55f6323aa1eb5a1ae1a7c8f13d96cf25f5a0d5e44a6c5ccd1902cb4b@ec2-54-235-94-36.compute-1.amazonaws.com:5432/dcima2je7js83h?ssl=true";

var pool = new _pg.Pool({
  connectionString: connectionstring
});

var getAllQuestions = function getAllQuestions(req, res) {
  pool.connect(function (err, client, done) {
    if (err) {
      return res.status(500).send("error fetching client from pool", err.message);
    }
    client.query("SELECT * FROM questions", function (err, result) {
      if (err) {
        if (statusCode >= 100 && statusCode < 600) res.status(statusCode);else {
          res.status(500);
        }
      } else {
        res.send({ message: result.rows });
      }
    });
    done();
  });
};

var getSingleQuestion = function getSingleQuestion(req, res) {
  pool.connect(function (err, client, done) {
    if (err) return res.status(500).send("error was found when connecting to the server " + err.message);
    client.query("SELECT * FROM questions WHERE questionid = $1", [Number(req.params.id)], function (err, result) {
      if (err) return res.send("error was found when running query on the database " + err.message);
      if (result.rows.length === 0) return res.send("The given question does not exit in the database");

      client.query("SELECT * FROM answers WHERE questionid = $1", [Number(req.params.id)], function (error, ansResult) {
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

var postQuestion = function postQuestion(req, res) {
  _jsonwebtoken2.default.verify(req.token, "luapnahalobgujnugalo", function (tokenErr, authData) {
    if (tokenErr) return res.status(403).send("error verifying your token " + tokenErr.message);
    pool.connect(function (err, client, done) {
      if (err) return res.status(500).send("error was found connecting to the server " + err.message);
      client.query("INSERT INTO questions (question,userid,username) VALUES($1, $2, $3)", [req.body.question, authData.userid, authData.username], function (postErr, postResult) {
        if (postErr) {
          res.status(403).send("error was found runnning the query....!");
        } else {
          res.json({ message: "Question was successfully posted! ....." });
        }
      });
      done();
    });
  });
};

var deleteQuestion = function deleteQuestion(req, res) {
  _jsonwebtoken2.default.verify(req.token, "luapnahalobgujnugalo", function (tokenErr, authData) {
    if (tokenErr) return res.status(403).send("error verifying your token " + tokenErr.message);
    pool.connect(function (err, client, done) {
      if (err) return res.status(500).send("error was found connecting to the server " + err.message);
      client.query("DELETE FROM questions WHERE questionid = $1 AND userid = $2", [Number(req.params.id), authData.userid], function (error, delResult) {
        if (error) return res.send("error was found connecting to the database " + error.message);
        if (delResult.rows.length === 0) {
          return res.send("You do not have permission to delete the question or the question is not in the database");
        }
        res.send("the question was deleted from the database " + delResult.rows);
      });
      done();
    });
  });
};

var postAnswer = function postAnswer(req, res) {
  _jsonwebtoken2.default.verify(req.token, "luapnahalobgujnugalo", function (tokenErr, authData) {
    if (tokenErr) return res.status(403).send("error verifying your token " + tokenErr.message);
    pool.connect(function (err, client, done) {
      if (err) return res.status(500).send("error was found when connecting to the server " + err.message);

      client.query("SELECT question FROM questions WHERE questionid = $1", [Number(req.params.id)], function (queErr, result) {
        if (queErr) return res.send("error was found connecting to the server " + err.message);
        if (result.rows.length === 0) return res.send("The question with the ID can't be found in the database!...");
        client.query("INSERT INTO answers (questionid,userid,response,vote,username,accepted) VALUES($1, $2, $3, $4, $5, $6)", [req.params.question_id, authData.userid, req.body.response, 0, authData.username, false], function (error, queResult) {
          if (error) return res.send("error was found connecting to the database " + err.message);
        });
      });
      done();
      res.send("Answer was posted succesfully");
    });
  });
};

var acceptAnswer = function acceptAnswer(req, res) {
  _jsonwebtoken2.default.verify(req.token, "luapnahalobgujnugalo", function (tokenErr, authData) {
    if (tokenErr) return res.send("error verifying your token " + tokenErr.message);
    pool.connect(function (err, client, done) {
      if (err) return res.send("error was found when running the request " + err.message);
      client.query("SELECT question FROM questions WHERE questionid = $1", [Number(req.params.qId)], function (error, result) {
        if (error) return res.send("Error connecting to the database! ... " + error);
        if (result.rows.length === 0) return res.send("The given question wasn't found in the database!");

        client.query("SELECT * FROM  answers WHERE answerid = $1", [Number(req.params.aId)], function (ansErr, ansResult) {
          if (ansErr) return res.send("error was found when connecting to the database " + ansErr.message);
          if (ansResult.rows.length === 0) return res.send("The given answer wasn't found in the database!");

          client.query("UPDATE answers SET accepted = $1 WHERE userid = $2", [req.body.accepted, req.body.user_id], function (errUpdate, updateResult) {
            if (errUpdate) return res.send("error was found when connecting to the database " + errUpdate.message);
            if (updateResult.rows.length === 0) res.send("You do not have permission to accept the answer");else {
              res.send("you have succesfully accepted the answer");
            }
          });
        });
      });
      done();
    });
  });
};

exports.getAllQuestions = getAllQuestions;
exports.getSingleQuestion = getSingleQuestion;
exports.postQuestion = postQuestion;
exports.deleteQuestion = deleteQuestion;
exports.postAnswer = postAnswer;
exports.acceptAnswer = acceptAnswer;