import { Request, Response } from "express";
import UsersService from "../services/UsersService";

class UsersController {

  async index(req: Request, res: Response) {

    const users = await UsersService.listUsers();

    return res.json(users);
  }

  async show(req: Request, res: Response) {

    try {

      const user = await UsersService.getUser(Number(req.params.id));

      return res.json(user);

    } catch (error: any) {

      return res.status(404).json({
        error: error.message
      });

    }
  }

  async create(req: Request, res: Response) {

    try {

      const user = await UsersService.createUser(req.body);

      return res.status(201).json(user);

    } catch (error: any) {

      return res.status(400).json({
        error: error.message
      });

    }
  }

  async update(req: Request, res: Response) {

    try {

      const user = await UsersService.updateUser(
        Number(req.params.id),
        req.body
      );

      return res.json(user);

    } catch (error: any) {

      return res.status(400).json({
        error: error.message
      });

    }
  }

  async destroy(req: Request, res: Response) {

    try {

      await UsersService.deleteUser(Number(req.params.id));

      return res.json({
        message: "Usuário removido"
      });

    } catch (error: any) {

      return res.status(400).json({
        error: error.message
      });

    }
  }

  

}

export default new UsersController();