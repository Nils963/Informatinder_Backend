import express from "express";
import profileRouter from "./profiles.js"
import userRouter from "./user.js"
import swipeRouter from "./swipe.js"
import matchRouter from "./match.js"
//import settingsRouter from "./settings.js"

const router = express.Router();

router.use('/profile', profileRouter);
router.use('/user', userRouter);
router.use('/swipe', swipeRouter);
router.use('/matches', matchRouter);
//router.use('/settings', settingsRouter);

export default router;