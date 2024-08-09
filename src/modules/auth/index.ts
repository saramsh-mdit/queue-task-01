import { Router } from "express";
import { ZodError } from "zod";
import { Authorization } from "../../middleware/authorization";
import { ZodErrorToString } from "../../utils/zod";
import authService from "./auth.service";
import { LoginUserSchema, RegisterUserSchema } from "./schema";

const AuthController = Router();

AuthController.post("/register", async (req, res) => {
  try {
    const data = req.body;
    const parsedData = await RegisterUserSchema.parseAsync(data);
    const response = await authService.register(parsedData);
    res.send(response);
  } catch (err: any) {
    let message = err;
    if (err instanceof ZodError) message = ZodErrorToString(err);
    res.status(400).send(message);
  }
});

AuthController.post("/login", async (req, res) => {
  try {
    const data = req.body;
    const parsedData = await LoginUserSchema.parseAsync(data);
    const response = await authService.login(parsedData);
    res.send(response);
  } catch (err: any) {
    if (err instanceof ZodError) {
      const errorResponse = ZodErrorToString(err);
      res.status(400);
      res.send(errorResponse);
    }
    res.status(500);
    res.send(err);
  }
});

AuthController.get("/me", Authorization, async (req, res) => {
  try {
    const response = res.locals.user;
    res.send(response);
  } catch (err: any) {
    let errorResponse = err;
    res.status(500);
    res.send(errorResponse);
  }
});

AuthController.get("/verify/:id", async (req, res) => {
  try {
    const uid = req.params.id;
    const response = await authService.verify(uid);
    res.send(response);
  } catch (err: any) {
    let errorResponse = err;
    res.status(500);
    res.send(errorResponse);
  }
});

export default AuthController;
