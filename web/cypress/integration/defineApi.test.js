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

describe('defineAPI', () => {

    beforeEach(() => {
        cy.restoreLocalStorage();
    });
      
      afterEach(() => {
        cy.saveLocalStorage();
    });

    it('[DEFINEAPI1] The page should not render fully if the author is not logged in',() => {
        cy.visit('http://localhost:3003/phenoflow/definePage/API')
        cy.contains("You have been logout, you will have to login again to use this functionality !").should('be.visible')
    })

    it('[DEFINEAPI2] The page should render fully if the author is logged in',() => {
        cy.viewport(1500, 1000)
        cy.get('.nav-link').contains("Login").click()
        cy.get('#username').invoke('val', 'martinchapma').type("n")
        cy.get('#password').invoke('val', 'password')
        cy.get('.formBtn').filter(':visible').click()
        cy.contains('Upload phenotype definitions through the API').should('be.visible')
    })

    it('[DEFINEAPI3] The link to swagger is correct',() => {
        cy.contains('Add through Swagger').should('have.attr', 'href').and('include', '/phenoflow/docs/#/')
    })

    it('[DEFINEAPI4] Getting the idToken is working',() => {
        cy.contains('Get your ID token').click()
        cy.get('#idTokenString').should('be.visible')
    })

    it('[DEFINEAPI5] It should not be possible to create a phenotype based on a collection of codelists with missings inputs',() => {
        cy.get('#codeListSubmit').click()
        cy.contains('Please enter a name for your definition !').should('be.visible')
        
    })

    it('[DEFINEAPI6] It is possible to create a phenotype based on a collection of codelists',() => {
        cy.get('#name1').invoke('val', 'My imported codelist phenotype')
        cy.get('#about').invoke('val', 'My imported codelist phenotype description')
        cy.get('.codelistFile').attachFile("myCodes.zip")
        cy.get('#codeListSubmit').click()
        cy.contains('Your phenotype definition was added').should('be.visible')
        
    })

    it('[DEFINEAPI7] It should not be possible to create a phenotype based on a collection of keywords with missings inputs',() => {
        cy.get('#keyWordsSubmit').click()
        cy.contains('Please enter a name for your definition !').should('be.visible')
    })

    it('[DEFINEAPI8] It is possible to create a phenotype based on a collection of keywords',() => {
        cy.get('.form-control').eq(4).invoke('val', 'My imported keywords phenotype')
        cy.get('.form-control').eq(5).invoke('val', 'My imported keywords phenotype description')
        cy.get('input[type="file"]').eq(1).attachFile("keyWords.csv")
        cy.get('#keyWordsSubmit').click()
        cy.contains('Your phenotype definition was added').should('be.visible')
    })

    it('[DEFINEAPI9] It is not possible to create a phenotype based on a list of steps with missings inputs',() => {
        cy.get('#stepListSubmit').click()
        cy.contains('Please enter a name for your definition !').should('be.visible')
    })

    it('[DEFINEAPI10] It is possible to create a phenotype based on a list of steps',() => {
        cy.get('.form-control').eq(6).invoke('val', 'My imported steplist phenotype')
        cy.get('.form-control').eq(7).invoke('val', 'My imported steplist phenotype description')
        cy.get('input[type="file"]').eq(2).attachFile("codelist-steplist-branch-A.csv")
        cy.get('input[type="file"]').eq(3).attachFile("step.zip")
        cy.get('#stepListSubmit').click()
        cy.contains('Your phenotype definition was added').should('be.visible')
    })


    it('[DEFINEAPI11] It is not possible to add a connector with missing inputs',() => {
        cy.get('#connectorSubmit').click()
        cy.contains('Please enter a phenotype definition ID !').should('be.visible')
    })

    it('[DEFINEAPI12] It is possible to add a new connector',() => {
        cy.get('.form-control').eq(8).invoke('val', '1')
        cy.get('.form-control').eq(9).invoke('val', 'New connector')
        cy.get('input[type="file"]').eq(4).attachFile("read-potential-cases.py")
        cy.get('#connectorSubmit').click()
        cy.contains('Your external connector was added').should('be.visible')
    })

});