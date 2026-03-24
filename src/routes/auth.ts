import { Router } from "express";
import AuthController from "../controllers/AuthController";
const routes = Router();

routes.post("/auth", AuthController.create);
routes.post("/request-password-reset", AuthController.password_reset);
routes.post("/reset-password", AuthController.reset_password);


export default routes;