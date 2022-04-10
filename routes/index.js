import express from "express";
import profileRouter from "./profiles.js"
import userRouter from "./user.js"
import swipeRouter from "./swipe.js"

const router = express.Router();

router.use('/profile', profileRouter);
router.use('/user', userRouter);
router.use('/swipe', swipeRouter);

export default router;