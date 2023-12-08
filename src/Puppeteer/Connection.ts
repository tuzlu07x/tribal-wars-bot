import LoginForm from "./Logic/LoginForm";
import MainScreen from "./Logic/MainScreen";

const puppeteerExtra = require('puppeteer-extra');
const Stealth = require('puppeteer-extra-plugin-stealth');

puppeteerExtra.use(Stealth());

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
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
    try {
      const loginForm = new LoginForm(this, this.url, browser, page)
      await sleep(10000)
      loginForm.getRelatedFunc(),

        await sleep(10000)
      // const mainScreen = new MainScreen(this, await loginForm.getCurrentPage())
      // mainScreen.getRelatedFunc(page,)
      // sleep(5000)
      console.log('after sleep ' + await loginForm.getCurrentPage())

      const textSelector = await page.waitForSelector('text/Customize and automate');
      const fullTitle = await textSelector?.evaluate((el) => el.textContent);
      console.log('The title of this blog post is "%s".', fullTitle);

    } catch (error) {
      console.log(error)
    }
    await browser.close();
  }

  private getVillageId(url: string) {

    let urlParams = new URLSearchParams(url);
    let villageId = urlParams.get("village");
    return villageId;
  }



}
