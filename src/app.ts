import express from "express";
import routes from "./routes";

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
export default app;