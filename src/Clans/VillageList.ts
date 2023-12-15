import Agent from "../Puppeteer/Agent";
import Window from "../Puppeteer/Window";
import { VillageInfo, WorldInfo } from "../types";
import World from "./World";
const scrapeIt = require("scrape-it");

export default class VillageList extends Window {
    constructor(protected agent: Agent, protected world: World) {
        super(agent)
    }

    public async list() {
        console.log(await this.getScrape())
        //const worlds = await this.getScrape();
        // const data: WorldInfo[] = [];

        // for (const item of worlds.worlds) {
        //     let parts = item['url'].split('/');
        //     let code = parts[parts.length - 1];

        //     const worldData: WorldInfo = {
        //         name: item['title'],
        //         code: code,
        //     };

        //     data.push(worldData);
        // }
        // return data;
    }

    private async getScrape(): Promise<any> {
        console.log(1)
        const htmlContent = this.worldListHtml();
        console.log(2)
        const data = scrapeIt.scrapeHTML(htmlContent)
        console.log(3)
        return data
        // const data = scrapeIt.scrapeHTML(htmlContent, {
        //     worlds: {
        //         listItem: ".world-select",
        //         data: {
        //             title: "a span",
        //             url: {
        //                 attr: "href",
        //             },
        //         },
        //     },
        // });
        // return data;
    }

    private async worldListHtml(): Promise<string> {

        const newPage = await this.page;
        console.log(4)
        await newPage.waitForSelector(".nowrap selected  row_a")
        console.log(5)
        const text = await newPage.$eval(".nowrap selected  row_a", (e: any) => e.innerHTML);
        console.log(6)
        this.waitForNavigation({ waitUntil: "networkidle0" });
        return text;
    }
}