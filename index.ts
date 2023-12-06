import PuppeteerConnection from "./src/Puppeteer/Connection";

const connection = new PuppeteerConnection(
  "https://www.klanlar.org/",
  "username",
  "lordFatih",
  "password",
  "1234567890",
);

connection.connector();
