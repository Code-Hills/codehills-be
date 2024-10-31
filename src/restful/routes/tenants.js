import { Router } from "express";
import protect from "../middlewares";
import TenantController from "../controllers/tenantsController";
import allowedRole from "../middlewares/allowedRoles";

const router = Router();

router.post("/",protect, TenantController.createTenant);
router.get("/", protect, allowedRole(["admin"]), TenantController.getTenants);
router.get("/:id", protect, TenantController.getTenantById);
router.put("/:id", protect, allowedRole(["admin"]), TenantController.updateTenant);
router.delete("/:id", protect, allowedRole(["admin"]), TenantController.deleteTenant);


export default router;
