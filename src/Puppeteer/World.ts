import { Page } from "puppeteer";
import Agent from ".";
import BaseModule from "../TWClient/BaseModule"
const scrapeIt = require("scrape-it");

export default class World extends BaseModule {
    private _page: Page | null = null;
    constructor(protected agent: Agent) {
        super(agent)
    }
    public async start(): Promise<void> {
        const newPage = await this.agent.newPage()
        this.page = newPage;
        await this.openNewTab()
        await this.waitForNavigation({ waitUntil: "networkidle0" })
    }

    private async openNewTab(): Promise<void> {
        const worlds: any = await this.getScrape();

        for (const item of worlds.worlds) {
            try {
                const newPage = await this.agent.browser.newPage();
                await this.goto(newPage, "https://www.klanlar.org" + item["url"], {
                    waitUntil: "load",
                });
                await this
                    .waitForSelector(".world_button_active")
                    .then(() => console.log("it should never happened"));
            } catch (error: any) {
                console.error(`Error navigating to ${item["url"]}: ${error.message}`);
            }
        }
    }

    public async goto(page: Page, url: string, object: object): Promise<void> {

        await page.goto(url, object);
    }

    public async waitForSelector(name: string): Promise<void> {

        await this.page.waitForSelector(name);
    }

    public async waitForNavigation(name: object): Promise<void> {

        await this.page.waitForNavigation(name);
    }

    private async worldListHtml(): Promise<string> {

        await this.waitForSelector(".worlds-container")
        const text = await this.page.$eval(".worlds-container", (e: any) => e.innerHTML);
        this.waitForNavigation({ waitUntil: "networkidle0" });
        return text;
    }

    private async getScrape(): Promise<any> {
        const htmlContent = await this.worldListHtml();
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

    private set page(newPage: Page) {
        this._page = newPage;
    }

    private get page() {
        if (!this._page) {
            throw new Error("Page not set. Call setPage to set the page.");
        }
        return this._page;
    }
}
