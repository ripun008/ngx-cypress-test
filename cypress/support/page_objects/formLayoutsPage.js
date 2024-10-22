
export class FormLayoutsPage {

    submitInlineFormWithNameAndEmail(name, email) {
        cy.contains('nb-card', 'Inline form').find('form').then( form => {
            cy.wrap(form).find('[placeholder="Jane Doe"]').type(name)
            cy.wrap(form).find('[placeholder="Email"]').type(email)
            cy.wrap(form).find('[type="checkbox"]').check({force: true})
            //cy.wrap(form).find('[type="submit"]').click()
            cy.wrap(form).submit() // used to submit 'form' type tags
        })
    }

    submitBasicForm(email, password) {
        cy.contains('nb-card', 'Basic form').find('form').then( form => {
            cy.wrap(form).get("#exampleInputEmail1").click().type(email)
            cy.wrap(form).get("#exampleInputPassword1").click().type(password)
            cy.wrap(form).submit()
        })
    }
} 

export const onFormsLayoutsPage = new FormLayoutsPage()