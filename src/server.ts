import { consoleColors } from "./utils/consoleColors";
import { app } from "./app";

const appPort = process.env.PORT;
const appURL = process.env.APP_URL;

app.listen(appPort, async () => {
  console.log(consoleColors.Green, `Server running on: ${appURL}.`);
});
