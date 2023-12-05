import BaseLogic from "../BaseLogic";

export default class WorldSelection extends BaseLogic {

    public async getRelatedFunc(page: any): Promise<void> {
        await page.waitForSelector('.world_button_active');
        await page.click('.world_button_active');
        await page.waitForNavigation({ waitUntil: 'networkidle0' });
    }
}