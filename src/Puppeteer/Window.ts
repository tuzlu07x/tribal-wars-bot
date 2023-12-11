import { Page } from "puppeteer";
import Agent from ".";
import { TWCredentials } from "../types";
import getLog from "../Log"
export default class Window {
  constructor(protected agent: Agent) {
  }

  public async start(credentials: TWCredentials) {
    await this.goto(credentials.mainUrl);
    getLog().info('is Login ' + await this.isLogin())
    getLog().info('Main Page added ' + credentials.mainUrl);
    if (!await this.isLogin()) {
      getLog().info('Session doesnt have here');
      await this.auth(credentials.username, credentials.password);
      getLog().info('Auth worked.');
    }
  }

  private async auth(username: string, password: string): Promise<void> {

    await this.waitForSelector(`input[name='username']`);
    await this.type(`input[name='username']`, username);
    await this.waitForSelector(`input[name='password']`);
    await this.type(`input[name='password']`, password);
    await this.clickLoginButton('btn-login');
  }

  private async goto(url: string) {
    const page = await this.agent.newPage();
    await page.goto(url);
    await this.waitForNavigation({ waitUntil: "networkidle0" })
  }

  private async clickLoginButton(clasName: string): Promise<void> {

    await this.waitForSelector(`.${clasName}`);
    await this.click(`${clasName}`);
  }

  private async waitForSelector(name: string): Promise<void> {

    const page = await this.page;
    await page.waitForSelector(name);
  }

  private async type(name: string, signInformation: any): Promise<void> {

    const page = await this.page;
    await page.type(name, signInformation);
  }

  private async click(name: string): Promise<void> {

    const page = await this.page;
    await page.click(`.${name}`);

  }

  private async waitForNavigation(name: object): Promise<void> {

    const page = await this.page;
    page.waitForNavigation(name);

  }

  private async isLogin(): Promise<boolean> {

    const page = await this.page;
    const isLogin = await page.$(`input[name='username']`) === null;
    return isLogin
  }

  private get page(): Promise<Page> {
    return this.agent.newPage();
  }

}
