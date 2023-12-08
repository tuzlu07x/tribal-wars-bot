import BaseLogic from "../BaseLogic";
import Connection from "../Connection";
const scrapeIt = require("scrape-it")
export default class WorldSelection extends BaseLogic {
    protected connection: Connection
    protected browser: any
    constructor(connection: Connection, browser: any) {
        super(connection);
        this.browser = browser
    }
    public async getRelatedFunc(page: any): Promise<void> {
        const worlds = await this.getScrape(page);
        console.log(worlds)
        for (const item of worlds.worlds) {
            try {
                const newPage = await this.browser.newPage();
                await newPage.goto('https://www.klanlar.org' + item['url'], { waitUntil: 'networkidle0', timeout: 10000 });
                //await newPage.waitForSelector('.world_button_active');
            } catch (error) {
                console.error(`Error navigating to ${item['url']}: ${error.message}`);
            }
        }
    }


    private async worldListHtml(page: any) {
        await page.waitForSelector('.worlds-container');
        const text = await page.$eval('.worlds-container', e => e.innerHTML);
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
                        attr: "href"
                    }
                }
            },
        });
        return data;
    }


}