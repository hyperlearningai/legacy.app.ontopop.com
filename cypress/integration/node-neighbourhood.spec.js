/// <reference types="cypress" />
import authValid from '../fixtures/authValid'
import emptyNotes from '../fixtures/emptyNotes'
import graphResponse from '../fixtures/graphResponse'
import getStyling from '../fixtures/getStyling'

context('Node neighbourhood', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  describe('Node neighbourhood', () => {
    it('Node neighbourhood should return results', () => {
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

      cy.get('#main-search').type('value')

      cy.wait('@getGraph')

      cy.get('.p-autocomplete-item').click()

      cy.get('.graph-search-results-number').should('contain', 'Search results: 5')

      // click to show network graph
      cy.get('.graph-search-results-list').find('.p-card-buttons').eq(2).find('.p-button')
        .eq(1)
        .click()

      cy.wait(1000)

      // shows subgraph
      cy.get('.nav-left').should('contain', 'Nodes: 10')
      cy.get('.nav-left').should('contain', 'Edges: 13')

      // click the node neighbourhood icon
      cy.get('#sidebar-button-node-neighbourhood').click()

      // select first node
      cy.get('#node-select').find('.p-dropdown-trigger').click({ force: true })
      cy.get('#node-select').find('.p-dropdown-filter').type('asset')
      cy.get('#node-select').find('.p-dropdown-item').eq(0).click({ force: true })

      // check that separation degree up/down buttons work
      cy.get('.p-button-success').click()
      cy.get('.p-button-success').click()
      cy.get('.p-button-danger').click()

      cy.get('#separation-degree').find('.p-inputnumber-input').should('have.value', 2)

      cy.get('.node-neighbourhood-button').click()

      // shows subgraph
      cy.get('.nav-left').should('contain', 'Nodes: 69')
      cy.get('.nav-left').should('contain', 'Edges: 168')
    })
  })
})
