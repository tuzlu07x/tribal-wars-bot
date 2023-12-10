import { Page } from "puppeteer";
import Agent from ".";
import { TWCredentials } from "../types";

export default class Window {
  constructor(protected agent: Agent) {
  }

  public async start(credentials: TWCredentials) {

    const page = await this.agent.newPage();
    // try {
    //   await this.agent.loadSession()
    //   await page.goto(credentials.mainUrl, { waitUntil: "networkidle0" });

    // } catch (error) {
    console.log('anana1')
    await page.goto(credentials.mainUrl);
    await this.auth(credentials.username, credentials.password);
    await this.agent.saveSession();
    // }
  }

  private async auth(username: string, password: string): Promise<void> {
    console.log(username, password)
    await this.waitForSelector(`input[name='username']`);
    console.log(1)
    await this.type(`input[name='username']`, username);
    console.log(2)
    await this.waitForSelector(`input[name='password']`);
    console.log(3)
    await this.type(`input[name='password']`, password);
    console.log(4)
    await this.clickLoginButton('btn-login');
    console.log(5)
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
}
