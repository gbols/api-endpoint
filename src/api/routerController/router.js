import express from "express";
import {
  signUp,
  signOut,
  getAllQuestions,
  getSingleQuestion,
  postQuestion,
  deleteQuestion
} from "../controllers/questionController";

const router = express.Router();

router.post("/signup", signUp);
router.get("/sigout", signOut);
router.get("/questions", getAllQuestions);
router.get("/questions/:id", getSingleQuestion);
router.post("/questions", postQuestion);
router.delete("/questions/:id", deleteQuestion);

export default router;
