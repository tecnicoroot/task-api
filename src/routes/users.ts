import { Router } from "express";
import UsersController from "../controllers/UsersController";
import { createUserValidation, updateUserValidation, deleteUserValidation} from '../validators/UserValidator';
import { handleValidation } from '../middlewares/handleValidation';
import { checkPermissions } from '../middlewares/handlePermissions';
const routes = Router();


routes.get("/users", UsersController.index);
routes.get("/users/:id", UsersController.show);
routes.post("/users", checkPermissions(["superadmin", "create_user"] ), createUserValidation, handleValidation, UsersController.create);
routes.put("/users/:id", updateUserValidation, handleValidation, UsersController.update);
routes.delete("/users/:id", deleteUserValidation, handleValidation, UsersController.destroy);

routes.get('/users/:id/roles', UsersController.showPermissionById);
routes.put('/users/:id/roles', UsersController.addPermissionsToRole);
export default routes;