import dotenv from "dotenv"
import {
    After,
    AfterAll,
    Before,
    BeforeAll
} from "@cucumber/cucumber"
import {
    type Browser,
    type Page,
    type BrowserContext,
    firefox,
    chromium,
    expect
} from "@playwright/test"

export let page: Page
let browser: Browser
let context: BrowserContext

dotenv.config()

BeforeAll(async function() {
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

    context = await browser.newContext()
    page = await context.newPage()
})

Before({ tags: "@Open_browser" }, async  function() {
    context = await browser.newContext()
    page = await context.newPage()
})

Before({ tags: "@Navigation_page_connexion" }, async function() {
    await page.goto(process.env.BASE_URL as string)
    
    await expect(page.getByTestId("bodyPage")).toBeInViewport()

    await page.getByTestId("loginButton").click()

    await expect(page).toHaveTitle("Connexion")
    
    await expect(page.getByTestId("loginFormSection")).toBeInViewport()
})

Before({ tags: "@Navigation_page_inscription" }, async function() {
    await page.goto(process.env.BASE_URL  as string)
    
    await expect(page.getByTestId("bodyPage")).toBeInViewport()

    await page.getByTestId("registerButton").click()

    await expect(page).toHaveTitle("Inscription")
    
    await expect(page.getByTestId("registerFormSection")).toBeInViewport()
})

After({tags: "@AfterScenario"}, async function() {
    await page.close()
    await context.close()
})

AfterAll(async function() {
    await browser.close()
})