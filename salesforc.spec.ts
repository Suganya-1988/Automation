import { chromium, test } from "@playwright/test"
test("Launch the sales force page", async () => {
    const browser = await chromium.launch();
    const browsercontext = await browser.newContext();
    const page = await browsercontext.newPage();
    await page.goto("https://login.salesforce.com/");
    await page.locator("#username").fill("suganya@testleaf.com");
    await page.locator("#password").fill("Sudhamalar@12345");
    await page.locator("#Login").click();
    await page.waitForTimeout(10000)
    console.log(`The url ${page.url()}`);
    console.log(`The title ${await page.title()}`);
    await page.close();
    await browsercontext.close();
    await browser.close();
})