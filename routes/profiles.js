import express from "express";
import * as profileController from "../controllers/profiles.js";
import multer from 'multer';
import { storage } from "../middleware/storage.js";
const upload = multer({ storage });

const router = express.Router();

router.get("/:id", profileController.getProfile);
router.get("/", profileController.getAllProfiles);
router.post("/image", upload.single('image'), profileController.uploadImage)
router.patch("/:id", profileController.updateProfile);
router.delete("/:id", profileController.deleteProfile);

export default router;