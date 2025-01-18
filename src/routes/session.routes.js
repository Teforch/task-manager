import express from "express";
import SessionController from "../controllers/session.controller.js";
import isGuestMiddleware from "../middlewares/isGuest.middleware.js";
import passportMiddleware from "../middlewares/passportAuth.middleware.js";

const router = express.Router();

router.get("/session/new", isGuestMiddleware, SessionController.loginPage);
router.post("/session", passportMiddleware, SessionController.createSession);
router.delete("/session", SessionController.deleteSession);

export default router;

