import Agent from "../Puppeteer/Agent";
import Window from "../Puppeteer/Window";
import { VillageInfo } from "../types";
import World from "./World";

export default class OverviewVillages extends Window {
    private _villageId: number;

    constructor(protected agent: Agent,
        protected world: World,
        protected screen: string
    ) {
        super(agent);
    }

    // public async list(): Promise<VillageInfo[]> {
    //     const data: VillageInfo[] = [];

    // }



    public async run() {
        try {
            if (!this.world._newPage) throw new Error(`it doesn't work inside Overview this ${this.world.code} and ${this.screen} score`)
            await this.goto(`${this.world.code}.klanlar.org/game.php?screen=${this.screen}`, {
                waitUntil: "load",
            });
            await this.waitForSelector(".world_button_active")
                .then(() => console.log("it should never happened"));

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

}