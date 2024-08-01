import { expect, test } from '@playwright/test'
/**
 * Task 1
 */
async function login({ page }) {
    await page.goto("http://leaftaps.com/opentaps/control/main")
    await page.fill("#username", 'Demosalesmanager')
    await page.fill("#password", "crmsfa");
    await page.click(".decorativeSubmit")
    await page.locator("[src='/opentaps_images/integratingweb/crm.png']").click();
    await expect(page.getByText("Leads", { exact: true })).toBeVisible();
    await page.locator("//a[text()='Leads']").click();
}

test('Create the Lead', async ({ page }) => {
    await login({ page });
    await page.getByText("Create Lead").click();
    await page.locator("#createLeadForm_companyName").fill("HOV")
    await page.locator("#createLeadForm_firstName").fill("Suganya")
    await page.locator("#createLeadForm_lastName").fill("N")
    await page.locator("#createLeadForm_personalTitle").fill("Testleaf")
    await page.fill("#createLeadForm_generalProfTitle", "Testleaf")
    await page.locator("#createLeadForm_departmentName").fill("IT")
    await page.locator("[name='annualRevenue']").fill("100000")
    await page.locator("#createLeadForm_primaryPhoneNumber").fill("9876543210")
    await page.locator("[value='Create Lead']").click();
    await expect(page.locator("#viewLead_companyName_sp")).toContainText("HOV");
    await expect(page.locator("#viewLead_firstName_sp")).toContainText("Suganya");
    await expect(page.locator("#viewLead_lastName_sp")).toContainText("N")
    await expect(page.locator("#viewLead_statusId_sp")).toContainText("")
    console.log(await page.title());
})
/**
 * Task 2
 */
test("Edit the Lead", async ({ page }) => {
    await login({ page })
    await page.locator("a").getByText("Find Leads").click();
    await page.locator("#x-form-el-ext-gen248 [name='firstName']").fill("Suganya", { timeout: 30000 })
    await page.locator("button").getByText("Find Leads").click()
    await page.locator("div[id*='ext-gen'] .linktext").first().click()
    await page.locator("[class='subMenuButton']").getByText("Edit").click();
    await page.locator("#updateLeadForm_companyName").clear();
    await page.locator("#updateLeadForm_companyName").fill("HOVedit");
    await page.locator("#updateLeadForm_annualRevenue").clear()
    await page.locator("#updateLeadForm_annualRevenue").fill("123")
    await page.locator("#updateLeadForm_departmentName").fill("CSE")
    await page.locator("#updateLeadForm_description").fill("Edit the lead")
    await page.click("[value='Update']")
    await expect(page.locator("#viewLead_companyName_sp")).toContainText("HOVedit");
    await expect(page.locator("#viewLead_annualRevenue_sp")).toContainText("$123");
    await expect(page.locator("#viewLead_departmentName_sp")).toContainText("CSE");
    await expect(page.locator("#viewLead_description_sp")).toContainText("Edit");
    console.log(await page.title())
})

test('Create account in salesforce', async ({ page }) => {
    await page.goto("https://login.salesforce.com/")
    await page.getByLabel("Username").fill("suganya@testleaf.com")
    await page.getByLabel("Password").fill("Test@12345")
    await page.locator("#Login").click();
    const url = await page.url()
    console.log(`title ${await page.title()}`);
    expect(await page.url()).toContain(url)
    await page.locator("[title='App Launcher']").waitFor()
    await page.locator("[title='App Launcher']").click()
    const app_launcher = await page.locator("h2").getByText("App Launcher");
    await expect(app_launcher).toContainText("App")
    console.log(await app_launcher.textContent());
    await page.locator("button").getByText("View All").click()
    await page.getByPlaceholder("Search apps or items...").fill("Service");
    await page.locator(".al-app-tile-description").nth(0).click()
    await page.locator("[title='Accounts']").click()
    await page.locator("a[title='New']").waitFor()
    await page.locator("a[title='New']").click()
    await page.locator("[name='Name']").fill("123")
    await page.locator("//button[@name='SaveEdit']").click()
    await expect(page.locator("div").getByRole("alert")).toBeVisible();

})