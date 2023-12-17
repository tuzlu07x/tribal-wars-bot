import { Page } from "puppeteer";
import Agent from "../Puppeteer/Agent";
import World from "./World";
import { VillageProductionInfo } from "../types";
import VillageProduction from "./VillageProduction";

export default class Vilage {
    public _newPage: Page | null = null;
    public _production: VillageProductionInfo | null = null;
    constructor(
        protected agent: Agent,
        protected world: World,
    ) {
    }

    public async run(screen: string) {
        try {
            await this.overviewVillages(screen);
        } catch (error: any) {
            console.error(`Error navigating to ${error.message}`);
        }
    }

    public getVillageIdFromUrl(url: string) {
        let params = new URL(url);
        let villageId = params.searchParams.get("village");
        return villageId;
    }

    public async overviewVillages(screen: string): Promise<void> {
        await this.world._newPage.goto(`https://${this.world.code}.klanlar.org/game.php?screen=${screen}`, {
            waitUntil: "load",
        });
        await this.world.loadVillage();
    }

    public async goVillage(screen: string): Promise<void> {

        for (const item of this.world.villages()) {
            this._newPage = await this.agent.newPage();
            await this.world._newPage.goto(`https://${this.world.code}.klanlar.org/game.php?village=${item.code}screen=${screen}`, {
                waitUntil: "load",
            });
            this.world._newPage.waitForNavigation({ waitUntil: 'networkidle0' });
            this.loadProduction();
        }
    }

    public async production(): Promise<VillageProductionInfo> {
        return this._production;
    }

    public async loadProduction() {
        const production = new VillageProduction(this)
        console.log('girdi')
        await production.list()
    }
}