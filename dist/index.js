"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _docs = require("./api/controllers/docs");

var _docs2 = _interopRequireDefault(_docs);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _router = require("./api/routes/router");

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use(_express2.default.static(_path2.default.join(__dirname, "public")));

app.use(_express2.default.json());
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.get("/", function (req, res) {
  return res.send({ message: "Welcome to StackOverflow Lite! ..." });
});

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.get("/api-docs", function (req, res) {
  res.sendFile(_path2.default.join(__dirname, "/public/docs.html"));
});

app.get('/getjson', _docs2.default);

app.use("/api/v1", _router2.default);
app.use("/api", _router2.default);
app.use("/api/v1/auth", _router2.default);

var port = process.env.PORT || 3000;
app.listen(port);
console.log("listening on port 3000 ......");

exports.default = app;