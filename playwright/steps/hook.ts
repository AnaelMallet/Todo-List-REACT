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
import { execSync } from "child_process"

export let page: Page
let browser: Browser
let context: BrowserContext

dotenv.config()

BeforeAll(async function() {
    switch(process.env.BROWSER) {
        case "firefox":
            browser = await firefox.launch()
            break
        case "chromium":
            browser = await chromium.launch()
            break
        default:
            throw new Error("Browser not found")
    }

    context = await browser.newContext()
    page = await context.newPage()
})

Before({ tags: "@Open_browser" }, async function() {
    context = await browser.newContext()
    page = await context.newPage()

    await page.goto(process.env.BASE_URL as string)

    await expect(page).toHaveTitle("Todo-list-REACT")
    await expect(page.getByTestId("bodyPage")).toBeInViewport()
})

Before({ tags: "@Navigation_login_page" }, async function() {
    await page.getByTestId("loginButton").click()

    await expect(page).toHaveTitle("Connexion")
    await expect(page.getByTestId("loginFormSection")).toBeInViewport()
})

Before({ tags: "@Navigation_register_page" }, async function() {
    await page.getByTestId("registerButton").click()

    await expect(page).toHaveTitle("Inscription")
    await expect(page.getByTestId("registerFormSection")).toBeInViewport()
})

Before({ tags: "@Login" }, async function() {
    await page.getByTestId("emailLoginInput").fill("test@test.fr")
    await page.getByTestId("passwordLoginInput").fill("P@ssw0rdT3st!ng")
    await page.getByTestId("submitLoginButton").click()

    await expect(page).toHaveTitle("Todo-list-REACT")

    const localStorageToken = await page.evaluate(() => localStorage.getItem("token"))
    const localStorageUserId = await page.evaluate(() => localStorage.getItem("userId"))

    expect(localStorageToken).not.toBeNull()
    expect(localStorageUserId).not.toBeNull()
})

Before({ tags: "@Navigation_profile_page" }, async function() {
    await page.getByTestId("profileButton").click()

    await expect(page).toHaveTitle("Utilisateur")
})

After({tags: "@Close_browser"}, async function() {
    await page.close()
    await context.close()
})

After({ tags: "@Logout" }, async function() {
    if (page.url() !== "http://localhost:3000/") {
        await page.goBack()
    }

    await page.getByTestId("logoutButton").click()

    const localStorageToken = await page.evaluate(() => localStorage.getItem("token"))
    const localStorageUserId = await page.evaluate(() => localStorage.getItem("userId"))

    expect(localStorageToken).toBeNull()
    expect(localStorageUserId).toBeNull()
})

AfterAll(async function() {
    await browser.close()

    if (process.env.CI === "false") {
        execSync(`docker exec postgres psql -U postgres -d postgres -c "DELETE FROM tasks; DELETE FROM lists; DELETE FROM users;"`)
    }
})