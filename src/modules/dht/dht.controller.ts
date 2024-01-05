import { Request, Response } from "express";
import { DHTService } from "./dht.service";

class DHTController {
  private dhtService: DHTService;

  constructor() {
    this.dhtService = new DHTService();
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { pin, type } = req.body;

    const dhtData = this.dhtService.execute({ pin, type });

    if (!dhtData) {
      return res.status(400).json({ error: "Failed to read from DHT sensor." });
    }

    return res.status(200).json(dhtData);
  }
}

export { DHTController };
