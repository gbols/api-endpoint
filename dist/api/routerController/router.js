"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _questionController = require("../controllers/questionController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get("/questions", _questionController.getAllQuestions);

router.get("/questions/:id", _questionController.getSingleQuestion);

router.post("/questions", _questionController.postQuestion);

exports.default = router;