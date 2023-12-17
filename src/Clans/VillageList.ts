import Agent from "../Puppeteer/Agent";
import Window from "../Puppeteer/Window";
import { WorldInfo } from "../types";
import World from "./World";
const cheerio = require('cheerio');

export default class VillageList extends Window {
    constructor(protected agent: Agent, protected world: World) {
        super(agent)
    }

    public async list(): Promise<WorldInfo[]> {
        const villages = await this.getScrape();
        const data: WorldInfo[] = [];

        for (const item of villages) {

            const worldData: WorldInfo = {
                name: item.name,
                code: item.id,
            };

            data.push(worldData);
        }

        return data;
    }

    private async getScrape(): Promise<any> {
        const htmlContent = await this.worldListHtml();
        const $ = cheerio.load(htmlContent);

        const villages: { id: string, name: string }[] = [];

        $('.quickedit-vn').each((index: any, element: any) => {
            const villageId = $(element).attr('data-id');
            const villageName = $(element).find('a > span').attr('data-text');

            if (villageId && villageName) {
                villages.push({ id: villageId, name: villageName });
            }
        });

        return villages;
    }


    private async worldListHtml() {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        if (!this.world._newPage) throw new Error('in Village List');
        const newPage = this.world._newPage;
        newPage.waitForSelector("#production_table");
        const text = await newPage.$eval("#production_table", (e: any) => e.innerHTML);
        newPage.waitForNavigation({ waitUntil: "networkidle0" });

        return text;
    }


}