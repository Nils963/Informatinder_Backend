import express from "express";
import * as swipeController from "../controllers/swipe.js";

const router = express.Router();

router.get("/:page/:count", swipeController.getProfilesByPage);

export default router;