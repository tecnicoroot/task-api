import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface User {
      permissions: string[];
    }

    interface Request {
      user?: User;
    }
  }
}

type Mode = "some" | "every";

export function checkPermissions(
  permissions: string[],
  mode: Mode = "some"
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userPermissions = req.user?.permissions || [];

    const hasAccess =
      mode === "every"
        ? permissions.every(p => userPermissions.includes(p))
        : permissions.some(p => userPermissions.includes(p));

    if (!hasAccess) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    next();
  };
}