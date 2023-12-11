import { Page } from "puppeteer";
import Agent from "../Puppeteer";
import Window from "../Puppeteer/Window";
import World from "../Puppeteer/World";
import { TWCredentials, } from "../types";
import Overview from "../Puppeteer/Overview";

async function sleep(ms: number) {
  return await new Promise(resolve => setTimeout(resolve, 5000));
}

export default class TWClient {
  protected loginWindow: Window | null = null;
  constructor(

    protected agent: Agent,
    protected world: World,
    protected overview: Overview,
    protected credentials: TWCredentials
  ) {

    this.loginWindow = null
  }

  public async start(): Promise<void> {
    try {
      await this.agent.start();
      await this.loginIfNotLoggedIn();
      await sleep(5000)
      this.world.start();
      await sleep(5000)
      await this.overview.start();
    } catch (error) {
      console.error(error);
    }
  }


  protected async loginIfNotLoggedIn(): Promise<void> {

    if (!this.loginWindow) this.loginWindow = this.agent.newWindow();
    this.loginWindow.start(this.credentials)
  }

}
