import { When } from "@cucumber/cucumber"
import { page } from "./hook"

When("je valide le champs possédant l'ID {string}", async function(elementTestID: string) {
    await page.getByTestId(elementTestID).focus()
    await page.keyboard.press("Enter")
})