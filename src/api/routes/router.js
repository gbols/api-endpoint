import express from "express";
import {signOut,signUp, verifyToken} from '../controllers/user';
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
router.post("/questions", verifyToken,postQuestion);
router.delete("/questions/:id", verifyToken, deleteQuestion);
router.post("/questions/:id/answers",verifyToken, postAnswer);
router.put("/questions/:qId/answers/:aId",verifyToken, acceptAnswer);

export default router;
