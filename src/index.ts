import { TWCredentials } from "./types";
import Agent from "./Puppeteer";
import TWClient from "./TWClient";

const credentials: TWCredentials = {
  mainUrl: "https://www.klanlar.org/",
  username: "lordFatih",
  password: "1234567890",
};
const fs = require('fs');
const path = './session.json';
let file = null;

if (fs.existsSync(path)) {
  const content = fs.readFileSync(path, 'utf-8');
  if (!content.trim()) {
    fs.writeFileSync(path, JSON.stringify(null));
    file = null;
  } else {
    file = JSON.parse(content);
  }
} else {
  fs.writeFileSync(path, JSON.stringify(null));
  file = null;
}

const agent = new Agent(file);
const client = new TWClient(agent, credentials);

client.start();
