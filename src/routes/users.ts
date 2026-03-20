import { Router } from "express";
import UsersController from "../controllers/UsersController";
import { createUserValidation, updateUserValidation, deleteUserValidation} from '../validators/UserValidator';
import { handleValidation } from '../middlewares/handleValidation';
const routes = Router();


routes.get("/users", UsersController.index);
routes.get("/users/:id", UsersController.show);
routes.post("/users", createUserValidation, handleValidation, UsersController.create);
routes.put("/users/:id", updateUserValidation, handleValidation, UsersController.update);
routes.delete("/users/:id", deleteUserValidation, handleValidation, UsersController.destroy);

export default routes;