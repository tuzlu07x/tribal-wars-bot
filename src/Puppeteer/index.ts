import { Browser, Page, Puppeteer } from "puppeteer";
import Window from "./Window";

const puppeteerExtra = require("puppeteer-extra");
const Stealth = require("puppeteer-extra-plugin-stealth");
puppeteerExtra.use(Stealth());
import { readFileSync, writeFileSync } from "fs";

export default class Agent {
  constructor(protected sessionPath: string | null) {}

  browser: Browser;
  public async start() {
    this.browser = await puppeteerExtra.launch({
      headless: false,
    });

    await this.loadSession();
  }

  public async loadSession(): Promise<void> {
    if (!this.sessionPath) return;
    const page: Page = await this.browser.pages()[0];
    const cookiesString = readFileSync(this.sessionPath).toString();
    const cookies = JSON.parse(cookiesString);
    page.setCookie(...cookies);
  }

  public async saveSession(): Promise<void> {
    if (!this.sessionPath) return;
    const page: Page = this.browser.pages()[0];
    const cookies = await page.cookies();
    writeFileSync(this.sessionPath, JSON.stringify(cookies));
  }

  public newWindow(): Window {
    const window: Window = new Window(this);
    return window;
  }
}
