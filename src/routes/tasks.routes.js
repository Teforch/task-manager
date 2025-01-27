import express from "express";
import TaskStatusController from "../controllers/tasks.controller.js";
import isGuestMiddleware from "../middlewares/isGuest.middleware.js";
import loginedUserActions from "../middlewares/loginedUserActions.middleware.js";

const router = express.Router();

router.get(
  "/tasks",
  isGuestMiddleware,
  loginedUserActions,
  TaskStatusController.getTasksPage,
);
router.get(
  "/tasks/new",
  isGuestMiddleware,
  loginedUserActions,
  TaskStatusController.createTaskPage,
);
router.get(
  "/tasks/:id/edit",
  isGuestMiddleware,
  loginedUserActions,
  TaskStatusController.editTaskPage,
);
router.post("/tasks", loginedUserActions, TaskStatusController.createTask);
router.patch("/tasks/:id", loginedUserActions, TaskStatusController.updateTask);
router.delete(
  "/tasks/:id",
  loginedUserActions,
  TaskStatusController.deleteTask,
);
router.get(
  "/tasks/:id",
  isGuestMiddleware,
  loginedUserActions,
  TaskStatusController.getTaskPage,
);

export default router;
