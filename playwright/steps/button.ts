import { When } from "@cucumber/cucumber"

import { page } from "./hook"
import { getListElement } from "./function"

When("je clique sur le bouton possédant l'ID {string}", async function (elementTestID: string) {
    await page.getByTestId(elementTestID).click()
})

When("je clique sur le bouton possédant l'ID {string} de la liste {string}", async function (elementTestID: string, text: string) {
    const listLocator = getListElement(text)

    await listLocator.getByTestId(elementTestID).click()
})