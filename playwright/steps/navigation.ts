import { Given, Then } from "@cucumber/cucumber"
import { expect } from "@playwright/test"

import { page } from "./hook"

Given("j'accède au site", async function () {
    await page.goto(process.env.BASE_URL  as string)
    
    await expect(page.getByTestId("bodyPage")).toBeInViewport()
})

Then("je suis sur la page nommé {string}", async function (titlePage) {
    
    await expect(page).toHaveTitle(titlePage)
})

Then("je suis connecté", async function() {
    const localStorageToken = await page.evaluate(() => localStorage.getItem("token"))
    const localStorageUserId = await page.evaluate(() => localStorage.getItem("userId"))

    expect(localStorageToken).not.toBeNull()
    expect(localStorageUserId).not.toBeNull()
})

Then("je suis déconnecté", async function() {
    const localStorageToken = await page.evaluate(() => localStorage.getItem("token"))
    const localStorageUserId = await page.evaluate(() => localStorage.getItem("userId"))

    expect(localStorageToken).toBeNull()
    expect(localStorageUserId).toBeNull()
})