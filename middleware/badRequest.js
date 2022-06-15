import express from "express";
const router = express.Router();

router.all("*", (req, res) => {
  throw new Error("BAD_REQUEST");
})

router.use(function (e, req, res, next) {
  if (e.message === "BAD_REQUEST") {
    return res.status(400).json({ error: { msg: e.message } });
  }
});

export default router;