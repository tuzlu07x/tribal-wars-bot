import { VillageProductionInfo } from "../types";
import Vilage from "./Village";
const cheerio = require('cheerio');

export default class VillageProduction {
    constructor(protected village: Vilage) { }

    // public async list(): Promise<VillageInfo[]> {
    //     const villages = await this.villageListFormat();
    //     const data: VillageInfo[] = [];

    //     for (const item of villages) {

    //         const villageData: VillageInfo = {
    //             name: item.name,
    //             code: item.id,
    //         };

    //         data.push(villageData);
    //     }

    //     return data;
    // }

    public async list() {
        console.log(await this.villageProductionHTML())
        // const html = await this.villageProductionHTML();
    }

    private async villageListFormat(): Promise<any> {
        const htmlContent = await this.villageProductionHTML();
        // const $ = cheerio.load(htmlContent);

        // const villages: { id: string, name: string }[] = [];

        // $('.widget_content').each((index: any, element: any) => {
        //     const villageId = $(element).find('tr > td');
        //     const villageName = $(element).find('a > span').attr('data-text');

        //     if (villageId && villageName) {
        //         villages.push({ id: villageId, name: villageName });
        //     }
        // });

        // return villages;
    }

    private async villageProductionHTML() {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        this.village._newPage.waitForSelector(".rightcolumn");
        const text = await this.village._newPage.$eval("#rightcolumn", (e: any) => e.innerHTML);
        console.log(text);
        this.village._newPage.waitForNavigation({ waitUntil: "networkidle0" });

        return text;
    }

}