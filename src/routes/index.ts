import { Router } from "express";
import usersRoutes from "./users";
import rolesRoute from "./roles";
import permissionRoute from "./permissions";
import authRoute from "./auth"
import handleAuth from "../middlewares/handleAuth";

const routes = Router();
routes.use(authRoute)
routes.use(handleAuth)
routes.use(permissionRoute);
routes.use(rolesRoute);
routes.use(usersRoutes);
export default routes;