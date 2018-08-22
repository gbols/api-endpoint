import express from "express";
import { signUp, signOut, getAllQuestions } from "../controllers/questionController";

const router = express.Router();

router.post("/signup", signUp);
router.get("/sigout", signOut);
router.get("/questions", getAllQuestions);

export default router;
