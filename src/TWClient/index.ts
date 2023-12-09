import { Page } from "puppeteer";
import Agent from "../Puppeteer";
import Window from "../Puppeteer/Window";
import { TWCredentials } from "../types";

type Events = {
  [key: string]: (() => void)[];
};

export default class TWClient {
  protected events: Events;
  protected loginWindow: Window | null = null;
  constructor(protected agent: Agent, protected credentials: TWCredentials) {
    this.events = {};
    this.loginWindow = null
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
    this.loginWindow.start(this.credentials)
  }

}
