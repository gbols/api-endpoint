"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _user = require("../controllers/user");

var _questionController = require("../controllers/questionController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post("/signup", _user.signUp);
router.post("/login", _user.logIn);
router.get("/sigout", _user.signOut);
router.get("/questions", _questionController.getAllQuestions);
router.get("/questions/:id", _questionController.getSingleQuestion);
router.post("/questions", _user.verifyToken, _questionController.postQuestion);
router.delete("/questions/:id", _user.verifyToken, _questionController.deleteQuestion);
router.post("/questions/:id/answers", _user.verifyToken, _questionController.postAnswer);
router.put("/questions/:qId/answers/:aId", _user.verifyToken, _questionController.acceptAnswer);

exports.default = router;