import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface User {
      permissions: string[];
      type_access?: "superadmin";
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
    const user = req.user;
    console.log(user)
    if (user.type_access === "superadmin") {
      return next();
    }
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