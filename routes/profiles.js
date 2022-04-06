import express from "express";
import * as profileController from "../controllers/profiles.js";

const router = express.Router();

router.get("/", profileController.getMyProfile);

export default router;