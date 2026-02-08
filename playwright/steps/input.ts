import { When } from "@cucumber/cucumber"

import { page } from "./hook"

When("je saisis {string} dans le champs possédant l'ID {string}", async function(text: string, elementTestID: string) {
    const inputElement = page.getByTestId(elementTestID)

    await inputElement.clear()
    await inputElement.fill(text)
    await inputElement.blur()
})