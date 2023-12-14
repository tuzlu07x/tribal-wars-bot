import World from "../Clans/World";
import Agent from "../Puppeteer/Agent";
import { TWCredentials } from "../types";
import TWClient from "./TWClient";

export default class TribalWars {
    protected _worlds: WorldInfo[] = [];

    constructor(
        protected agent: Agent,
        protected credentials: TWCredentials
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
    }
}

export type WorldInfo = {
    name: string,
    code: string,
}