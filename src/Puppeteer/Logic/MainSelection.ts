import BaseLogic from "../BaseLogic";
import Connection from "../Connection";

export default class MainSelection extends BaseLogic {
    protected url: string;
    protected connection: Connection;

    constructor(url: string, connection: Connection) {
        super(connection);
        this.url = url;
    }

    public async getRelatedFunc(page: any): Promise<void> {
        await page.goto(this.url, { waitUntil: 'networkidle0', timeout: 5000 });
        console.log('3' + page.url())

        await page.waitForNavigation({ waitUntil: 'networkidle0' });
    }
}