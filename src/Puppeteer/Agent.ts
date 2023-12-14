import { Browser, Page } from "puppeteer";
import puppeteerExtra from "puppeteer-extra";
import Stealth from "puppeteer-extra-plugin-stealth";
import Window from "./Window";

puppeteerExtra.use(Stealth());

export default class Agent {
  protected _browser: Browser | null = null;

  constructor(protected dataPath: string) {

  }

  public async start() {

    if (this._browser) return;
    this._browser = await puppeteerExtra.launch({
      headless: false,
      userDataDir: this.dataPath
    });
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
