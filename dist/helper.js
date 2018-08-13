"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validPost = exports.validateId = undefined;

var _model = require("./model");

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateId = function validateId(id) {
  return _model2.default.find(function (que) {
    return que.id === id;
  });
};

var validPost = function validPost(input) {
  if (typeof input === "string" && input.length > 10) return true;
};

exports.validateId = validateId;
exports.validPost = validPost;