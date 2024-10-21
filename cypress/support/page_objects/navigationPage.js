
export class NavigationPage {

    formsLayoutPage() {
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
    }

    datePickerPage() {
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()
    }
}

export const navigationPage = new NavigationPage()