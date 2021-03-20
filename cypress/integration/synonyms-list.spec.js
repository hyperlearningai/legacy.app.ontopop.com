/// <reference types="cypress" />
import authValid from '../fixtures/authValid'
import graphResponse from '../fixtures/graphResponse'
import getNodesSynonyms from '../fixtures/getNodesSynonyms'
import deleteNodeSynonym from '../fixtures/deleteNodeSynonym'
import createNodeSynonym from '../fixtures/createNodeSynonym'
import updateNodeSynonym from '../fixtures/updateNodeSynonym'

context('Synonyms list', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  describe('Synonyms list', () => {
    it('Nodes synonyms list should return results', () => {
      cy.intercept({
        method: 'POST',
        url: '**/login',
      }, authValid).as('postLogin')


      cy.intercept({
        method: 'GET',
        url: '**/graph/node/*/synonyms',
      }, getNodesSynonyms).as('getNodesSynonyms')

      cy.intercept({
        method: 'GET',
        url: '**/graph?model=1',
      }, graphResponse).as('getGraph')

      cy.intercept({
        method: 'POST',
        url: '**/graph/nodes/*/synonyms/create',
      }, createNodeSynonym).as('createNodeSynonym')

      cy.intercept({
        method: 'DELETE',
        url: '**/graph/nodes/*/synonyms/*',
      }, deleteNodeSynonym).as('deleteNodeSynonym')

      cy.intercept({
        method: 'PATCH',
        url: '**/graph/nodes/*/synonyms/*',
      }, updateNodeSynonym).as('updateNodeSynonym')

      cy.get('#email').type('valid@email.com')
      cy.get('#password').type('password')

      cy.get('.auth-button').click()

      cy.wait('@postLogin')

      cy.get('#main-search').type('road')

      cy.wait('@getGraph')

      cy.get('.p-autocomplete-item').click()

      cy.get('.graph-search-results-number').should('contain', 'Search results: 28')

      // click to show network graph
      cy.get('.graph-search-results-list').find('.p-card-buttons').eq(1).find('.p-button')
        .eq(1)
        .click()

      cy.wait(1000)

      // shows subgraph
      cy.get('.nav-left').should('contain', 'Nodes: 4')
      cy.get('.nav-left').should('contain', 'Edges: 5')

      // click the synonym sidebar icon
      cy.get('.sidebar-icons').find('.p-button').eq(17).click()

      // select first node from dropdown
      cy.get('#synonyms-select-element').find('.p-dropdown-trigger').click({ force: true })
      cy.get('#synonyms-select-element').find('.p-dropdown-item').eq(0).click({ force: true })

      // add Node synonym
      cy.get('#add-synonym').click()
      cy.get('#selected-element-label').should('have.text', 'For Node: Geotechnical')

      cy.get('#synonym-textarea').type('Latest node synonym')
      cy.get('#submit-synonym').click()

      cy.wait('@createNodeSynonym')

      cy.get('.synonyms-synonym').should('have.length', 2)

      // search filter should work
      cy.get('#synonyms-search-filter').type('latest')
      cy.get('.synonyms-synonym').should('have.length', 2)

      cy.get('#synonyms-search-filter').clear()

      cy.get('.synonyms-synonym').should('have.length', 2)

      // editing and closing should work
      cy.get('.edit-synonym').eq(0).click({ force: true })

      cy.get('.close-synonym').click({ force: true })
      cy.get('.synonyms-content').eq(0).find('p').should('have.text', 'Latest node synonym')

      // editing should work
      cy.get('.edit-synonym').eq(0).click({ force: true })
      cy.get('.synonym-text').type(' added')
      cy.get('.edit-synonym').eq(0).click({ force: true })

      cy.wait('@updateNodeSynonym')

      cy.get('.synonyms-content').eq(0).find('p').should('have.text', 'Latest node synonym added')

      cy.get('.delete-synonym').eq(0).click({ force: true })
      cy.wait('@deleteNodeSynonym')

      cy.get('.synonyms-synonym').should('have.length', 1)
    })
  })
})
