import express from "express";
import UserController from "../controllers/user.contoller.js";

const router = express.Router();

router.get("/users", UserController.getUsers);
//router.get("/users", UserController.getUsers);
//router.get("/users", UserController.getUsers);
//router.get("/users", UserController.getUsers);
//router.get("/users", UserController.getUsers);
//router.get("/users", UserController.getUsers);

export default router;
