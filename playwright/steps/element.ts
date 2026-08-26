import { Given, When, Then } from "@cucumber/cucumber"
import { expect } from "@playwright/test"

import { page } from "./hook"
import { getListElement, getPopupElement, getTaskElement } from "./function"

Given("la tâche {string} n'est pas terminé", async function(text: string) {
    const taskElement = getTaskElement(text)
    const doneMarkElement = taskElement.getByTestId("doneMarkElement")

    await expect(doneMarkElement).not.toBeInViewport()
})

When("il n'y a aucune liste de créée", async function() {
    const listingElement = page.getByTestId("listingListElement")
    const listNumber = await listingElement
        .getByTestId("listElement")
        .count()

    expect(listNumber).toBe(0)
})

When("il n'y a aucune tâche de créée", async function() {
    const taskListingElement = page.getByTestId("listingTaskElement")
    const taskNumber = await taskListingElement
        .getByTestId("")
        .count()

    expect(taskNumber).toBe(0)
})

When("je sélectionne la liste {string}", async function(text: string) {
    const listLocator = getListElement(text)

    await listLocator.click()
})

When("je n'est pas sélectionné de liste", async function() {
    const localStorageSelectedListId = await page.evaluate(() => localStorage.getItem("selectedList"))

    expect(localStorageSelectedListId).toBeNull()
})

Then("la liste {string} est visible dans le listage", async function(text: string) {
    const listLocator = getListElement(text)

    await expect(listLocator).toBeInViewport()
})

Then("la liste {string} n'est pas visible dans le listage", async function(text: string) {
    const listLocator = getListElement(text)

    await expect(listLocator).not.toBeInViewport()
})

Then("la popup {string} est visible", async function(text: string) {
    const popupElement = getPopupElement(text)

    await expect(popupElement).toBeInViewport()
})

Then("la popup {string} n'est pas visible", async function(text: string) {
    const popupElement = getPopupElement(text)

    await expect(popupElement).not.toBeInViewport()
})

Then("le listage des tâches de la liste est visible", async function() {
    const taskListingElement = page.getByTestId("listingTaskElement")

    await expect(taskListingElement).toBeInViewport()
})

Then("le formulaire d'ajout d'une tâche est visible", async function() {
    const taskFormElement = page.getByTestId("taskFormElement")

    await expect(taskFormElement).toBeInViewport()
})

Then("le formulaire d'ajout d'une tâche n'est pas visible", async function() {
    const taskFormElement = page.getByTestId("taskFormElement")
    
    await expect(taskFormElement).not.toBeInViewport()
})

Then("la tâche {string} est visible", async function(text: string) {
    const taskElement = getTaskElement(text)

    await expect(taskElement).toBeInViewport()
})

Then("la tâche {string} n'est pas visible", async function(text: string) {
    const taskElement = getTaskElement(text)

    await expect(taskElement).not.toBeInViewport()
})

Then("la popup d'option de la tâche est visible", async function() {
    const popoverElement = page.getByTestId("optionPopoverElement")

    await expect(popoverElement).toBeInViewport()
})

Then("la tâche {string} est terminé", async function(text: string) {
    const taskElement = getTaskElement(text)
    const doneMarkElement = taskElement.getByTestId("doneMarkElement")

    await expect(doneMarkElement).toBeInViewport()
})