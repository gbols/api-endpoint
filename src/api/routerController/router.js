import express from "express";
import {
  getAllQuestions,
  getSingleQuestion
} from "../controllers/questionController";

const router = express.Router();

router.get("/questions", getAllQuestions);

router.get("/questions/:id", getSingleQuestion);

export default router;
