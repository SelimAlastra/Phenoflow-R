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

describe('forum', () => {

    beforeEach(() => {
        cy.restoreLocalStorage();
      });
      
      afterEach(() => {
        cy.saveLocalStorage();
      });

    it('[FORUM1] The page should render correctly',() => {
        cy.visit('http://localhost:3003/phenoflow/forum')
        cy.contains("Forum")
    })

    it('[FORUM2] The user should be able to add a post',() => {
        cy.get('.modalBtn').click()
        cy.get('#formControlInput1').invoke('val', 'Post title')
        cy.get('#formControlInput2').invoke('val', 'Selim ALastra')
        cy.get('#formControlTextarea1').invoke('val', 'Post test')
        cy.get('.formBtn').contains('Submit').click()
        cy.get('.card-title').contains('Post title').should('be.visible')
    })

    it('[FORUM3] The user should be access the post he created',() => {
        cy.contains('View post').click()
    })

    it('[FORUM4] An other user should be able to answer the post',() => {
        cy.contains('ANSWER').click()
        cy.get('#formControlInput1').invoke('val', 'Post answer')
        cy.get('#formControlInput2').invoke('val', 'John Smith')
        cy.get('.formBtn').contains('Submit').click()
    })

    it('[FORUM5] An author answer should distinguish fron an user one/ delete an answer',() => {
        cy.viewport(1500, 1000)
        cy.get('.nav-link').contains("Login").click()
        cy.get('#username').invoke('val', 'martinchapma').type("n")
        cy.get('#password').invoke('val', 'password')
        cy.get('.formBtn').contains("Login").click()
        cy.contains('ANSWER').click()
        cy.get('#formControlInput1').invoke('val', 'Post answer')
        cy.get('#formControlInput2').invoke('val', 'John Smith')
        cy.get('.formBtn').contains('Submit').click()
        cy.contains('Phenoflow verified author')
        cy.get("button").last().click({force: true})
        console.log(localStorage.getItem("id_token"))
    })

    it('[FORUM6] The author should be able to delete the answers',() => {
        cy.get("button").last().click({force: true})
        cy.wait(2000)
        cy.get("button").last().click({force: true})
        cy.contains('There are no answers to this post, be the first one !')
    })

    it('[FORUM7] The author should be able to delete the post',() => {
        cy.get(".deletePost").click({force: true})
    })

    it('[FORUM8] The searchbar should be working',() => {
        cy.get('.modalBtn').click()
        cy.get('#formControlInput1').invoke('val', 'Post title')
        cy.get('#formControlInput2').invoke('val', 'Selim ALastra')
        cy.get('#formControlTextarea1').invoke('val', 'Post test')
        cy.get('.formBtn').contains('Submit').click()
        cy.get('.searchBarInput').invoke('val', 'Post title')
        cy.get('.searchBTN').click()
        cy.get('.card-title').contains('Post title').should('be.visible')
    })

    it('[FORUM9] The author should be able to create and delete a post from the first page',() => {
        cy.get(".deletePost").last().click({force: true})
        cy.contains('No post matching your search description !')
    })
    
});