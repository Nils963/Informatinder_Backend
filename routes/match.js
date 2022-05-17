import express from "express";
import * as matchController from "../controllers/match.js";

const router = express.Router();

router.get("/", matchController.getMatches);
router.post("/like/:id", matchController.like);
router.post("/dislike/:id", matchController.dislike);

export default router;