/// <reference types="cypress"/>

describe('setUp', () => {

    it('[SET1] The page should render correctly',() => {
        cy.visit('http://localhost:3003/phenoflow/setUp')
        cy.contains("Set Up")
    })

    it('[SET2] Redirecting links should work',() => {
        cy.contains('contact us').should('have.attr', 'href').and('include', '/contactUs')
    })

    it('[SET3] All boxes should be unchecked when visting the page',() => {
        cy.get('#flexCheckDefault').should('not.be.checked')
    })

    it('[SET4] A checkbox can be checked',() => {
        cy.get('#flexCheckDefault').check().should('be.checked')
    })

    it('[SET5] The page should initially show how to setup with a local data set',() => {
        cy.contains('Add your local data set').should('be.visible')
    })

    it('[SET6] The user should be able to change the setUp for an external connector such as IB2B',() => {
        cy.get('select').select('1')
    })

    it('[SET7] The select button correctly changes the setUp information according to the user input',() => {
        cy.contains('IB2B connector setup').should('be.visible')
    })

    it('[SET8] Other information is hidden when needed',() => {
        cy.contains('Add your local data set').should('not.be.visible')
    })






});