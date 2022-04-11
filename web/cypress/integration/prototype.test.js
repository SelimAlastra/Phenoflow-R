/// <reference types="cypress"/>

// Use this function to let the test not fail when we have an uncaught expection
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})


describe('Prototype', () => {
    it('[PROTOTYPE1] Page correctly render and contains text',() => {
        cy.visit('http://localhost:3003/phenoflow/prototype')
        cy.contains("Phenoflow prototype")
    })

    it('[PROTOTYPE2] The rosacea prototype should not run with missing outputs',() => {
        cy.contains('Try it !').first().click()
        cy.contains('Please insert a birth date.')
        cy.contains('Please insert the last encounter date.')
        cy.contains('Please insert the patient codes.')
    })

    it('[PROTOTYPE3] The rosacea prototype should be able to detect rosaceaPrimary for specific inputs',() => {
        cy.get('#birthDate').type('2000-05-27')
        cy.get('#lastE').type('2020-04-20')
        cy.get('#codes').invoke('val', "F4C3100, M153000")
        cy.contains('Try it !').first().click()
        cy.contains('Rosacea Primary Identified : CASE')
    })

    it('[PROTOTYPE4] The rosacea prototype should be able to detect rosaceaSeconday for specific inputs',() => {
        cy.get('#codes').invoke('val', "L71.1")
        cy.contains('Try it !').first().click()
        cy.contains('Rosacea Secondary Identified : CASE')
    })

    it('[PROTOTYPE5] The AAA prototype should not run with missing outputs',() => {
        cy.get('button').last().click()
        cy.contains('Please insert a birth date.')
        cy.contains('Please insert the last encounter date.')
        cy.contains('Please insert the patient codes.')
    })

    it('[PROTOTYPE6] The AAA prototype should be able to detect ageExclusion',() => {
        cy.get('#birthDate2').type('2000-05-27')
        cy.get('#lastE2').type('2020-04-20')
        cy.get('#codes2').invoke('val', "34800","34802")
        cy.get('button').last().click()
        cy.contains('Age exclusion : True').should('be.visible')
    })

    it('[PROTOTYPE7] The AAA prototype should be able to detect last encounter exclusion',() => {
        cy.get('#birthDate2').type('2000-05-27')
        cy.get('#lastE2').type('2005-04-20')
        cy.get('#codes2').invoke('val', "34800","34802")
        cy.get('button').last().click()
        cy.contains('Last encounter exculsion : True').should('be.visible')
    })

    it('[PROTOTYPE8] The AAA prototype should be able to detect renalAbdominalAorticAneurysm',() => {
        cy.get('#birthDate2').type('1980-05-27')
        cy.get('#lastE2').type('2017-04-20')
        cy.get('#codes2').invoke('val', "34800")
        cy.get('button').last().click()
        cy.contains('Renal Abdominal Aortic Aneurysm : CASE').should('be.visible')
    })

    it('[PROTOTYPE9] The AAA prototype should be able to detect abdominalAorticAneurysmMentionRupture',() => {
        cy.get('#birthDate2').type('1980-05-27')
        cy.get('#lastE2').type('2017-04-20')
        cy.get('#codes2').invoke('val', "441.4, 441.4")
        cy.get('button').last().click()
        cy.contains('Abdominal Aortic Aneurysm Mention Rupture : CASE').should('be.visible')
    })

    it('[PROTOTYPE10] The AAA prototype should be able to detect abdominalAorticAneurysmMentionRupture',() => {
        cy.get('#birthDate2').type('1980-05-27')
        cy.get('#lastE2').type('2017-04-20')
        cy.get('#codes2').invoke('val', "34800,34802,441.4,441.4,35081")
        cy.get('button').last().click()
        cy.contains('Abdominal Aortic Aneurysm Mention Rupture : CASE').should('be.visible')
        cy.contains('Occlusive Abdominal Aortic Aneurysm : CASE').should('be.visible')
    })



});