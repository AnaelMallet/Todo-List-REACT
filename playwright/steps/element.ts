import { Then, When } from "@cucumber/cucumber"

import { page } from "./hook"
import { expect } from "@playwright/test"

When("il n'y a aucune liste de créée", async function() {
    const listingElement = page.getByTestId("listingElement")
    const listNumber = await listingElement
        .getByTestId("listElement")
        .count()

    expect(listNumber).toBe(0)
})

Then("la liste {string} est visible dans le listage", async function(text: string) {
    const listingElement = page.getByTestId("listingElement")
    const listLocator = listingElement
        .getByTestId("listElement")
        .filter({ hasText: text })
        .last()

    await expect(listLocator).toBeInViewport()
})

Then("la liste {string} n'est pas visible dans le listage", async function(text: string) {
    const listingElement = page.getByTestId("listingElement")
    const listLocator = listingElement
        .getByTestId("listElement")
        .filter({ hasText: text })
        .last()

    await expect(listLocator).not.toBeInViewport()
})

Then("la popup {string} est visible", async function(text: string) {
    const popupElement = page
        .getByTestId("popupElement")
        .filter({ hasText: text })

    await expect(popupElement).toBeInViewport()
})

Then("la popup {string} n'est pas visible", async function(text: string) {
    const popupElement = page
        .getByTestId("popupElement")
        .filter({ hasText: text })

    await expect(popupElement).not.toBeInViewport()
})