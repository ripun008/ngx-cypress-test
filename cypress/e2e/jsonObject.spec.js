/// <reference types="cypress" />

describe('json object', ()=> {

    it('json Objects', ()=> {
        cy.openHomePage()

        const simpleObject = { "key": "value", "key2": "value2" }
        const arrayOfValues = ["one", "two", "three"]
        const arrayOfObjects = [ {"key": "value"}, {"key2": "value2"}, {"key3": "value3"}]
        const typesOfDate = { "string": "this is a string", "number": 10}
        const mix = {
            "FirstName": "mark",
            "LastName": "waugh",
            "Age": 35,
            "Students": [
                {
                    "firstName": "Sarah",
                    "lastName": "Winters"
                },
                {
                    "firstName": "Elizabeth",
                    "lastName": "Connors"
                }
            ]
        }
        console.log(simpleObject.key2)
        console.log(simpleObject["key"])
        console.log(arrayOfValues[1])
        console.log(arrayOfObjects[1].key2)
        console.log(mix.FirstName)
        console.log(mix.Students[1].firstName)
    })
})