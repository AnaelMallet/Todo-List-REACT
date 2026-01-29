import { After, Before, BeforeAll } from "@cucumber/cucumber"
import {
    type Browser,
    type Page,
    firefox,
    chromium
} from "@playwright/test"

export let page: Page
let browser : Browser

Before(async function() {
    switch(process.env.BROWSER) {
        case "firefox":
            browser = await firefox.launch({ headless: false })
            break
        case "chromium":
            browser = await chromium.launch({ headless: false })
            break
        default:
            throw new Error("Browser not found")
    }

    page = await browser.newPage()
})

After(async function() {
    await page.close()
    await browser.close()
})