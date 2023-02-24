import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "../documentation/swagger";
import { addUser, getAllUsers, welcomeController } from "../controllers/index";

const router = Router();

router.get("/", welcomeController);
router.get("/users", getAllUsers);
router.post("/users/add", addUser);
router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

export default router;
