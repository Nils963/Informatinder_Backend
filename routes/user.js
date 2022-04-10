import express from "express";
import * as userController from "../controllers/user.js";

const router = express.Router();

router.get("/:id", userController.getOneUser);
router.get("/", userController.getAllUsers);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

router.post("/auth", userController.auth);

export default router;