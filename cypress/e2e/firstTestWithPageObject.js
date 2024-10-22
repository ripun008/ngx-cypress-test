import { onDatePickerPage } from "../support/page_objects/datePickerPage"
import { onFormsLayoutsPage } from "../support/page_objects/formLayoutsPage"
import { navigationPage } from "../support/page_objects/navigationPage"

describe('Test with page objects', () => {
    beforeEach('open application', () => {
        cy.openHomePage() // see commands.js
    })

    it('verify navigation across app', () => {
        navigationPage.formsLayoutPage()
        navigationPage.datePickerPage()
        navigationPage.smartTablePage()
        navigationPage.toasterPage()
    })

    it.only('should submit inline & basic form & select tomorrow date in the calender', () => {
        navigationPage.formsLayoutPage()
        onFormsLayoutsPage.submitInlineFormWithNameAndEmail('mark waugh', 'test@test.com')
        onFormsLayoutsPage.submitBasicForm('test@test1.com', '1234')
        navigationPage.datePickerPage()
        onDatePickerPage.selectCommonDatePickerDateFromToday(5)
        onDatePickerPage.selectDatePickerWithRangeFromToday(7,14)
    })
})