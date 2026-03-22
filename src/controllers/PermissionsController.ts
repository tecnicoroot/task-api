import { Request, Response } from "express";
import PermissionsService from "../services/PermissionsService";

class PermissionsController {

  async index(req: Request, res: Response) {

    const roles = await PermissionsService.listPermissions();

    return res.json(roles);
  }

  async show(req: Request, res: Response) {

    try {

      const role = await PermissionsService.getPermission(Number(req.params.id));

      return res.json(role);

    } catch (error: any) {

      return res.status(404).json({
        error: error.message
      });

    }
  }

  async create(req: Request, res: Response) {

    try {

      const role = await PermissionsService.createPermission(req.body);

      return res.status(201).json(role);

    } catch (error: any) {

      return res.status(400).json({
        error: error.message
      });

    }
  }

  async update(req: Request, res: Response) {

    try {

      const role = await PermissionsService.updatePermission(
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

      await PermissionsService.deletePermission(Number(req.params.id));

      return res.json({
        message: "Permissão removido"
      });

    } catch (error: any) {

      return res.status(400).json({
        error: error.message
      });

    }
  }

  

}

export default new PermissionsController();