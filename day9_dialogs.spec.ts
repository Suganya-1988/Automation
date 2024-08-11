import { expect, test } from '@playwright/test'

test('Handle the dialogs', async ({ page }) => {
    await page.goto("https://www.w3schools.com/js/tryit.asp?filename=tryjs_confirm")
    const framese = page.frames()
    console.log(framese.length);
    const framelocators = page.frameLocator("iframe#iframeResult")
  
  //Event listener
    page.on("dialog", async dialog => {
        const message = dialog.message()
        console.log(message);
        const type = dialog.type()
        console.log(type);
        if (type === "confirm") {
            await dialog.accept()
        } else if (type === "prompt") {
            await dialog.accept("Ranjini");
        } else {
            await dialog.dismiss();
        }
    })

    //confirm alert
    await framelocators.locator("//button[text()='Try it']").click()
    const message = await framelocators.locator("#demo").textContent()
    console.log(message);
    await expect.soft(framelocators.locator("#demo")).toContainText(message)

})

test('Handle the frames', async ({ page }) => {
    page.goto("https://leafground.com/frame.xhtml")
    const frameone = page.frameLocator("[src='default.xhtml']")
    const frametwo = page.frameLocator("[src='page.xhtml']").frameLocator("[name='frame2']")
    const framethree = page.frameLocator("[src='nested.xhtml']")
    //Interacting with frame-one
    await frameone.locator("[id='Click']").first().click()
    const message = await frameone.locator("[id='Click']").first().textContent()
    console.log(message)
    await expect.soft(frameone.locator("[id='Click']").first()).toContainText(message)

    //Interacting with frame-two 
    const nestedFrameheading = await page.locator("(//div[@class='card']/h5)[3]").textContent()
    console.log(nestedFrameheading)
    await frametwo.locator("(//button[normalize-space()='Click Me'])").last().click()
    const nestedMessage = await frametwo.locator("[id='Click']").last().textContent()
    console.log(nestedMessage)
    await expect.soft(frametwo.locator("[id='Click']").last()).toContainText(nestedMessage)

    //Interacting with frame-three
    const countFrame = await framethree.locator("//button[text()='Count Frames']").textContent()
    console.log(countFrame);

    //count of frame
    const f = page.frames()
    console.log(f.length);
})