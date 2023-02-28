import { Router } from "express";
import AuthanticationControllers from "../controllers/authzzControllers";

const router = Router();

router.get("/microsoft", AuthanticationControllers.auth);
router.get("/microsoft/callback", AuthanticationControllers.loginCallback);

export default router;
