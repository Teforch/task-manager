import express from "express";
import TaskStatusController from "../controllers/taskStatus.controller.js";
import isGuestMiddleware from "../middlewares/isGuest.middleware.js";
import statusActionsMiddleware from "../middlewares/loginedUserActions.middleware.js";


const router = express.Router();

router.get('/statuses', isGuestMiddleware, statusActionsMiddleware, TaskStatusController.getStatusesPage);
router.get('/statuses/new', isGuestMiddleware, statusActionsMiddleware, TaskStatusController.createStatusPage);
router.get('/statuses/:id/edit', isGuestMiddleware, statusActionsMiddleware, TaskStatusController.editStatusPage);
router.post('/statuses', statusActionsMiddleware,TaskStatusController.createStatus);
router.patch('/statuses/:id', statusActionsMiddleware, TaskStatusController.updateStatus);
router.delete('/statuses/:id', statusActionsMiddleware, TaskStatusController.deleteStatus);

export default router;