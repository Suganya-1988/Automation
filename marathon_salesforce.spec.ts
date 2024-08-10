import { expect, test } from '@playwright/test'
import { log } from 'console'

const url = "https://login.salesforce.com/"
const userName = "suganya@testleaf.com"
const password = 'Test@12345'
const salution = "Mx."
const caseFirstName = "Suganya"
const caseLastName = "Shree"
const accName = "Sugan"
const accNumber = "2324"
const rating = "Hot"
const status = "New"
const statusUpdated = "Escalated"
const caseOrigin = "Email"
const priority = "High"
const subject = "Product Return Request"
const description = "Requesting a return for a defective product’"
const share = "Feedback"
const userid = "shree suganya"
const company = "Tech"
const Opportunity = "HOV"
const firstName = "Lead"
const lastName = "one"

test('Create and verify a New Case in Chatter', async ({ page }) => {
    await page.goto(url)
    await page.locator("#username").fill(userName)
    await page.locator("#password").fill(password)
    await page.locator("#Login").click()
    await page.locator(".slds-icon-waffle").click()
    await page.locator("[aria-label='View All Applications']").click()
    await page.getByPlaceholder("Search apps or items...").fill("Service")
    await page.locator("[title='Manage customer service with accounts, contacts, cases, and more']").click()
    await page.locator("[title='Cases']").click()
    await page.locator("a").getByText("New").click()
    await page.getByPlaceholder("Search Contacts...").pressSequentially("sug")
    await page.locator("[role='option']").last().click()
    await page.locator("(//label[text()='Salutation']//following::button[@class='slds-combobox__input slds-input_faux fix-slds-input_faux slds-combobox__input-value']/span[text()='--None--'])[1]").click()
    await page.locator("//lightning-base-combobox-item[@data-value='" + salution + "']").click()
    await page.getByPlaceholder("First Name").fill(caseFirstName)
    await page.getByPlaceholder("Last Name").fill(caseLastName)
    await page.locator("[name='SaveEdit']").last().click()
    await page.locator("//span[@class='toastMessage slds-text-heading--small forceActionsText']").waitFor()
    console.log(await page.locator("//span[@class='toastMessage slds-text-heading--small forceActionsText']").textContent());
    await expect.soft(page.locator("//span[@class='toastMessage slds-text-heading--small forceActionsText']")).toBeVisible();
    await page.waitForTimeout(3000);
    await page.getByPlaceholder("Search Accounts...").click()
    await page.locator("[title='New Account']").click()
    await page.locator("//label[text()='Account Name']//following-sibling::div[@type='text']/input").fill(accName)
    await page.locator("[name='AccountNumber']").fill(accNumber);
    await page.locator("button[aria-label='Rating']").click()
    await page.locator("[title='" + rating + "']").click()
    await page.locator("[name='SaveEdit']").last().click()
    await page.locator(".toastMessage").waitFor()
    await expect.soft(page.locator(".toastMessage")).toBeVisible()
    console.log(await page.locator(".toastMessage").textContent());
    await page.waitForTimeout(2000);
    await page.locator("button[data-value='New']").click()
    await page.locator("span[title='" + status + "']").click()
    await page.locator("button[aria-label='Priority']").click()
    await page.locator("[title='" + priority + "']").click()
    await page.locator("button[aria-label='Case Origin']").click()
    await page.locator("[data-value='" + caseOrigin + "']").click()
    await page.locator("[name='Subject']").fill(subject);
    await page.locator(".slds-textarea").first().fill(description)
    await page.locator("[name='SaveEdit']").click()
    console.log(await page.locator(".toastMessage").textContent());
    await expect.soft(page.locator(".toastMessage")).toBeVisible();
    await page.locator("button[name='Edit']").last().click()
    await page.locator("button[data-value='New']").click()
    await page.locator("span[title='" + statusUpdated + "']").click()
    await page.locator("[name='SaveEdit']").click()
    let chatter = await page.locator(".toastMessage").textContent()
    let splitvalue = chatter?.split(" ")
    let caseId;
    for (let i = 0; i < splitvalue?.length - 1; i++) {
        if (i == 1) {
            caseId = splitvalue[i].substring(2, splitvalue[i].length - 1)
            console.log(caseId);
        }
    }
    await expect.soft(page.locator(".toastMessage")).toBeVisible()
    await page.waitForTimeout(3000);
    await page.locator("span").getByText("Share an update...").click()
    await page.locator("[data-placeholder='Share an update...']").fill(share)
    await page.locator("//button[text()='Share']").click()
    await page.locator("//span[text()='" + userid + "']").first().isVisible()
    await expect(page.locator(".feedBodyInner")).toContainText(share)
    await page.waitForTimeout(1000);
    await page.locator("//span[text()='Actions for this Feed Item ']").first().click()
    await page.locator("span").getByText("Like on Chatter").click()
    const postlike = page.locator("span.toastMessage")
    await postlike.waitFor()
    await expect.soft(postlike).toBeVisible()
    console.log(await postlike.textContent());
    await page.locator("//span[text()='Chatter']").click()
    const liked = await page.locator("//span[text()='Liked']").first().textContent()
    expect.soft(liked).toContain("Liked")
    const post = page.locator("//span[contains(text(),'" + caseId + "')]")
    await expect.soft(post).toBeVisible()

})

test('Verify Lead Creation and Conversion to Opportunity', async ({ page }) => {
    await page.goto(url)
    await page.locator("#username").fill(userName)
    await page.locator("#password").fill(password)
    await page.locator("#Login").click()
    await page.locator(".slds-icon-waffle").click()
    await page.locator("[aria-label='View All Applications']").click()
    await page.getByPlaceholder("Search apps or items...").fill("Marketing")
    await page.locator("[title='Track sales and marketing efforts with CRM objects.']").click()
    await page.locator("[title='Leads']").click()
    await page.locator("a[title='New']").click()
    await page.locator("(//label[text()='Salutation']//following::button[@class='slds-combobox__input slds-input_faux fix-slds-input_faux slds-combobox__input-value']/span[text()='--None--'])[1]").click()
    await page.locator("//lightning-base-combobox-item[@data-value='" + salution + "']").click()
    await page.getByPlaceholder("First Name").fill(firstName)
    await page.getByPlaceholder("Last Name").fill(lastName)
    await page.locator("[name='Company']").fill(company)
    await page.locator("[name='SaveEdit']").click()
    const leadSuccess = page.locator(".toastMessage")
    console.log(leadSuccess.textContent());
    await expect.soft(leadSuccess).toContainText("Lead")
    await page.locator("//button/span[text()='Show more actions']").click()
    await page.locator("[title='Convert']").click()
    await page.locator("span[title='Opportunity']").last().click()
    await page.locator("//span[text()='Opportunity Name']//following::input").first().fill("")
    await page.locator("//span[text()='Opportunity Name']//following::input").first().fill(Opportunity)
    await page.locator("button").getByText("Convert").click()
    const convertMessage = await page.getByText("Your lead has been converted").textContent()
    console.log(convertMessage);
    expect.soft(convertMessage).toContain("Your lead has been converted")
    await page.getByText("Go to Leads").click()
    const concat = firstName.concat(" " + lastName)
    console.log(concat);
    await page.locator("[name='Lead-search-input']").fill(concat)
    await page.keyboard.press("Enter")
    const noDetail = await page.getByText("No items to display.").textContent()
    console.log(noDetail)
    expect.soft(noDetail).toContain("No items to display.")
    await page.locator("[title='Opportunities']").click()
    await page.locator("[name='Opportunity-search-input']").fill(Opportunity)
    await page.keyboard.press("Enter")
    const expectOpportunity = await page.locator("[data-refid='recordId']").first().textContent()
    console.log(expectOpportunity);
    expect.soft(expectOpportunity).toContain(Opportunity)
})
