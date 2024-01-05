import "dotenv/config";

import express, { json, Request, Response, urlencoded } from "express";
import routes from "./modules/dht/dht.routes";

const app = express();

app.use(json());

app.use(urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ Hello: "API" });
});

app.use("/", routes);

export { app };
