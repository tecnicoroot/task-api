import { Router } from "express";
import usersRoutes from "./users";
import rolesRoute from "./roles";
import permissionRoute from "./permissions";

const routes = Router();

routes.use(usersRoutes);
routes.use(rolesRoute);
routes.use(permissionRoute);

export default routes;