import { Page } from "puppeteer";
import Agent from ".";
import BaseModule from "../TWClient/BaseModule"
import World from "./World";

async function sleep(ms: number) {
    return await new Promise((resolve) => setTimeout(resolve, ms));
}

export default class Overview extends BaseModule {

    constructor(protected agent: Agent, protected world: World) {
        super(agent)
    }

    public async start(): Promise<void> {
        sleep(3000)
        for (const item of this.world.currentUrl) {
            const newPage = await this.agent.browser.newPage();
            console.log('item   ' + item)
            await sleep(2000)
            let newUrl: string = item.replace('overview', 'overview_villages');
            console.log('newUrl   ' + newUrl)
            try {
                await this.goto(newPage, newUrl, { waitUntil: 'networkidle0' });
                this.waitForNavigation({ waitUntil: "networkidle0" });
            } catch (error) {
                console.error(error);
            }
        }
    }

    public async goto(page: Page, url: string, object: object): Promise<void> {

        await page.goto(url, object);
    }

    public async waitForSelector(name: string): Promise<void> {

        await this.world.page.waitForSelector(name);
    }

    public async waitForNavigation(name: object): Promise<void> {

        await this.world.page.waitForNavigation(name);
    }


}