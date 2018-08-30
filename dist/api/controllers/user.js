"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.logIn = exports.signUp = exports.signOut = undefined;

var _pg = require("pg");

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connectionString = "postgres://pdyqtaaezaoqrn:efae001f55f6323aa1eb5a1ae1a7c8f13d96cf25f5a0d5e44a6c5ccd1902cb4b@ec2-54-235-94-36.compute-1.amazonaws.com:5432/dcima2je7js83h?ssl=true";

var pool = new _pg.Pool({
  connectionString: connectionString
});

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

var validName = function validName(username) {
  var pattern = /\W/i;
  return pattern.test(username);
};

var signUp = function signUp(req, res) {
  var saltRounds = 1;
  if (!req.body.username || !req.body.password || !req.body.email) {
    return res.status(403).send("missing fields are required");
  }
  if (!req.body.username.trim() || !req.body.password.trim() || !req.body.email.trim()) {
    return res.status(403).send("all inputs field are required");
  }

  var valid = validName(req.body.username);
  if (valid) return res.status(403).send("Username can't contain wild characters!...");

  var validEmail = validateEmail(req.body.email);
  if (!validEmail) res.send("Please Input a valid email address");

  pool.connect(function (err, client, done) {
    if (err) {
      return res.send("error fetching client from pool", err);
    }
    client.query("SELECT * FROM users  WHERE username = $1", [req.body.username], function (userErr, userResult) {
      if (userErr) return res.sendStatus(500);
      // .send(`Error connecting to database ${userErr.message}`);
      if (userResult.rows.length !== 0) return res.send("User with credentials already exits in the database");
      _bcrypt2.default.hash(req.body.password, saltRounds, function (err, hash) {
        if (err) return res.status(200).json({
          message: "There was an error hashing your password!..." + err.message
        });

        client.query("INSERT INTO users(username, email, password) VALUES($1, $2, $3)", [req.body.username, req.body.email, hash]);
      });

      client.query("SELECT * FROM users WHERE username = $1 AND email = $2 AND password = $3", [req.body.username, req.body.email, req.body.password], function (userDetailsErr, userDetailsResult) {
        if (userDetailsErr) {
          res.send("Error fetching user from the database...! " + userDetailsErr.message);
        } else {
          var user = userDetailsResult.rows[0];
          // res.json({message: `user succesfully created!.....`});
          _jsonwebtoken2.default.sign({ user: user }, "luapnahalobgujnugalo", function (err, token) {
            res.status(200).json({
              token: token,
              user: user,
              message: "User succefully created!...."
            });
          });
        }
      });
    });
    done();
  });
};

var logIn = function logIn(req, res) {
  if (!req.body.username || !req.body.password) {
    return res.status(403).send("missing fields are required");
  }
  if (!req.body.username.trim() || !req.body.password.trim()) {
    return res.status(403).send("all input fields are required");
  }
  pool.connect(function (err, client, done) {
    if (err) return res.status(500).send("error connecting to the sever " + err.message);
    client.query("SELECT * FROM users WHERE username = $1", [req.body.username], function (loginErr, loginResult) {
      if (loginErr) return res.status(500).send("There was an error connecting to the database " + loginErr.message);
      if (loginResult.rows.length === 0) {
        res.status(403).send("user does not have an account you need to sign up!....");
      } else {
        _bcrypt2.default.compare(req.body.password, loginResult.rows[0].password, function (bcryptErr, bcryptResult) {
          if (bcryptErr) return res.status(500).send("There was an error decrypting your password!...." + bcryptErr.message);
        });
        var user = loginResult.rows[0];
        _jsonwebtoken2.default.sign({ user: user }, "luapnahalobgujnugalo", function (err, token) {
          if (err) return res.status(500).send("Error generating your token");
          res.status(200).json({ token: token, user: user, message: "User succefully logged In!...." });
        });
      }
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
exports.logIn = logIn;
exports.verifyToken = verifyToken;