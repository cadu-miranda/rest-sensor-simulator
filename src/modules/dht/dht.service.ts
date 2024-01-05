import { DHT } from "../../utils/DHT";

class DHTService {
  execute(): {
    h: number;
    t: number;
    f: number;
    hif: number;
    hic: number;
  } {
    const dht = DHT.getInstance({ pin: 4, type: "DHT11" });

    dht.begin();

    const h = dht.readHumidity();

    const t = dht.readTemperature();

    const f = dht.readTemperature(true);

    const hif = dht.computeHeatIndex(f, h);

    const hic = dht.computeHeatIndex(t, h, false);

    if (isNaN(h) || isNaN(t) || isNaN(f)) {
      console.log("Failed to read from DHT sensor!");

      return { h: 0, t: 0, f: 0, hif: 0, hic: 0 };
    }

    return { h, t, f, hif, hic };
  }
}

export { DHTService };
