import { Router } from "express";
import { Authorization } from "./middleware/authorization";
import AuthController from "./modules/auth";
import EmailController from "./modules/email";

const router = Router();

router.use("/auth", AuthController);
// Protected Routes
router.use("/email", Authorization, EmailController);

export default router;
