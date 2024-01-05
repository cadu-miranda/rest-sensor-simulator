import "dotenv/config";
import "express-async-errors";
import express, {
  json,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from "express";
import routes from "./routes";
import { AppError } from "./errors/AppError";

const app = express();

app.use(json());

app.use(urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ Hello: "API" });
});

app.use("/", routes);

app.use((e: Error, req: Request, res: Response, next: NextFunction) => {
  if (e instanceof AppError)
    return res.status(e.statusCode).json({ message: e.message });

  return res.status(500).json({
    status: "error",
    message: `Internal server error. - ${e.message}`,
  });
});

export { app };
