function selectGroupMenuItem(groupName) {
    cy.contains('a', groupName).then( menu => {
        cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then( attr => {
            if(attr.includes('left')) {
                cy.wrap(menu).click()
            }
        })
    })
}

export class NavigationPage {

    formsLayoutPage() {
        selectGroupMenuItem('Form')
        cy.contains('Form Layouts').click()
    }

    datePickerPage() {
        //selectGroupMenuItem('Form')
        cy.contains('Datepicker').click()
    }

    toasterPage() {
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Toastr').click()
    }

    smartTablePage() {
        selectGroupMenuItem('Tables & Data')
        cy.contains('Smart Table').click()
    }

}

export const navigationPage = new NavigationPage()