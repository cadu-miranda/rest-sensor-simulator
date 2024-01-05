type DHTType = "DHT11" | "DHT22";

interface DHTProps {
  pin: number;
  type: DHTType;
}

interface DHTImpl {
  readTemperature(scale: boolean): number;
  readHumidity(): number;
  computeHeatIndex(
    temperature: number,
    humidity: number,
    isFahrenheit?: boolean
  ): number;
}

class DHT implements DHTImpl {
  private static instance: DHT;

  private pin: number;

  private type: DHTType;

  constructor({ pin, type }: DHTProps) {
    this.pin = pin;

    this.type = type;
  }

  public static getInstance({ pin, type }: DHTProps): DHT {
    if (!DHT.instance) {
      DHT.instance = new DHT({ pin, type });
    }

    return DHT.instance;
  }

  private generateRandomNumber(min: number, max: number): number {
    const randomNumber = Math.random() * (max - min) + min;

    const isFloat = Math.random() >= 0.5;

    if (isFloat) {
      return +randomNumber.toFixed(1);
    }

    return Math.round(randomNumber);
  }

  public readTemperature(isFahrenheit: boolean = false): number {
    const sensorType = this.type;

    let min;

    let max;

    if (sensorType === "DHT11") {
      min = 0;

      max = 50;
    } else {
      min = -40;

      max = 80;
    }

    if (isFahrenheit) {
      min = min * 1.8 + 32;

      max = max * 1.8 + 32;
    }

    const temperature = this.generateRandomNumber(min, max);

    return temperature;
  }

  public readHumidity() {
    const sensorType = this.type;

    let min;

    let max;

    if (sensorType === "DHT11") {
      min = 20;

      max = 80;
    } else {
      min = 0;

      max = 100;
    }

    const humidity = this.generateRandomNumber(min, max);

    return humidity;
  }

  public computeHeatIndex(
    temperature: number,
    humidity: number,
    isFahrenheit: boolean = true
  ): number {
    if (isFahrenheit) {
      temperature = (temperature - 32) * (5 / 9);
    }

    const heatIndex =
      -8.784695 +
      1.61139411 * temperature +
      2.338549 * humidity +
      -0.14611605 * temperature * humidity +
      -0.01230809 * Math.pow(temperature, 2) +
      -0.01642482 * Math.pow(humidity, 2) +
      0.00221173 * Math.pow(temperature, 2) * humidity +
      0.00072546 * temperature * Math.pow(humidity, 2) +
      -0.00000358 * Math.pow(temperature, 2) * Math.pow(humidity, 2);

    return +heatIndex.toFixed(1);
  }
}

export { DHT, DHTType };
