import express from "express";
import TaskStatusController from "../controllers/taskStatus.controller.js";
import isGuestMiddleware from "../middlewares/isGuest.middleware.js";
import statusActionsMiddleware from "../middlewares/statusActions.middleware.js";


const router = express.Router();

router.get('/statuses', isGuestMiddleware, statusActionsMiddleware, TaskStatusController.getStatuses);
router.get('/statuses/new', isGuestMiddleware, statusActionsMiddleware, TaskStatusController.createStatusPage);
router.get('/statuses/:id/edit', isGuestMiddleware, statusActionsMiddleware, TaskStatusController.editStatusPage);
router.post('/statuses', statusActionsMiddleware,TaskStatusController.createStatus);
router.patch('/statuses/:id', statusActionsMiddleware, TaskStatusController.updateStatus);
router.delete('/statuses/:id', statusActionsMiddleware, TaskStatusController.deleteStatus);

export default router;