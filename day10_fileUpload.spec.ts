import { expect, test } from '@playwright/test'
import path from 'path'

test('File upload', async ({ page }) => {
    await page.goto("https://login.salesforce.com/")
    await page.fill("#username", "suganya@testleaf.com")
    await page.fill("#password", "Test@12345")
    page.locator("#Login").click()
    await page.locator("[title='App Launcher']").click()
    await page.locator("[aria-label='View All Applications']").click()
    await page.getByPlaceholder("Search apps or items...").fill("Accounts")
    await page.locator("//mark[text()='Accounts']").click()
    await page.locator("a[title='New']").click()
    await page.locator("[name='Name']").fill("suganya")
    await page.locator(".slds-combobox__input").first().click()
    await page.locator("[data-value='Warm']").click()
    await page.locator(".slds-combobox__input").nth(2).click()
    await page.locator("[title='Prospect']").click()
    await page.locator(".slds-combobox__input").nth(3).click()
    await page.locator("[data-value='Public']").click()
    await page.locator(".slds-combobox__input").nth(4).click()
    await page.locator("[title='Banking']").click()
    await page.locator("[name='SaveEdit']").click()
    //Verify the success message after account creation
    console.log(await page.locator(".toastMessage").textContent());
    await expect.soft(page.locator(".toastMessage")).toBeVisible();
    const file = "Upload"
    const upload = page.locator("//span[@class='slds-file-selector__button slds-button slds-button_neutral']").last()
    await upload.setInputFiles('C:\\Playwright Workspace\\playwright latest\\tests\\' + file + '.pdf')
    await page.locator("//span[text()='Done']").click()
    const result = await page.locator("[title='" + file + "']").textContent()
    console.log(result);
    //Verify the upload file name 
    expect.soft(result).toContain(file)
})

test('Uploading and downloading the file', async ({ page, context }) => {
    //Upload the document
    const filenew = "Upload1"
    await page.goto("https://the-internet.herokuapp.com/upload")
    const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        await page.locator("//div[@id='drag-drop-upload']").click()
    ]);
    await fileChooser.setFiles([`C:\\Playwright Workspace\\playwright latest\\tests\\Upload1.png`]);
    const fileUpload = page.locator(".dz-filename span").first()
    console.log(await fileUpload.textContent());
    await expect.soft(fileUpload).toContainText(filenew)

    //Download the file
    const newPage = await context.newPage()
    newPage.goto("https://the-internet.herokuapp.com/download")
    const [fileDownload] = await Promise.all([
        newPage.waitForEvent("download"),
        await newPage.locator("//a[text()='testFile.docx']").click()
    ])
    await fileDownload.saveAs(path.join("downloads/" + fileDownload.suggestedFilename()))
    const filename = await newPage.locator("//a[text()='testFile.docx']").textContent()
    const savedName = "testFile.docx"
    expect.soft(filename).toContain(savedName)
})