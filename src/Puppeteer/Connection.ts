const puppeteerExtra = require('puppeteer-extra');
const Stealth = require('puppeteer-extra-plugin-stealth');
const fs = require('fs').promises;
puppeteerExtra.use(Stealth());

class Connection {
  protected url: string;
  protected userType: string;
  protected userName: string;
  protected passwordType: string;
  protected password: string;

  constructor(url: string, userType: string, userName: string, passwordType: string, password: string) {
    this.url = url;
    this.userType = userType;
    this.userName = userName;
    this.passwordType = passwordType;
    this.password = password;
  }

  public async connector() {
    const browser = await puppeteerExtra.launch({
      headless: false,
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 720 });
    await page.goto(this.url, { waitUntil: 'networkidle0' });
    await this.session(page);
    await this.inputUserCredentials(page);
    await this.clickLoginButton(page);
    await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 5000 });

    await page.waitForSelector('.world_button_active');
    await page.click('.world_button_active');
    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    const textSelector = await page.waitForSelector('text/Customize and automate');
    const fullTitle = await textSelector?.evaluate((el) => el.textContent);
    console.log('The title of this blog post is "%s".', fullTitle);

    await browser.close();
  }

  private async session(page: any){
  const cookies = JSON.stringify(await page.cookies());
  const sessionStorage = await page.evaluate(() =>JSON.stringify(sessionStorage));
  const localStorage = await page.evaluate(() => JSON.stringify(localStorage));

  await fs.writeFile("./cookies.json", cookies);
  await fs.writeFile("./sessionStorage.json", sessionStorage);
  await fs.writeFile("./localStorage.json", localStorage);


};

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


