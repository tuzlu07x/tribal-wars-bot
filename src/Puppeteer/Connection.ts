const puppeteerExtra = require('puppeteer-extra');
const Stealth = require('puppeteer-extra-plugin-stealth');
const fs = require('fs').promises;

puppeteerExtra.use(Stealth());

export default class Connection {
  protected url: string;
  protected userType: string;
  protected userName: string;
  protected passwordType: string;
  protected password: string;
  protected className: any;

  constructor(
    url: string,
    userType: string,
    userName: string,
    passwordType: string,
    password: string,
    className: any,
  ) {
    this.url = url;
    this.userType = userType;
    this.userName = userName;
    this.passwordType = passwordType;
    this.password = password;
    this.className = className;
  }

  public async connector() {
    const browser = await puppeteerExtra.launch({
      headless: false,
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 720 });

    try {
      await this.loadSession(page);
    } catch (error) {

      await page.goto(this.url, { waitUntil: 'networkidle0' });

      await this.inputUserCredentials(page);
      await this.clickLoginButton(page);
      await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 5000 });
      await this.saveSession(page);
    }
    const worldSelection = new this.className(this);
    await worldSelection.getRelatedFunc(page);

    const textSelector = await page.waitForSelector('text/Customize and automate');
    const fullTitle = await textSelector?.evaluate((el) => el.textContent);
    console.log('The title of this blog post is "%s".', fullTitle);

    await browser.close();
  }

  private async saveSession(page: any) {
    const cookies = JSON.stringify(await page.cookies());
    await fs.writeFile('./cookies.json', cookies);
  }

  private async loadSession(page) {
    const cookiesString = await fs.readFile('./cookies.json', 'utf-8');
    const cookies = JSON.parse(cookiesString);
    await page.setCookie(...cookies);

    const worldSelection = new this.className(this);
    worldSelection.getRelatedFunc(page);
    await fs.readFile('./sessionStorage.json', 'utf-8');
  }

  private async inputUserCredentials(page) {
    await page.waitForSelector(`input[name='${this.userType}']`);
    await page.type(`input[name='${this.userType}']`, this.userName);

    await page.waitForSelector(`input[name='${this.passwordType}']`);
    await page.type(`input[name='${this.passwordType}']`, this.password);
  }

  private async clickLoginButton(page: any) {
    await page.waitForSelector('.btn-login');
    await page.click('.btn-login');
  }
}
