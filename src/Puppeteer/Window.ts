import { Page } from "puppeteer";
import Agent from ".";
import { TWCredentials } from "../types";

export default class Window {
  constructor(protected agent: Agent) {
  }

  public async start(credentials: TWCredentials) {

    const page = await this.agent.newPage();
    try {
      await this.agent.loadSession()
      await page.goto(credentials.mainUrl, { waitUntil: "networkidle0" });

    } catch (error) {
      console.log('anana1')
      await page.goto(credentials.mainUrl);
      await this.auth(credentials.username, credentials.password);
      await this.agent.saveSession();
    }
  }

  private async auth(username: string, password: string): Promise<void> {

    await this.waitForSelector(`input[name='username']`);
    await this.type(`input[name='username']`, username);
    await this.waitForSelector(`input[name='password']`);
    await this.type(`input[name='password']`, password);
    await this.clickLoginButton('btn-login');
    await this.waitForNavigation({ waitUntil: "networkidle0" })
  }

  private async clickLoginButton(clasName: string): Promise<void> {

    await this.waitForSelector(`.${clasName}`);
    await this.click(`${clasName}`);
  }

  private async waitForSelector(name: string): Promise<void> {

    const page = await this.agent.newPage();
    await page.waitForSelector(name);
  }

  private async type(name: string, signInformation: any): Promise<void> {

    const page = await this.agent.newPage();
    await page.type(name, signInformation);
  }

  private async click(name: string): Promise<void> {

    const page = await this.agent.newPage();
    await page.click(`.${name}`);

  }

  private async waitForNavigation(name: object): Promise<void> {

    const page = await this.agent.newPage();
    await page.waitForNavigation(name);

  }
}
