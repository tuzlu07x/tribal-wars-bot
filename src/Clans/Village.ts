import Agent from "../Puppeteer/Agent";
import Window from "../Puppeteer/Window";
import { VillageInfo } from "../types";
import World from "./World";

export default class Vilage {
    private _villageId: number | null = null;

    constructor(
        protected agent: Agent,
        protected world: World,
        protected screen: string
    ) {
    }

    // public async list(): Promise<VillageInfo[]> {
    //     const data: VillageInfo[] = [];

    // }

    public async run() {
        try {
            await this.goVillages();

        } catch (error: any) {
            console.error(`Error navigating to ${error.message}`);
        }
    }

    public get villageId() {
        return this._villageId
    }

    public getVillageIdFromUrl(url: string) {
        let params = new URL(url);
        let villageId = params.searchParams.get("village");
        return villageId;
    }

    public async goVillages(): Promise<void> {
        if (!this.world._newPage) throw new Error(`it doesn't work inside Overview this ${this.world.code} and ${this.screen} score`)
        const page = await this.world._newPage

        await page.goto(`https://${this.world.code}.klanlar.org/game.php?screen=${this.screen}`, {
            waitUntil: "load",
        });
        await this.world.loadVillage();
    }

}