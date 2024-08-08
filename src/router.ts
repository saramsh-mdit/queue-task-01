import { Router } from "express";
import AuthController from "./controllers/auth";
import EmailController from "./controllers/email";

const router = Router();

router.use("/api/auth", AuthController);
router.use("/api/email", EmailController);

export default router;
