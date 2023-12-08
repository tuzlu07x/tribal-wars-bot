import BaseLogic from "../BaseLogic";
import Connection from "../Connection";

const fs = require('fs').promises;
import WorldSelection from "./WoldSelection";

export default class LoginForm extends BaseLogic {
    protected connection: Connection;
    protected url: string;
    protected browser: any;
    protected page: any;

    constructor(connection: Connection, url: string, browser: any, page: any) {
        super(connection);
        this.url = url;
        this.browser = browser;
        this.page = page;
    }

    public async getRelatedFunc() {
        try {
            await this.loadSession();
        } catch (error) {

            await this.page.goto(this.url, { waitUntil: 'networkidle0' });
            await this.inputUserCredentials();
            await this.clickLoginButton();
            await this.page.waitForNavigation({ waitUntil: 'networkidle0' });
            await this.saveSession();
        }
        await this.worldSelection();
        this.getCurrentPage()
    }

    private async loadSession() {
        const cookiesString = await fs.readFile('./cookies.json', 'utf-8');
        const cookies = JSON.parse(cookiesString);
        await this.page.setCookie(...cookies);
        await this.page.goto(this.url, { waitUntil: 'networkidle0' });
    }

    private async inputUserCredentials() {

        await this.page.waitForSelector(`input[name='${this.connection.userType}']`);
        await this.page.type(`input[name='${this.connection.userType}']`, this.connection.userName);

        await this.page.waitForSelector(`input[name='${this.connection.passwordType}']`);
        await this.page.type(`input[name='${this.connection.passwordType}']`, this.connection.password);
    }

    private async clickLoginButton() {

        await this.page.waitForSelector('.btn-login');
        await this.page.click('.btn-login');
    }

    private async worldSelection() {

        const worldSelection = new WorldSelection(this.connection, this.browser);
        worldSelection.getRelatedFunc(this.page);
        await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    }

    public getCurrentPage() {

        const currentUrl = this.page.url();
        return currentUrl
    }

    private async saveSession() {

        const cookies = JSON.stringify(await this.page.cookies());
        await fs.writeFile('./cookies.json', cookies);
    }
}