import { Given, When, Then } from "@cucumber/cucumber"

import { expect } from "@playwright/test"
import dotenv from "dotenv"

import { page } from "./hook"

dotenv.config()

Given("j'accède au site", async function () {
    await page.goto(process.env.BASE_URL)
    
    await expect(page.getByTestId("bodyPage")).toBeInViewport()
})

When("je clique sur le bouton possédent l'ID {string}", async function (elementTestID) {
    page.getByTestId(elementTestID).click()
})

Then("je suis sur la page nommé {string}", async function (titlePage) {
    
    await expect(page).toHaveTitle(titlePage)
})