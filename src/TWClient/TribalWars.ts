import World from "../Clans/World";
import getWorldList from "../Clans/WorldList";
import Agent from "../Puppeteer/Agent";
import { TWCredentials, WorldInfo } from "../types";
import TWClient from "./TWClient";

export default class TribalWars {
    protected _worlds: WorldInfo[] = [];

    constructor(
        protected agent: Agent,
        protected credentials: TWCredentials,
    ) {

    }

    public worlds(): WorldInfo[] {
        return this._worlds;
    }

    public world(code: string): World {
        return new World(this.agent, code);
    }

    public async login(): Promise<void> {

        const twClient = new TWClient(this.agent, this.credentials)
        await twClient.start();
        await this.loadWorlds()
    }

    public async loadWorlds() {
        const worldList = new getWorldList(this.agent)
        this._worlds = await worldList.list()
    }
}