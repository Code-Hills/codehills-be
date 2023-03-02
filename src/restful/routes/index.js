import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "./../../documentation";
import userRoutes from "./userRoutes";
import { router as authRouter } from "./authRouters";

const API_VERSION = process.env.API_VERSION || "v1";
const url = `/api/${API_VERSION}`;
const router = Router();

router.use(`/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDoc));
router.use(`${url}/users`, userRoutes);
router.use(`${url}/auth`, authRouter);

router.all(`${url}/`, (req, res) => {
  return res.status(200).json({ message: "Welcome to codehills backend!" });
});
router.use("*", (req, res) => {
  res.status(404).json({ status: 404, message: "This endpoint is not exist" });
});

export default router;
