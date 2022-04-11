/// <reference types="cypress"/>
const path = require("path");
const downloadsFolder = Cypress.config("downloadsFolder");


const deleteDownloadsFolder = () => {
    const downloadsFolder = Cypress.config('downloadsFolder')
    cy.task('deleteFolder', downloadsFolder)
}

describe('Prototype', () => {

    beforeEach(deleteDownloadsFolder)

    it('[DATASETG1] Page correctly render and contains text',() => {
        cy.visit('http://localhost:3003/phenoflow/dataSetGenerator')
        cy.contains("Data Set Generator")
    })

    it('[DATASETG2] The data set generator should not run with missing inputs',() => {
        cy.contains("Try it").click()
        cy.contains('Please insert the codes.').should('be.visible')
    })

    it('[DATASETG3] The data set generator should run and download the csv with no advanced parameters',() => {
        cy.get('#dataCodes').invoke('val', "2FG5.00 M260000 M261000 M261100 M261200")
        cy.contains("Try it").click()
        cy.get("table").last().should('be.visible')
        cy.contains('Export to CSV').click()
        cy.readFile(path.join(downloadsFolder, "replaceMe.csv")).should("exist");;
    })

    it('[DATASETG4] The dataset generator should not run with missing inputs (advanced parameters)',() => {
        cy.contains('Advanced parameters').click({force: true})
        cy.contains("Please insert the youngest possible patient birthdate")
    })

    it('[DATASETG6] The dataset generator should work with advanced parameters',() => {
        cy.get('#yBirthdate').type('2010-05-27')
        cy.get('#oBirthdate').type('1950-05-27')
        cy.get('#latestEncDate').type('2015-05-27')
        cy.contains("Try it").click()
        cy.get("table").last().should('be.visible')
        cy.contains('Export to CSV').click()
        cy.readFile(path.join(downloadsFolder, "replaceMe.csv")).should("exist");;
    })





});