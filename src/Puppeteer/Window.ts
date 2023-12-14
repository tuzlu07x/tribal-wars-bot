import { Page } from "puppeteer";
import Agent from "./Agent";

export default class Window {

  constructor(protected agent: Agent) {
  }

  protected async goto(url: string) {

    const page = await this.agent.newPage();
    await page.goto(url);
  }

  protected async clickLoginButton(clasName: string): Promise<void> {

    await this.waitForSelector(`.${clasName}`);
    await this.click(`${clasName}`);
  }

  protected async waitForSelector(name: string): Promise<void> {

    const page = await this.page;
    await page.waitForSelector(name);
  }

  protected async type(name: string, signInformation: any): Promise<void> {

    const page = await this.page;
    await page.type(name, signInformation);
  }

  protected async click(name: string): Promise<void> {

    const page = await this.page;
    await page.click(`.${name}`);

  }

  protected async waitForNavigation(name: object): Promise<void> {

    const page = await this.page;
    page.waitForNavigation(name);

  }

  protected get page(): Promise<Page> {

    return this.agent.newPage();
  }

}
