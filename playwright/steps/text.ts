import { Then } from "@cucumber/cucumber"
import { expect } from "@playwright/test"

import { page } from "./hook"

Then("l'élément possédant l'ID {string} avec le texte {string} est visible", async function(elementTestID: string, text: string) {
    const emailInputErrorTextLocator = page.getByTestId(elementTestID)

    await expect(emailInputErrorTextLocator).toBeInViewport()
    expect(await emailInputErrorTextLocator.innerText()).toBe(text)
})

Then("l'élément possédant l'ID {string} avec le texte {string} n'est pas visible", async function(elementTestID: string, text: string) {
    const emailInputErrorTextLocator = page.getByTestId(elementTestID)

    await expect(emailInputErrorTextLocator).not.toBeInViewport()
})

Then("la notification {string} est visible", async function(text: string) {
    const notificationMessageLocator = page.getByTestId("notificationMessage").filter({ hasText: text }).last()

    await expect(notificationMessageLocator).toBeInViewport()
})