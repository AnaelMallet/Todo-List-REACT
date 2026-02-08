import { When } from "@cucumber/cucumber"

import { page } from "./hook"

When("je clique sur le bouton possédant l'ID {string}", async function (elementTestID) {
    await page.getByTestId(elementTestID).click()
})