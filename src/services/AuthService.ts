// src/services/SessionService.ts
import jwt from "jsonwebtoken";
import { promisify } from "util";

import UsersRepository from "../repositories/UsersRepository";
import authConfig from "../config/auth";
import urlConfig from "../config/urlconfig";



class SessionService {
  

  generateResetToken(user: any): string {
    return jwt.sign(
      { id: user.id, email: user.email },
      authConfig.secret,
      { expiresIn: "1h" }
    );
  }

  async login(data: { email: string; password: string }) {
    
    const user = await UsersRepository.findByEmailWithRoles(data.email);

    if (!user) throw new Error("User not found.");

    if (!(await user.checkPassword(data.password))) {
      throw new Error("Password does not match.");
    }

    if (user.status !== "ACTIVATED") {
      throw new Error("Inactive or blocked user.");
    }

    const permissions = [
      ...new Set(
        (user.roles || [])
          .flatMap((role: any) => role.permissions || [])
          .map((permission: any) => permission.name)
      ),
    ];

    const token = jwt.sign(
      {
        id: user.id,
        company_id: user.company_id,
        roles: user.roles?.map((r: any) => r.name) || [],
      },
      authConfig.secret,
      {
        expiresIn: authConfig.expiresIn,
      }
    );

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        company_id: user.company_id,
        permissions,
      },
      token,
    };
  }

  async requestPasswordReset(email: string) {
    const user = await UsersRepository.findByEmail(email);

    if (!user) throw new Error("No user found with that email.");
    if (user.status !== "ACTIVATED") {
      throw new Error("Inactive user.");
    }

    const token = this.generateResetToken(user);

    const link = `${urlConfig.url}:${urlConfig.port_front}/reset-password?token=${token}`;

    /*await Queue.add(RecoverEmailJobs.key, {
      name: user.name,
      email: user.email,
      link,
    });*/

    return { message: "Password reset email sent successfully." };
  }

  async resetPassword(token: string, newPassword: string) {
    const decoded = (await promisify(jwt.verify)(
      token,
      authConfig.secret
    )) as any;

    const user = await UsersRepository.findById(decoded.id);

    if (!user) throw new Error("User not found.");

    user.password = newPassword;
    user.first_access = false;

    await UsersRepository.save(user);

    return { message: "Password has been reset successfully." };
  }
}

export default new SessionService();