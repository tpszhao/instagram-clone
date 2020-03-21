/// <reference types="Cypress" />
const searchValue = "cats"

describe("example test", ()=>{
    it("go to explore page", ()=>{
        cy.visit("localhost:3000");
        cy.get('[data-cy=explore_page_icon]').click();
        cy.location().should(loc =>{
            expect(loc.pathname).to.include("explore")
        })
    })

    it(`search for ${searchValue}`,()=>{
        cy.get('[data-cy=search_input]')
            .type(searchValue)
            .should('have.value',searchValue)
            .type('{enter}')
        cy.location().should(loc =>{
            expect(loc.pathname).to.include(searchValue)
        })
    })

    


})