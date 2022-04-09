/// <reference types="cypress"/>

describe('navbar', () => {

    it('[NAV1] The navbar should display and render the Phenoflow logo',() => {
        cy.visit('http://localhost:3003/phenoflow/')
        cy.get("nav")
    })

    it('[NAV2] The navbar should display the Phenoflow logo which redirects to the home page',() => {
        cy.get('.navbar-brand').should('have.attr', 'href').and('include', '/phenoflow')
    })

    it('[NAV3] The navbar should not collapse for large width pages',() => {
        cy.viewport(1500, 1000)
        cy.get('.navbar-toggler').should('not.be.visible')
    })

    it('[NAV4] The navbar buttons should be directly visible when not collapsed and redirect correctly',() => {
        cy.viewport(1500, 1000)
        cy.get('.nav-link').contains("BROWSE").should('have.attr', 'href').and('include', '/phenotype/all/')
    })

    it('[NAV5] The navbar should collapse for small size screens',() => {
        cy.viewport(500, 500)
        cy.get('.navbar-toggler').should('be.visible')
    })

    it('[NAV6] The navbar should display the navbar buttons when the navbar toggler is clicked on',() => {
        cy.viewport(500, 500)
        cy.get('.navbar-toggler').click()
        cy.get('.nav-link').contains("BROWSE").should('have.attr', 'href').and('include', '/phenotype/all/')
    })

    it('[NAV7] The loggin button should show the login modal when clicked on',() => {
        cy.viewport(1500, 1000)
        cy.get('.nav-link').contains("Login").click()
        cy.get('.modal-content')
    })

    it('[NAV8] The author should be able to connect through the modal',() => {
        cy.viewport(1500, 1000)
        cy.get('#username').invoke('val', 'martinchapma').type("n")
        cy.get('#password').invoke('val', 'password')
        cy.get('.formBtn').click()
        cy.get('.nav-link').contains("Logout").should('be.visible')
    })

    it('[NAV9] The author should see private authors functionalties when logged in',() => {
        cy.viewport(1500, 1000)
        cy.get('.nav-link').contains("DEFINE").should('be.visible')
        cy.get('.nav-link').contains("EDIT").should('be.visible')
    })

    it('[NAV10] The author should be able to logout',() => {
        cy.viewport(1500, 1000)
        cy.get('.nav-link').contains("Logout").click()
    })

    it('[NAV11] The author should not be able to connect with wrong credentials',() => {
        cy.viewport(1500, 1000)
        cy.get('.nav-link').contains("Login").click()
        cy.get('#username').invoke('val', 'martinchap').type("n")
        cy.get('#password').invoke('val', 'passw')
        cy.get('.formBtn').click()
        cy.get('.authCheck').should('be.visible')
        cy.get('.close').click()
    })

    it('[NAV12] The user should not be able to see authors functionalalities',() => {
        cy.viewport(1500, 1000)
        cy.get('.nav-link').contains("DEFINE").should('not.be.visible')
        cy.get('.nav-link').contains("EDIT").should('not.be.visible')
    })

});