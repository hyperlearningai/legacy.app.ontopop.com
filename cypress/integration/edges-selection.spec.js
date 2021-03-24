/// <reference types="cypress" />
import authValid from '../fixtures/authValid'
import emptyNotes from '../fixtures/emptyNotes'
import graphResponse from '../fixtures/graphResponse'
import getStyling from '../fixtures/getStyling'

context('Edges selection', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  describe('Edges selection', () => {
    it('Edges selection should return results', () => {
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

      cy.get('.graph-search-results-number').should('contain', 'Search results for value: 5')

      // click to show network graph
      cy.get('.graph-search-results-list').find('.p-card-buttons').eq(2).find('.p-button')
        .eq(1)
        .click()

      cy.wait(1000)

      // shows subgraph
      cy.get('.nav-left').should('contain', 'Nodes: 10')
      cy.get('.nav-left').should('contain', 'Edges: 13')

      // click the nodes selection icon
      cy.get('#sidebar-button-edges-selection').click()

      cy.get('.edges-selection-details').should('not.have.exist')

      // select first node
      cy.get('#edge-select').find('.p-dropdown-trigger').click({ force: true })
      cy.get('#edge-select').find('.p-dropdown-filter').type('asset')
      cy.get('#edge-select').find('.p-dropdown-item').eq(0).click({ force: true })

      cy.get('.edges-selection-details-table-properties').find('tbody tr').should('have.length', '1')
      cy.get('.edges-selection-details-table-relationships').find('tbody tr').should('have.length', '1')

      // select another node
      cy.get('#edge-select').find('.p-dropdown-trigger').click({ force: true })
      cy.get('#edge-select').find('.p-dropdown-filter').clear().type('str')
      cy.get('#edge-select').find('.p-dropdown-item').eq(0).click({ force: true })

      cy.get('.edges-selection-details-table-properties').find('tbody tr').should('have.length', '1')
      cy.get('.edges-selection-details-table-relationships').find('tbody tr').should('have.length', '1')

      // expand nodes
      cy.get('.button-expand').click({ force: true })
      cy.get('.edge-node-info-title').should('have.length', 15)
    })
  })
})
