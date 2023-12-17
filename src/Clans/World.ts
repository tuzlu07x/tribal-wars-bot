import { Page } from "puppeteer";
import Village from "../Clans/Village";
import VillageList from "../Clans/VillageList";
import Agent from "../Puppeteer/Agent";
import { VillageInfo } from "../types";
export default class World {
    protected _villages: any | null = null

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

        } catch (error: any) {
            console.error(`Error navigating to ${error.message}`);
        }
    }

    public village(screen: string): Village {
        return new Village(this.agent, this, screen)
    }

    public async loadVillage() {
        const villageList = new VillageList(this.agent, this)
        this._villages = await villageList.list()
    }

    public villages(): VillageInfo[] {
        return this._villages
    }

} 