import Agent from "../Puppeteer/Agent";
import Window from "../Puppeteer/Window";
import { TWCredentials } from "../types";

export default class Auth extends Window {

    constructor(protected agent: Agent, protected credentials: TWCredentials) {
        super(agent)
    }

    public async login(): Promise<void> {

        await this.goto(this.credentials.mainUrl);
        if (!await this.isLogin()) {
            await this.auth(this.credentials.username, this.credentials.password);
        }
        await this.waitForNavigation({ waitUntil: "networkidle0" })
    }

    private async auth(username: string, password: string): Promise<void> {

        await this.waitForSelector(`input[name='username']`);
        await this.type(`input[name='username']`, username);
        await this.waitForSelector(`input[name='password']`);
        await this.type(`input[name='password']`, password);
        await this.clickLoginButton('btn-login');
    }

    private async isLogin(): Promise<boolean> {

        const page = await this.page;
        const isLogin = await page.$(`input[name='username']`) === null;
        return isLogin
    }



}