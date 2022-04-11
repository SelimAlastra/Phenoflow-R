/// <reference types="cypress"/>

/// PLEASE RUN THE DEFINE TEST BEFORE

/// NOTE: WE WILL NOT TEST ALL FUNCTIONALITIES AGAIN AS THEY ARE ALREADY TESTED INSIDE 'define.test.js'

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

describe('edit', () => {

    beforeEach(() => {
        cy.restoreLocalStorage();
    });
      
      afterEach(() => {
        cy.saveLocalStorage();
    });

    it('[EDIT1] The page should not render fully if the author is not logged in',() => {
        cy.visit('http://localhost:3003/phenoflow/phenotype/mine')
        cy.contains("You have been logout, you will have to login again to use this functionality !").should('be.visible')
    })

    it('[EDIT2] The page should render fully if the author is logged in',() => {
        cy.viewport(1500, 1000)
        cy.get('.nav-link').contains("Login").click()
        cy.get('#username').invoke('val', 'martinchapma').type("n")
        cy.get('#password').invoke('val', 'password')
        cy.get('.formBtn').click()
    })

    it('[EDIT3] The previously added phenotype (inside define.test.js) is found and is accessible',() => {
        cy.contains('VIEW').click()
    })

    it('[EDIT4] It is possible to add an implementation unit and save it',() => {
        cy.contains('Add an implementation').click()
        cy.get('select').eq(1).select('python')
        cy.get('.implementationFile').eq(1).attachFile('read-potential-cases.py')
        cy.contains('SAVE').click()
        cy.contains('The phenotype definition was saved !').should('be.visible')
    })




});