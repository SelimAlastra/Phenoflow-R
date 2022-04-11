/// <reference types="cypress"/>

const path = require("path");
const downloadsFolder = Cypress.config("downloadsFolder");

///Please add some phenotypes through the defineAPI test

describe('workflow', () => {

    it('[WORKFLOW1] Page correctly render and contains text',() => {
        cy.visit('http://localhost:3003/phenoflow/phenotype/all/')
        cy.contains("Library")
    })

    it('[WORKFLOW2] It is possible to access an imported phenotype through the searchBar',() => {
        cy.get('#searchInput').invoke('val','My-imported-codelist-phenotype')
        cy.contains('Search').click()
        cy.contains('VIEW').click()
    })

    it('[WORKFLOW3] It is possible to change the implementation unit',() => {
        cy.get('select').first().select('js')
    })

    it('[WORKFLOW4] It is possible to view an implementation unit code',() => {
        cy.contains('VIEW').click()
    })

    it('[WORKFLOW5] It is possible to download the phenotype',() => {
        cy.contains('DOWNLOAD').click()
        cy.readFile(path.join(downloadsFolder, "My-imported-codelist-phenotype.zip")).should("exist");;
    })


});