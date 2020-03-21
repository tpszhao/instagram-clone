describe("example test", ()=>{
    it("go to explore page", ()=>{
        cy.visit("localhost:3000");
        cy.get('[data-cy=explore_page_icon]').click();
        cy.location().should(loc =>{
            expect(loc.pathname).to.include("explore")
        })
    })
})