import express from "express";
import isGuestMiddleware from "../middlewares/isGuest.middleware.js";

const router = express.Router();

router.get("/", isGuestMiddleware, (req, res) => {
  res.render("index", { isGuest: req.isGuest });
});

export default router;
