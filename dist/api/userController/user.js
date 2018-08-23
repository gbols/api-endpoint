"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUp = exports.signOut = undefined;

var _pg = require("pg");

var _joi = require("joi");

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

exports.signOut = signOut;
exports.signUp = signUp;