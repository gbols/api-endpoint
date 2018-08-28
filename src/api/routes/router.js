import express from "express";
import { signOut, signUp, logIn, verifyToken } from "../controllers/user";
import {
  getAllQuestions,
  getSingleQuestion,
  postQuestion,
  deleteQuestion,
  postAnswer,
  acceptAnswer,
  notAvailable
} from "../controllers/questionController";

const router = express.Router();


router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/sigout", signOut);
router.get("/questions", getAllQuestions);
router.get("/questions/:id", getSingleQuestion);
router.post("/questions", verifyToken, postQuestion);
router.delete("/questions/:id", verifyToken, deleteQuestion);
router.post("/questions/:id/answers", verifyToken, postAnswer);
router.put("/questions/:qId/answers/:aId", verifyToken, acceptAnswer);

router.get(notAvailable);


export default router;
