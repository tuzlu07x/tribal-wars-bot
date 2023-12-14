import { Page } from "puppeteer";
import Agent from "../Puppeteer/Agent";
import Window from "../Puppeteer/Window";
const scrapeIt = require("scrape-it");

export default class World extends Window {

    constructor(
        protected agent: Agent,
        private code: string,
        protected _newPage: Page | null = null
    ) {
        super(agent)
    }

    public list(): Promise<JSON> {

        return this.getScrape();
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

    private async worldListHtml(): Promise<string> {

        await this.waitForSelector(".worlds-container")
        const newPage = await this.page;
        const text = await newPage.$eval(".worlds-container", (e: any) => e.innerHTML);
        this.waitForNavigation({ waitUntil: "networkidle0" });
        return text;
    }

    public async worldNames(): Promise<void> {

        const worlds: any = await this.list();

        for (const item of worlds.worlds) {
            await this.goWorlds(item)
        }
    }

    private async goWorlds(item: any): Promise<void> {
        try {
            this._newPage = await this.agent.browser.newPage();

            await this._newPage.goto("https://www.klanlar.org" + item["url"], {
                waitUntil: "load",
            });
            await this._newPage
                .waitForSelector(".world_button_active")
                .then(() => console.log("it should never happened"));

            // const currentUrl = newPage.url();
            // this.currentUrl.push(currentUrl);

        } catch (error: any) {
            console.error(`Error navigating to ${item["url"]}: ${error.message}`);
        }
    }

}