/// <reference types="cypress"/>

let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add("saveLocalStorage", () => {
  Object.keys(localStorage).forEach(key => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add("restoreLocalStorage", () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});

describe('Define', () => {

    beforeEach(() => {
        cy.restoreLocalStorage();
    });
      
      afterEach(() => {
        cy.saveLocalStorage();
    });

    it('[DEFINE1] The page should not render fully if the author is not logged in',() => {
        cy.visit('http://localhost:3003/phenoflow/phenotype/define')
        cy.contains("You have been logout, you will have to login again to use this functionality !").should('be.visible')
    })


    it('[DEFINE2] The page should render fully if the author is logged in',() => {
        cy.visit('http://localhost:3003/phenoflow/phenotype/define')
        cy.viewport(1500, 1000)
        cy.get('.nav-link').contains("Login").click()
        cy.get('#username').invoke('val', 'martinchapma').type("n")
        cy.get('#password').invoke('val', 'password')
        cy.get('.formBtn').click()
        cy.contains("Display help section").should('be.visible')
        cy.contains("Input").should('be.visible')
        cy.contains("Step").should('be.visible')
        cy.contains("Output").should('be.visible')
    })

    it('[DEFINE3] The author should be able to add and remove a step',() => {
        cy.contains('Add new step').click()
        cy.get('button').filter(':visible').contains('Remove').click()
        cy.contains('Input').should('have.length', 1);
    })

    it('[DEFINE4] The author should be able to add and remove an implementation unit',() => {
        cy.contains('Add an implementation').click()
        cy.get('.removeImplt').filter(':visible').click()
        cy.get('.implementationFile').should('have.length', 1);
    })

    it('[DEFINE5] The author should be able to define a phenotype definition',() => {
        cy.get('.workflowName').invoke('val', 'Test workflow name')
        cy.get('.workflowAbout').invoke('val', 'Test workflow about')
        cy.get('.inputDoc').invoke('val', 'Input 1')
        cy.get('.load').click()
        cy.get('.name').invoke('val', 'Step 1 name')
        cy.get('.doc').invoke('val', 'Step 1 description')
        cy.get('select').select('python')
        cy.get('.implementationFile').attachFile('read-potential-cases.py')
        cy.get('.outputDoc').invoke('val', 'Output 1')
        cy.get('.outputExtension').invoke('val', 'csv')
        cy.contains('Add new step').click()
        cy.get('.inputDoc').last().invoke('val', 'Input 2')
        cy.get('.logic').last().click()
        cy.get('.name').last().invoke('val', 'Step 2 name')
        cy.get('.doc').last().invoke('val', 'Step 2 description')
        cy.get('select').last().select('python')
        cy.get('.implementationFile').last().attachFile('acne---primary.py')
        cy.get('.outputDoc').last().invoke('val', 'Output 2')
        cy.get('.outputExtension').last().invoke('val', 'csv')
        cy.contains('Add new step').click()
        cy.get('.inputDoc').last().invoke('val', 'Input 3')
        cy.get('.output').last().click()
        cy.get('.name').last().invoke('val', 'Step 3 name')
        cy.get('.doc').last().invoke('val', 'Step 3 description')
        cy.get('select').last().select('python')
        cy.get('.implementationFile').last().attachFile('output-cases.py')
        cy.get('.outputDoc').last().invoke('val', 'Output 3')
        cy.get('.outputExtension').last().invoke('val', 'csv')
        cy.contains('SAVE').click()
        cy.contains('The phenotype definition was saved !').should('be.visible')
    })

    it('[DEFINE6] The help selection should be working',() => {
        cy.contains('Display help section').click()
        cy.contains('How many steps are required to form a phenotype definition ?').should('be.visible')
    })

});