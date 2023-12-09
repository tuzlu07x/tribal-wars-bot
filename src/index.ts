import { TWCredentials } from "./types";
import Agent from "./Puppeteer";
import TWClient from "./TWClient";

const credentials: TWCredentials = {
  mainUrl: "https://www.klanlar.org/",
  username: "lordFatih",
  password: "1234567890",
};

const agent = new Agent("./session.json");
const client = new TWClient(agent, credentials);

client.start();
