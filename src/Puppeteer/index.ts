import { Browser, Page } from "puppeteer";
import puppeteerExtra from "puppeteer-extra";
import Stealth from "puppeteer-extra-plugin-stealth";
import { readFileSync, writeFileSync, existsSync } from "fs";
import Window from "./Window";

puppeteerExtra.use(Stealth());

export default class Agent {
  protected _browser: Browser | null = null;

  constructor(protected sessionPath: string | null) { }

  public async start() {
    if (this._browser) return;
    this._browser = await puppeteerExtra.launch({
      headless: false,
    });
    await this.loadSession();
  }

  public async loadSession(): Promise<void> {
    if (!this.sessionPath || !existsSync(this.sessionPath)) return;

    const pages = await this.browser.pages();
    const page: Page = pages[0];

    const cookiesString = readFileSync(this.sessionPath).toString();
    const cookies = JSON.parse(cookiesString);
    console.log(cookies)
    await page.setCookie(...cookies);
  }

  public async saveSession(): Promise<void> {
    if (!this.sessionPath) return;
    const pages = await this.browser.pages();
    const page: Page = pages[0];
    const cookies = await page.cookies();
    writeFileSync(this.sessionPath, JSON.stringify(cookies));
  }

  public newWindow() {
    const window = new Window(this);
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
