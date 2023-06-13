import { Router } from "express";
import UserControllers from "../controllers/userControllers";
import protect from "../middlewares";

const searchRouter = Router();

searchRouter.get("/users", protect, UserControllers.searchUsers);

export default searchRouter;
