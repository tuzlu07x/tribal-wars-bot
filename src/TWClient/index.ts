import { Page } from "puppeteer";
import Agent from "../Puppeteer";
import Window from "../Puppeteer/Window";
import World from "../Puppeteer/World";
import { TWCredentials, } from "../types";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default class TWClient {
  protected loginWindow: Window | null = null;
  constructor(protected agent: Agent, protected world: World, protected credentials: TWCredentials) {
    this.loginWindow = null
  }

  public async start(): Promise<void> {

    await this.agent.start();
    await this.loginIfNotLoggedIn();
    sleep(5000)
    await this.world.start();
  }

  protected async loginIfNotLoggedIn(): Promise<void> {

    if (!this.loginWindow) this.loginWindow = this.agent.newWindow();
    this.loginWindow.start(this.credentials)
  }

}
