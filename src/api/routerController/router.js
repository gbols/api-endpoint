import express from "express";
import {signUp,signOut} from "../controllers/questionController";

const router = express.Router();

router.post("/signup", signUp);
router.get("/sigout", signOut);

export default router;
