import { Request, Response, Router } from "express";
import { DHTController } from "./dht.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { getDHTDataSchema } from "./dht.schema";

const routes = Router();

const dhtController = new DHTController();

routes.post(
  "/dht",
  validateRequest(getDHTDataSchema),
  (req: Request, res: Response) => dhtController.handle(req, res)
);

export default routes;
