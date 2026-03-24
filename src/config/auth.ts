import dotenv from "dotenv";

dotenv.config();

interface AuthConfig {
  secret: string;
  expiresIn: string;
}

const authConfig: AuthConfig = {
  secret: process.env.JWT_SECRET || "", // pega da variável de ambiente
  expiresIn: process.env.JWT_EXPIRES_IN || "15m", // default 15 minutos
};

// Verifica se a variável de ambiente foi definida
if (!authConfig.secret) {
  throw new Error("JWT_SECRET is not defined in the environment variables.");
}

export default authConfig;