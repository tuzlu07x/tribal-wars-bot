import Agent from "../Puppeteer/Agent";
import Window from "../Puppeteer/Window";
import { WorldInfo } from "../types";
const scrapeIt = require("scrape-it");

export default class getWorldList extends Window {
    constructor(protected agent: Agent) {
        super(agent)
    }

    public async list(): Promise<WorldInfo[]> {
        const worlds = await this.getScrape();
        const data: WorldInfo[] = [];

        for (const item of worlds.worlds) {
            let parts = item['url'].split('/');
            let code = parts[parts.length - 1];

            const worldData: WorldInfo = {
                name: item['title'],
                code: code,
            };

            data.push(worldData);
        }
        return data;
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

        const newPage = await this.page;
        await this.waitForSelector(".worlds-container")
        const text = await newPage.$eval(".worlds-container", (e: any) => e.innerHTML);
        this.waitForNavigation({ waitUntil: "networkidle0" });
        return text;
    }
}