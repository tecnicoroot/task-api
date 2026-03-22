import { Request, Response } from "express";
import RolesService from "../services/RolesService";

class RolesController {

  async index(req: Request, res: Response) {

    const roles = await RolesService.listRoles();

    return res.json(roles);
  }

  async show(req: Request, res: Response) {

    try {

      const role = await RolesService.getRole(Number(req.params.id));

      return res.json(role);

    } catch (error: any) {

      return res.status(404).json({
        error: error.message
      });

    }
  }

  async create(req: Request, res: Response) {

    try {

      const role = await RolesService.createRole(req.body);

      return res.status(201).json(role);

    } catch (error: any) {

      return res.status(400).json({
        error: error.message
      });

    }
  }

  async update(req: Request, res: Response) {

    try {

      const role = await RolesService.updateRole(
        Number(req.params.id),
        req.body
      );

      return res.json(role);

    } catch (error: any) {

      return res.status(400).json({
        error: error.message
      });

    }
  }

  async destroy(req: Request, res: Response) {

    try {

      await RolesService.deleteRole(Number(req.params.id));

      return res.json({
        message: "Perfil removido"
      });

    } catch (error: any) {

      return res.status(400).json({
        error: error.message
      });

    }
  }

  async showPermissionById(req: Request, res: Response){
    try {

      const permissions = await RolesService.showPermissionById(Number(req.params.id));

      return res.status(200).json(permissions);

    } catch (error: any) {

      return res.status(400).json({
        error: error.message
      });

    }
  }
  
  async addPermissionsToRole(req: Request, res: Response){
try {
      const { permissions } = req.body
      await RolesService.addPermissionsToRole(Number(req.params.id), permissions)
      return res.json({ success: true });

    } catch (error: any) {

      return res.status(400).json({
        error: error.message
      });

    }
  }

}

export default new RolesController();