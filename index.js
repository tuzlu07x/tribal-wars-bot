import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 720 });
  await page.goto("https://www.klanlar.org/", { waitUntil: "networkidle0" });
  await page.waitForSelector("input[name='username']");
  await page.type("input[name='username']", "throwBall", { hidden: false });
  await page.waitForSelector("input[name='password']");
  await page.type("input[name='password']", "90252a00mQ.", { hidden: false });

  await Promise.all([
    await page.waitForSelector(".btn-login"),
    await page.click(".btn-login"),
    await page.waitForNavigation({ waitUntil: "networkidle0" }),
  ]);
  const textSelector = await page.waitForSelector(
    "text/Customize and automate"
  );
  const fullTitle = await textSelector?.evaluate((el) => el.textContent);
  console.log('The title of this blog post is "%s".', fullTitle);

  await browser.close();
})();
