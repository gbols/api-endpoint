"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require("../../model");

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAllQuestions = function getAllQuestions(req, res) {
  res.send(_model2.default);
};

exports.default = getAllQuestions;