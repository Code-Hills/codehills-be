import express from "express";
import protect from "../middlewares";
import DashboardController from "../controllers/DashboardController";

const dashboardRouter = express.Router();

dashboardRouter.get("/", protect, DashboardController.getDashboard);

export default dashboardRouter;
