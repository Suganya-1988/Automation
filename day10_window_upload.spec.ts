import { expect, test } from '@playwright/test'
import { TIMEOUT } from 'dns/promises';
/**
 * Automate window using Playwright. 
 */
test(`Handling multiple windows`, async ({ context, page }) => {
    await page.goto("https://login.salesforce.com/");
    await page.locator("#username").fill("suganya@testleaf.com");
    await page.locator("#password").fill("Test@12345");
    await page.locator("#Login").click();

    //Concurrent promise
    const [multipleWindows] = await Promise.all([
        context.waitForEvent("page"),
        await page.locator("[title='Learn More']").click()
    ])

    //Get the pages and count

    await multipleWindows.waitForTimeout(3000);
    const allPages = multipleWindows.context().pages()
    console.log(allPages.length);


    //Using index
    let webPage: any;
    for (let index = 0; index < allPages.length; index++) {
        const pageUrl = await allPages[index].url();
        console.log(`The url of the page: ${pageUrl}`);
        if (pageUrl === 'https://exelatechnology-dev-ed.develop.my.salesforce.com/HelpAndTrainingDoor?version=2&resource=https://www.salesforce.com/products/platform/products/mysalesforce/') {
            webPage = allPages[index]
        }
    }

    await webPage.bringToFront();
    webPage.locator("button").getByText("Confirm").click()
    await webPage.waitForTimeout(3000);


    //Get the Url and title 
    allPages.forEach(async pageTitle => {
        console.log("Url", pageTitle.url());
        console.log("Title:", await pageTitle.title());

    })
    await expect.soft(webPage).toHaveURL("https://www.salesforce.com/service/cloud/")

    //Testleaf application for window handling
    const pageone = await context.newPage()
    pageone.goto("https://leafground.com/window.xhtml")

    const [testpag] = await Promise.all([
        context.waitForEvent("page"),
        await pageone.getByText("Open", { exact: true }).click()
    ])
    await testpag.waitForTimeout(3000);
    const allPagesTestleaf = testpag.context().pages()
    console.log(allPagesTestleaf.length);

    allPagesTestleaf.forEach(async pageTitleAll => {
        console.log(pageTitleAll.url());
        console.log(await pageTitleAll.title());
    })
    await testpag.bringToFront();
    await expect.soft(testpag).toHaveTitle("Dashboard")

})

/**
 * Handling multiple windows in leads
 */

test.only('Handling multiple windoes and tabs', async ({ page, context }) => {
    page.goto("http://leaftaps.com/opentaps/control/main")
    await page.fill("#username", "Demosalesmanager")
    await page.fill("#password", "crmsfa")
    await page.click(".decorativeSubmit")
    await page.click(".crmsfa")
    await page.locator("a").getByText("Leads").click()
    await page.locator("a").getByText("Merge Leads").click()
    await page.waitForTimeout(5000)

    //From leads
    const [fromPage] = await Promise.all([
        context.waitForEvent("page"),
        await page.locator("img[src*='fieldlookup.gif']").first().click()
    ])
    const fromPages = fromPage.context().pages()
    console.log(fromPages.length);
    leadPage(fromPages)
    await page.bringToFront()
    await page.waitForTimeout(5000)

    //To leads
    const [toPage] = await Promise.all([
        context.waitForEvent("page"),
        await page.locator("img[src*='fieldlookup.gif']").last().click()
    ])
    const toPages = toPage.context().pages()
    console.log(toPages.length);
    leadPage(toPages)
    await page.bringToFront()

    //Method to access the lead new page
    let pageone: any;
    function leadPage(windowpage) {
        windowpage.forEach(async newTab => {
            console.log(newTab.url());
            const title = await newTab.title({ timeout: 3000 })
            console.log(title);
            if (title === "Find Leads") {
                await newTab.bringToFront()
                await newTab.waitForTimeout(3000)
                await newTab.locator(".linktext").first().click()
            }

        })

    }


})

