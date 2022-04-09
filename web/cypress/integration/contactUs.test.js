/// <reference types="cypress"/>

describe('contactUs', () => {
    it('[CONTACT1] Page correctly render and contains text',() => {
        cy.visit('http://localhost:3003/phenoflow/contactUs')
        cy.contains("Contact Us")
    })

    it('[CONTACT2] The user should not be able to send a form without completing the inputs',() => {
        cy.get('.formBtn').contains("Submit").click()
        cy.contains("Please insert an Email.").should('be.visible')
    })

    it('[CONTACT3] The user should not be able to send a form with an incorect Email',() => {
        cy.get('#formControlInput1').invoke('val', 'alastraselim28')
        cy.get('#formControlInput2').invoke('val', 'Selim')
        cy.get('#formControlInput3').invoke('val', 'Alastra')
        cy.get('#formControlTextarea1').invoke('val', 'TEST')
        cy.get('.formBtn').contains("Submit").click()
        cy.contains("The email is invalid !").should('be.visible')
    })

    it('[CONTACT4] The user should be able to send a form with correct inputs',() => {
        cy.get('#formControlInput1').invoke('val', 'alastraselim28@yahoo.fr')
        cy.get('#formControlInput2').invoke('val', 'Selim')
        cy.get('#formControlInput3').invoke('val', 'Alastra')
        cy.get('#formControlTextarea1').invoke('val', 'TEST')
        cy.get('.formBtn').contains("Submit").click()
        cy.contains("Your message has been sent !").should('be.visible')
    })



});