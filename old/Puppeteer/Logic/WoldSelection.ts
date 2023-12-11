import BaseLogic from "../BaseLogic";
import Connection from "../Connection";
const scrapeIt = require("scrape-it");
export default class WorldSelection extends BaseLogic {
  protected browser: any;
  protected url: string | null = null;

  constructor(connection: Connection, browser: any, url: string | null = null) {
    super(connection);
    this.browser = browser;
    this.url = url;
  }
  public async getRelatedFunc(page: any): Promise<void> {
    const worlds = await this.getScrape(page);
    for (const item of worlds.worlds) {
      try {
        const newPage = await this.browser.newPage();
        let newUrl = "https://www.klanlar.org" + item["url"];
        await newPage.goto(newUrl, {
          waitUntil: "load",
        });
        this.getCurrentUrl = newUrl;
        console.log('url   ' + this.url)
        await page
          .waitForSelector(".world_button_active")
          .then(() => console.log("it should never happened"));
      } catch (error: any) {
        console.error(`Error navigating to ${item["url"]}: ${error.message}`);
      }
    }
  }

  private async worldListHtml(page: any) {
    await page.waitForSelector(".worlds-container");
    const text = await page.$eval(".worlds-container", (e: any) => e.innerHTML);
    return text;
  }

  private async getScrape(page: any) {
    const htmlContent = await this.worldListHtml(page);
    const data = scrapeIt.scrapeHTML(htmlContent, {
      worlds: {
        listItem: ".world-select",
        data: {
          title: "a span",
          url: {
            attr: "href",
          },
        },
      },
    });
    return data;
  }

  public get getCurrentUrl(): string | null {

    return this.url;
  }
  public set getCurrentUrl(url: string) {

    this.url = url;
  }

}
