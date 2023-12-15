import { Page } from "puppeteer";
import Agent from "../Puppeteer/Agent";
import Window from "../Puppeteer/Window";
import OverviewVillages from "./OverviewVillages";
import { VillageInfo } from "../types";
export default class World {
    // protected _villages: VillageInfo[] = [];

    constructor(
        protected agent: Agent,
        public code: string,
        public _newPage: Page | null = null
    ) {
    }

    public async newPage() {
        if (!this._newPage) return this.run()
        return this._newPage;
    }

    public async run(): Promise<void> {
        try {
            this._newPage = await this.agent.browser.newPage();

            await this._newPage.goto(`https://www.klanlar.org/page/play/${this.code}`, {
                waitUntil: "load",
            });
            await this._newPage
                .waitForSelector(".world_button_active")
                .then(() => console.log("it should never happened"));

        } catch (error: any) {
            console.error(`Error navigating to ${error.message}`);
        }
    }

    // public villages(): VillageInfo[] {
    //     return this._villages
    // }

    // public async loadVillages() {
    //     const villageList = new OverviewVillages(this.agent, this, 'overview_villages')
    //     this._villages = await villageList.list()
    // }

} 