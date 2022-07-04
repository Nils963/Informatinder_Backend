import express from "express";
const router = express.Router();

router.all("*", (req, res) => {
  throw new Error("BAD_REQUEST");
})

router.use(function (e, req, res, next) {
  if (e != null) {
    switch (e.message) {
      case "request aborted":
        return;
      default:
        return res.status(400).json({ error: { msg: e.message } });
    }
  } else {
    next(req, res);
  }
});

export default router;