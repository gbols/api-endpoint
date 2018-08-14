"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require("./model");

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateId = function validateId(id) {
  return _model2.default.find(function (que) {
    return que.id === id;
  });
};

exports.default = validateId;