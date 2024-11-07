import express from "express";
import { paginationSchema } from "../../system/validators";
import NotificationController from "../controllers/NotificationController";
import protect from "../middlewares";
import {
  checkIfHasNotificationId,
  receivedPaginationFormat,
} from "../middlewares/notificationMiddleware";
import { validateQueryParams } from "../middlewares/validateRequestBody";

const notificationRouter = express.Router();

notificationRouter.get(
  "/",
  protect,
  validateQueryParams(paginationSchema),
  receivedPaginationFormat,
  NotificationController.getNotifications
);

notificationRouter.patch(
  "/:notificationId",
  protect,
  checkIfHasNotificationId,
  NotificationController.markOneNotification
);
export default notificationRouter;
