import express from "express";
import * as swipeController from "../controllers/swipe.js";

const router = express.Router();

router.get("/", swipeController.getProfiles);
router.post("/", swipeController.getProfilesByPage);

export default router;