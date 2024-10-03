/// <reference types="cypress" />

describe('First test suite', () => {

    it('first test', () => {

        cy.visit('/') // visits baseURL defined in cypress.config file
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // by Tag name
        cy.get('input')

        // by ID, indicated by hash
        cy.get('#inputEmail1')

        // by class value, indicated by dot
        cy.get('.input-full-width')

        // by attribute name. attributes are enclosed in square brackets
        cy.get('[fullwidth]')

        // by attribute and value
        cy.get('[placeholder="Email"]')

        // by entire class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        // by two attributes - don't add any space here
        cy.get('[placeholder="Email"][fullwidth]')

        // by tag, attribute, id & class
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        // by Cypress test id
        cy.get('[data-cy="imputEmail1"]')
    })

    it('second test', () => {

        cy.visit('/') // visits baseURL defined in cypress.config file
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // Theory
        // get() - find elements on page by locator globally
        // find() - find child elements by locator
        // contains() - find HTML text & by text and locator

        cy.contains('[status="warning"]', 'Sign in') // second sign in button
        cy.contains('nb-card', 'Horizontal form').find('button') // finds child element from parent element
        cy.contains('nb-card', 'Horizontal form').contains('Sign in')
        cy.contains('nb-card', 'Horizontal form').get('button') // will find all buttons on the page

        // Cypress chaining in DOM
        cy.get('#inputEmail3')
        .parents('form')
        .find('button').should('contain', 'Sign in')
        .parents('form')
        .find('nb-checkbox')
        .click()
    })

    it('save subject of the command', () => {
        cy.visit('/') // visits baseURL defined in cypress.config file
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // CANT DO LIKE THIS as Cypress works asynchronously
        // const usingTheGrid = cy.contains('nb-card', 'Using the Grid')
        // usingTheGrid.find('[for="inputEmail1"]').should('contain', 'Email')
        // usingTheGrid.find('[for="inputPassword2"]').should('contain', 'Password')

        // Using Cypress alias which is global and can be used anywhere later in the test also
        cy.contains('nb-card', 'Using the Grid').as('usingTheGrid')
        cy.get('@usingTheGrid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.get('@usingTheGrid').find('[for="inputPassword2"]').should('contain', 'Password')

        // Using Cypress then() method
        cy.contains('nb-card', 'Using the Grid').then(usingTheGridForm => {
            // use wrap to convert from JQuery to Cypress chainable method
            // this is local to this block only
            cy.wrap(usingTheGridForm).find('[for="inputEmail1"]').should('contain', 'Email')
            cy.wrap(usingTheGridForm).find('[for="inputPassword2"]').should('contain', 'Password')
        })
    })

    it('extract text values', () => {
        cy.visit('/') // visits baseURL defined in cypress.config file
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // 1
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

        // 2 - use target locator as a JQuery object and then use text()
        cy.get('[for="exampleInputEmail1"]').then( label => {
           const labelText = label.text()
           // Chai assertion
           expect(labelText).to.equal('Email address')
           // use wrap to utilize Cypress assertion
           cy.wrap(labelText).should('contain', 'Email address')
        })

        // 3 - using invoke()
        cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
            expect(text).to.equal('Email address')
        })

        // 4 using invoke to get attribute
        cy.get('[for="exampleInputEmail1"]').invoke('attr', 'class').then( classValue => {
            expect(classValue).to.equal('label')
        })

        // 5 invoke property & its value (useful for getting values from textfields)
        cy.get('#exampleInputEmail1').click().type('test@example.com')
        cy.get('#exampleInputEmail1').invoke('prop', 'value').should('equal', 'test@example.com')
        cy.get('#exampleInputEmail1').invoke('prop', 'value').then( propertyValue => {
            expect(propertyValue).to.equal('test@example.com')
        })
        cy.get('#exampleInputEmail1').should('contain.value', 'test@example.com')
    })

    it('radio buttons', () => {
        cy.visit('/') // visits baseURL defined in cypress.config file
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then( radioButtons => {
            // get by index
            // use flag 'force' to interact with elements that are hidden
            cy.wrap(radioButtons).eq(0).check({force: true}).should('be.checked')
            cy.wrap(radioButtons).eq(1).check({force: true})
            cy.wrap(radioButtons).eq(0).should('not.be.checked')
            cy.wrap(radioButtons).eq(2).should('be.disabled')
        })
    })

    it('check boxes', () => {
        cy.visit('/') // visits baseURL defined in cypress.config file
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        // check() will not click if the checkbox is already checked
        cy.get('[type="checkbox"]').check({force: true})
    })

    it('web date pickers', () => {
        cy.visit('/') // visits baseURL defined in cypress.config file
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        let date = new Date()
        date.setDate(date.getDate() + 5)
        let futureDate = date.getDate()
        let dateToAssert = `Oct ${futureDate}, 2024`

        cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
            cy.wrap(input).click()
            cy.get('.day-cell').not('.bounding-month').contains(futureDate).click()
            cy.wrap(input).invoke('prop', 'value').should('equal', dateToAssert)
            cy.wrap(input).should('have.value', dateToAssert)
        })        

        

    })
})