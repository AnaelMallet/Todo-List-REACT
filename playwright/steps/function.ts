import { Locator } from "@playwright/test"

import { page } from "./hook"

export function getListElement(text: string): Locator {
    return page.getByTestId("listingListElement")
        .getByTestId("listElement")
        .filter({ hasText: new RegExp(`^${text}$`) })
}

export function getTaskElement(text: string): Locator {
    return page.getByTestId("listingTaskElement")
        .getByTestId("taskElement")
        .filter({ hasText: new RegExp(`^${text}$`) })
}

export function getPopupElement(text: string): Locator {
    return page.getByTestId("popupElement")
        .filter({ hasText: text })
}