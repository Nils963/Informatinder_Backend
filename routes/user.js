import express from "express";
import * as userController from "../controllers/user.js";

const router = express.Router();

router.get("/:id", userController.getOneUser);
router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;