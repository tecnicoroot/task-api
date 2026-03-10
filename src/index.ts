import express from "express";
import dotenv from "dotenv";
import routes from "./routes";
import "./config/database";

dotenv.config();

const app = express();

app.use(express.json());

// rotas da aplicação
app.use(routes);

// middleware global de erro
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);

  return res.status(500).json({
    error: "Internal Server Error"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});