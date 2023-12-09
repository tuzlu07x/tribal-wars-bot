import Agent from "../Puppeteer";
import BaseModule from "./BaseModule";
import Window from "../Puppeteer/Window";

type Events = {
  [key: string]: (() => void)[];
};

export default class TWClient {
  protected events: Events;
  protected loginWindow: Window;
  constructor(protected agent: Agent, protected credentials: any) {
    this.events = {};
  }

  public on(event: string, callback: () => void): void {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  }

  public emit(event: string): void {
    if (!this.events[event]) return;
    this.events[event].forEach((callback) => callback());
  }

  public async start(): Promise<void> {
    await this.agent.start();
    await this.loginIfNotLoggedIn();
  }

  protected async loginIfNotLoggedIn(): Promise<void> {
    if (!this.loginWindow) this.loginWindow = this.agent.newWindow();
    this.loginWindow.goto(this.credentials.mainUrl);
    await this.page.waitForSelector(`input[name='username']`);
    await this.page.type(`input[name='username']`, this.credentials.username);

    await this.page.waitForSelector(`input[name='password']`);
    await this.page.type(`input[name='password']`, this.credentials.password);
  }

  private async clickLoginButton() {
    await this.page.waitForSelector(".btn-login");
    await this.page.click(".btn-login");
    if (url === this.credentials.mainUrl) {
      await page.type("#user", this.credentials.username);
      await page.type("#password", this.credentials.password);
      await page.click("#s1");
      await page.waitForNavigation();
    }
    await this.agent.saveSession();
    this.emit("ready");
  }
}
