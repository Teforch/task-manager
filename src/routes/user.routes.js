import express from "express";
import UserController from "../controllers/user.contoller.js";
import isGuestMiddleware from "../middlewares/isGuest.middleware.js";
import userActionsMiddleware from "../middlewares/userActions.middleware.js";
import validationMiddleware from "../middlewares/validationUser.middleware.js";

const router = express.Router();

router.get("/users", isGuestMiddleware, UserController.getUsers);
router.post("/users", validationMiddleware, UserController.createUser);
router.delete("/users/:id", userActionsMiddleware, UserController.deleteUser);
router.get('/users/:id/edit', userActionsMiddleware, isGuestMiddleware, UserController.editPage);
router.patch('/users/:id', 
    userActionsMiddleware,
    (req, res, next) => validationMiddleware(req, res, next, `/users/${req.params.id}/edit`),
    UserController.updateUser);

router.get('/users/new', isGuestMiddleware, UserController.registerPage);


export default router;
