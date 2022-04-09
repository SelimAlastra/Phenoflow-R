/// <reference types="cypress"/>

describe('homePage', () => {
    it('[HOME1] Page correctly render and contains text',() => {
        cy.visit('http://localhost:3003/phenoflow/')
        cy.contains("Experience the next generation phenotype library")
    })
    it('[HOME2] The page should contain the carousel',() => {
        cy.get('.carousel')
    })

    it('[HOME3] The page should contain images explaining Phenoflow portability',() => {
        cy.get('.indexImg')
    })

    it('[HOME4] The page should contain the Phenoflow model image',() => {
        cy.get('.modelImg')
    })

    it('[HOME5] The docker link should have the correct redirect',() => {
        cy.contains('docker').should('have.attr', 'href').and('include', 'https://docs.docker.com/get-docker/')
    })

    it('[HOME6] The cwltool link should have the correct redirect',() => {
        cy.contains('cwltool').should('have.attr', 'href').and('include', 'https://github.com/common-workflow-language/cwltool')
    })

    it('[HOME7] The joinUs link should have the correct redirect',() => {
        cy.contains('here').should('have.attr', 'href').and('include', '/contactUs/joinUs')
    })

    it('[HOME8] The article link should have the correct redirect',() => {
        cy.contains('Phenoflow: A Microservice Architecture for Portable Workflow-based Phenotype Definitions (2021)').should('have.attr', 'href').and('include', 'https://www.medrxiv.org/content/10.1101/2020.07.01.20144196v2')
    })
})