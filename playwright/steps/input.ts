import { Then, When } from "@cucumber/cucumber"
import { expect } from "@playwright/test"

import { page } from "./hook"

When("je saisis {string} dans le champs possédant l'ID {string}", async function(text: string, elementTestID: string) {
    const inputElement = page.getByTestId(elementTestID)

    await inputElement.clear()
    await inputElement.fill(text)
    await inputElement.blur()
})

Then("le champs possédant l'ID {string} est visible", async function(elementTestID: string) {
    await expect(page.getByTestId(elementTestID)).toBeInViewport()
})

Then("le champs possédant l'ID {string} n'est pas visible", async function(elementTestID: string) {
    await expect(page.getByTestId(elementTestID)).not.toBeInViewport()
})

Then("le champs possédant l'ID {string} est actif", async function(elementTestID: string) {
    await expect(page.getByTestId(elementTestID)).toBeEnabled()
})

Then("le champs possédant l'ID {string} n'est pas actif", async function(elementTestID: string) {
    await expect(page.getByTestId(elementTestID)).toBeDisabled()
})