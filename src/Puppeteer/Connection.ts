import LoginForm from "./Logic/LoginForm";

const puppeteerExtra = require('puppeteer-extra');
const Stealth = require('puppeteer-extra-plugin-stealth');

puppeteerExtra.use(Stealth());

export default class Connection {
  public url: string;
  public userType: string;
  public userName: string;
  public passwordType: string;
  public password: string;
  public className: any;

  constructor(
    url: string,
    userType: string,
    userName: string,
    passwordType: string,
    password: string,
  ) {
    this.url = url;
    this.userType = userType;
    this.userName = userName;
    this.passwordType = passwordType;
    this.password = password;
  }

  public async connector() {
    const browser = await puppeteerExtra.launch({
      headless: false
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 720 });
    const loginForm = new LoginForm(this, this.url, browser, page)
    await loginForm.getRelatedFunc();

    const textSelector = await page.waitForSelector('text/Customize and automate');
    const fullTitle = await textSelector?.evaluate((el) => el.textContent);
    console.log('The title of this blog post is "%s".', fullTitle);

    await browser.close();
  }

}
