import express from "express";
import * as profileController from "../controllers/profiles.js";

const router = express.Router();

router.get("/:id", profileController.getProfile);
router.get("/", profileController.getAllProfiles);
router.patch("/:id", profileController.updateProfile);
router.delete("/:id", profileController.deleteProfile);

export default router;