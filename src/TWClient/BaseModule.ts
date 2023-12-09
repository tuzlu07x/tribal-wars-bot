import TWClient from ".";
import Agent from "../Puppeteer";

export default class BaseModule {
  constructor(protected client: TWClient) {}
}
