import express from "express";
import {signOut,signUp} from '../userController/user';
import {
  getAllQuestions,
  getSingleQuestion,
  postQuestion,
  deleteQuestion,
  postAnswer,
  acceptAnswer
} from "../controllers/questionController";

const router = express.Router();

router.post("/signup", signUp);
router.get("/sigout", signOut);
router.get("/questions", getAllQuestions);
router.get("/questions/:id", getSingleQuestion);
router.post("/questions", postQuestion);
router.delete("/questions/:id", deleteQuestion);
router.post("/questions/:id/answers", postAnswer);
router.put("/questions/:qId/answers/:aId", acceptAnswer);

export default router;
