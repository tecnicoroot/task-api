import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { promisify } from "util";

import authConfig from "../config/auth";

interface DecodedToken extends JwtPayload {
  id: string;
  permissions: string[]; // adiciona a propriedade obrigatória

}

interface AuthRequest extends Request {
  user?: {
    id: string;
    permissions: string[]; 
  };
}

export default async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token was not provided." });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = (await promisify(jwt.verify)(
      token,
      authConfig.secret
    )) as DecodedToken;

    req.user = {
      id: decoded.id,
      permissions: [],
    };

    return next();
  } catch (error) {
    return res.status(401).json({ error: "Token invalid." });
  }
};