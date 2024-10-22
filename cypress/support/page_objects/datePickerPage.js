function selectDayFromCurrent(day) {
    let date = new Date()
    date.setDate(date.getDate() + day)
    let futureDay = date.getDate()
    let futureMonth = date.toLocaleDateString('en-US', {month: 'short'})
    let futureYear = date.getFullYear()
    cy.log('futureDay=',{futureDay})
    cy.log('futureMonth=',{futureMonth})
    cy.log('futureYear=',{futureYear})
    let dateToAssert = `${futureMonth} ${futureDay}, ${futureYear}`

    cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute => {
        if(!dateAttribute.includes(futureMonth) || !dateAttribute.includes(futureYear)) {
            cy.get('[data-name="chevron-right"]').click()
            selectDayFromCurrent(day)
        } else {
            cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
        }
    })
    return dateToAssert
}

export class DatePickerPage{

    selectCommonDatePickerDateFromToday(dayFromToday) {
        cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
            cy.wrap(input).click()
            const dateToAssert = selectDayFromCurrent(dayFromToday)
            cy.wrap(input).invoke('prop', 'value').should('equal', dateToAssert)
            cy.wrap(input).should('have.value', dateToAssert)
        })  
    }

    selectDatePickerWithRangeFromToday(firstDay, secondDay) {
        cy.contains('nb-card', 'Datepicker With Range').find('input').then( input => {
            cy.wrap(input).click()
            let dateToAssertFirst = selectDayFromCurrent(firstDay)
            let dateToAssertSecond = selectDayFromCurrent(secondDay)
            const finalDate = dateToAssertFirst + ' - ' + dateToAssertSecond
            cy.wrap(input).invoke('prop', 'value').should('equal', finalDate)
            cy.wrap(input).should('have.value', finalDate)
        })  
    }
}

export const onDatePickerPage = new DatePickerPage()