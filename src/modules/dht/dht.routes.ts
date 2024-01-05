import { Request, Response, Router } from "express";
import { DHTController } from "./dht.controller";

const routes = Router();

const dhtController = new DHTController();

routes.get("/dht", (req: Request, res: Response) =>
  dhtController.handle(req, res)
);

export default routes;
