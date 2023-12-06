import PuppeteerConnection from "./src/Puppeteer/Connection";
import WorldSelection from "./src/Puppeteer/Logic/WoldSelection";

const connection = new PuppeteerConnection(
  "https://www.klanlar.org/",
  "username",
  "lordFatih",
  "password",
  "1234567890",
  WorldSelection
);

connection.connector();
