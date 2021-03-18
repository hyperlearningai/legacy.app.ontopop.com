/// <reference types="cypress" />
import authValid from '../fixtures/authValid'
import emptyNotes from '../fixtures/emptyNotes'
import graphResponse from '../fixtures/graphResponse'
import getStyling from '../fixtures/getStyling'

context('Free text search', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  describe('Free text search', () => {
    it('Free-text search should return results', () => {
      cy.intercept({
        method: 'POST',
        url: '**/login',
      }, authValid).as('postLogin')

      cy.intercept({
        method: 'GET',
        url: '**/graph/notes',
      }, emptyNotes).as('getNotes')

      cy.intercept({
        method: 'GET',
        url: '**/graph/nodes/notes',
      }, emptyNotes).as('getNodesNotes')

      cy.intercept({
        method: 'GET',
        url: '**/graph/edges/notes',
      }, emptyNotes).as('getEdgesNotes')

      cy.intercept({
        method: 'GET',
        url: '**/graph?model=1',
      }, graphResponse).as('getGraph')

      cy.intercept({
        method: 'GET',
        url: '**/api/ui/styling',
      }, getStyling).as('getStyling')

      cy.get('#email').type('valid@email.com')
      cy.get('#password').type('password')

      cy.get('.auth-button').click()

      cy.wait('@postLogin')

      cy.get('#main-search').type('road')

      cy.wait('@getGraph')

      cy.get('.p-autocomplete-item').click()

      cy.get('.graph-search-results-number').should('contain', 'Search results: 28')

      // click to show network graph
      cy.get('.graph-search-results-list').find('.p-card-buttons').eq(0).find('.p-button')
        .eq(1)
        .click()

      cy.wait(1000)

      // shows subgraph
      cy.get('.nav-left').should('contain', 'Nodes: 13')
      cy.get('.nav-left').should('contain', 'Edges: 25')

      // click the free text search icon
      cy.get('.sidebar-icons').find('.p-button').eq(2).click()

      cy.get('.freetext-search-input').find('.p-inputtext').type('main')

      cy.get('.freetext-search-row').should('have.length', 12)

      // press on first element
      cy.get('.freetext-search-row').eq(0).find('.p-button').eq(1)
        .click()

      // remove one item
      cy.get('.freetext-search-row').eq(0).find('.p-button').eq(0)
        .click()

      cy.get('.freetext-search-row').should('have.length', 11)
    })
  })
})
