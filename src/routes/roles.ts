import { Router } from "express";
import RolesController from "../controllers/RolesController";
import { createRoleValidation, deleteRoleValidation} from '../validators/RoleValidator';
import { handleValidation } from '../middlewares/handleValidation';
const routes = Router();


routes.get("/roles", RolesController.index);
routes.get("/roles/:id", RolesController.show);
routes.post("/roles", createRoleValidation, handleValidation, RolesController.create);
routes.put("/roles/:id", createRoleValidation, handleValidation, RolesController.update);
routes.delete("/roles/:id", deleteRoleValidation,handleValidation, RolesController.destroy);

routes.get('/roles/:id/permissions', RolesController.showPermissionById);
routes.put('/roles/:id/permissions', RolesController.addPermissionsToRole);
export default routes;