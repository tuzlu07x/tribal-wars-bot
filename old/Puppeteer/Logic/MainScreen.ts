import BaseLogic from "../BaseLogic";
import Connection from "../Connection";

export default class MainScreen extends BaseLogic {
    protected connection: Connection
    private url: string
    constructor(connection: Connection, url: string) {
        super(connection)
        this.url = url
    }

    public async getRelatedFunc(page: any): Promise<void> {
        if (this.url === null) console.log('Overview url is null please check getCurrentUrl function')
        console.log(this.getVillageId())
        await page.goto(this.newUrl(), { waitUntil: 'networkidle0', timeout: 5000 });
        await page.waitForNavigation({ waitUntil: 'networkidle0' });
    }

    private getVillageId() {

        let urlParams = new URLSearchParams(this.url);
        let villageId = urlParams.get("village");
        return villageId;
    }

    private newUrl(): string {

        let urlParams = new URLSearchParams(this.url);
        urlParams.set("screen", "main");

        let updatedUrl = "https://tr81.klanlar.org/game.php?" + this.getVillageId() + urlParams.toString();
        return updatedUrl;
    }

    private async isNullVillageId(page: any) {
        if (this.getVillageId() === null) {
            await page.waitForSelector('.world_button_active');
            await page.click('.world_button_active');
            await page.waitForNavigation({ waitUntil: 'networkidle0' });
        }
    }
}