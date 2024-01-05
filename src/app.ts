import "dotenv/config";

import express, { json, Request, Response, urlencoded } from "express";
import { DHT } from "./utils/DHT";

const dht = new DHT({ pin: 4, type: "DHT11" });

dht.begin();

const app = express();

app.use(json());

app.use(urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ Hello: "API" });
});

app.get("/dht", (req: Request, res: Response) => {
  const h = dht.readHumidity();

  const t = dht.readTemperature();

  const f = dht.readTemperature(true);

  const hif = dht.computeHeatIndex(f, h);

  const hic = dht.computeHeatIndex(t, h, false);

  if (isNaN(h) || isNaN(t) || isNaN(f)) {
    res.status(500).json({ error: "Failed to read sensor data." });

    return;
  }

  res.status(200).json({ h, t, f, hif, hic });
});

export { app };
