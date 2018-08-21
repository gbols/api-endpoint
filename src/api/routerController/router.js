import express from "express";
import {
  getAllQuestions,
  getSingleQuestion,
  postQuestion,
  postAnswer
} from "../controllers/questionController";

const router = express.Router();

router.get("/questions", getAllQuestions);

router.get("/questions/:id", getSingleQuestion);

router.post("/questions", postQuestion);

router.post("/questions/:id/answers", postAnswer);

export default router;
