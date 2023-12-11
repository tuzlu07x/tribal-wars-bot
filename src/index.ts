import { TWCredentials } from "./types";
import Agent from "./Puppeteer";
import TWClient from "./TWClient";
import World from "./Puppeteer/World";
import Overview from "./Puppeteer/Overview";

const credentials: TWCredentials = {
  mainUrl: "https://www.klanlar.org/",
  username: "lordFatih",
  password: "1234567890",
};

const agent = new Agent('./session');
const world = new World(agent);
const overview = new Overview(agent, world)
const client = new TWClient(agent, world, overview, credentials);

client.start();
