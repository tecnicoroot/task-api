import { Request, Response } from "express";
import SessionService from "../services/AuthService";

class AuthController {

  async create(req: Request, res: Response) {
    try {
      const result = await SessionService.login(req.body);
      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async password_reset(req: Request, res: Response) {
    try {
      const result = await SessionService.requestPasswordReset(
        req.body.email
      );
      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async reset_password(req: Request, res: Response) {
    try {
      const { token, newPassword } = req.body;

      const result = await SessionService.resetPassword(
        token,
        newPassword
      );

      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new AuthController();