import { Browser, Page, Puppeteer } from "puppeteer";
import Window from "./Window";

const puppeteerExtra = require("puppeteer-extra");
const Stealth = require("puppeteer-extra-plugin-stealth");
puppeteerExtra.use(Stealth());
import { readFileSync, writeFileSync } from "fs";

export default class Agent {
  protected _browser: Browser | null = null;

  constructor(protected sessionPath: string | null) {
  }

  public async start() {

    if (this._browser) return;
    this._browser = await puppeteerExtra.launch({
      headless: false,
    });
    await this.loadSession();
  }

  public async loadSession(): Promise<void> {

    if (!this.sessionPath) return;
    const pages = await this.browser.pages();
    const page: Page = pages[0];

    const cookiesString = readFileSync(this.sessionPath).toString();
    const cookies = JSON.parse(cookiesString);
    page.setCookie(...cookies);
  }

  public async saveSession(): Promise<void> {

    if (!this.sessionPath) return;
    const pages = await this.browser.pages();
    const page: Page = pages[0];
    const cookies = await page.cookies();
    writeFileSync(this.sessionPath, JSON.stringify(cookies));
  }

  public newWindow(): Window {

    const window: Window = new Window(this);
    return window;
  }

  public async newPage(number: number = 0): Promise<Page> {

    const pages = await this.browser.pages();
    const page: Page = pages[number];
    return page;
  }

  public get browser(): Browser {
    if (!this._browser) this.start();
    return this._browser!;
  }
}
