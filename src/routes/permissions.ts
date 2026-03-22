import { Router } from "express";
import PermissionsController from "../controllers/PermissionsController";
import { createPermissionValidation, deletePermissionValidation} from '../validators/PermissionsValidator';
import { handleValidation } from '../middlewares/handleValidation';
const routes = Router();


routes.get("/permissions", PermissionsController.index);
routes.get("/permissions/:id", PermissionsController.show);
routes.post("/permissions", createPermissionValidation, handleValidation, PermissionsController.create);
routes.put("/permissions/:id", createPermissionValidation, handleValidation, PermissionsController.update);
routes.delete("/permissions/:id", deletePermissionValidation,handleValidation, PermissionsController.destroy);

export default routes;