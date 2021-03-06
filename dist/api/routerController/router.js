"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _questionController = require("../controllers/questionController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post("/signup", _questionController.signUp);
router.get("/sigout", _questionController.signOut);
router.get("/questions", _questionController.getAllQuestions);
router.get("/questions/:id", _questionController.getSingleQuestion);
router.post("/questions", _questionController.postQuestion);
router.delete("/questions/:id", _questionController.deleteQuestion);
router.post("/questions/:id/answers", _questionController.postAnswer);
router.put("/questions/:qId/answers/:aId", _questionController.acceptAnswer);
exports.default = router;