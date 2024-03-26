import express from "express";
import NotificationController from "../controllers/NotificationController";

import protect from "../middlewares";
import { validatePagination } from "../../validations/notification.validation";
import { receivedPaginationFormat } from "../middlewares/notificationMiddleware";

const notificationRouter = express.Router();

notificationRouter.get(
  "/",
  protect,
  validatePagination,
  receivedPaginationFormat,
  NotificationController.getNotifications
);

export default notificationRouter;
