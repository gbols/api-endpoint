"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.signUp = exports.signOut = undefined;

var _pg = require("pg");

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pool = new _pg.Pool({
  user: "xpqpkfkytwtawv",
  host: "ec2-54-163-246-5.compute-1.amazonaws.com",
  database: "d85f5m5n2i0fo1",
  password: "aea9af9e850047d541527c27730364949631366f72ca4630763718066a13f498",
  port: 5432,
  ssl: true
});

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

var signUp = function signUp(req, res) {
  var user = void 0;
  if (!req.body.username.trim() || !req.body.password.trim() || !req.body.email.trim()) {
    return res.status(403).send("all inputs field are required");
  }
  var validEmail = validateEmail(req.body.email);
  if (!validEmail) res.send("Please Input a valid email address");

  pool.connect(function (err, client, done) {
    if (err) {
      return res.send("error fetching client from pool", err);
    }
    client.query("SELECT FROM users  WHERE username = $1", [req.body.username], function (userErr, userResult) {
      if (userErr) return res.sendStatus(500);
      // .send(`Error connecting to database ${userErr.message}`);
      if (userResult.rows.length !== 0) return res.send("User with credentials already exits in the database");
      client.query("INSERT INTO users(username, email, password) VALUES($1, $2, $3)", [req.body.username, req.body.email, req.body.password]);
      client.query("SELECT user FROM users WHERE username = $1 AND email = $2 AND password = $3", [req.body.username, req.body.email, req.body.password], function (userDetailsErr, userDetailsResult) {
        if (userDetailsErr) {
          res.send("Error fetching user from the database...! " + userDetailsErr.message);
        } else {
          user = userDetailsResult.rows[0];
          // res.json({message: `user succesfully created!.....`});
          _jsonwebtoken2.default.sign({ user: user }, "luapnahalobgujnugalo", function (err, token) {
            res.json({ token: token, message: "User succefully created!...." });
          });
        }
      });
    });
    done();
  });
};

var verifyToken = function verifyToken(req, res, next) {
  var bearerHeader = req.headers.authorization;
  if (!bearerHeader) return res.status(403).send("Forbidden! ....");
  var bearer = bearerHeader.split(" ");
  var bearerToken = bearer[1];
  req.token = bearerToken;
  next();
};

var signOut = function signOut(req, res) {
  res.send("you have successfully signed out");
};

exports.signOut = signOut;
exports.signUp = signUp;
exports.verifyToken = verifyToken;