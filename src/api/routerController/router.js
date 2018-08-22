import express from "express";
import {
  signUp,
  signOut,
  getAllQuestions,
  getSingleQuestion
} from "../controllers/questionController";

const router = express.Router();

router.post("/signup", signUp);
router.get("/sigout", signOut);
router.get("/questions", getAllQuestions);
router.get("/questions/:id", getSingleQuestion);

export default router;
