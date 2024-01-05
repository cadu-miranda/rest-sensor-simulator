import { DHT, DHTType } from "../../utils/DHT";

interface ReadSensorDataDTO {
  pin: number;
  type: DHTType;
}

class DHTService {
  execute({ pin, type }: ReadSensorDataDTO): {
    h: number;
    t: number;
    f: number;
    hif: number;
    hic: number;
  } {
    const dht = DHT.getInstance({ pin, type });

    const h = dht.readHumidity();

    const t = dht.readTemperature();

    const f = dht.readTemperature(true);

    const hif = dht.computeHeatIndex(f, h);

    const hic = dht.computeHeatIndex(t, h, false);

    if (isNaN(h) || isNaN(t) || isNaN(f)) {
      return { h: 0, t: 0, f: 0, hif: 0, hic: 0 };
    }

    return { h, t, f, hif, hic };
  }
}

export { DHTService };
