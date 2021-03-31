/// <reference types="cypress" />
import authValid from '../fixtures/authValid'
import emptyNotes from '../fixtures/emptyNotes'
import graphResponse from '../fixtures/graphResponse'
import getStyling from '../fixtures/getStyling'
import { ROUTE_NODES_FILTER } from '../../src/constants/routes'

context('Nodes filter', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login')
  })

  describe('Nodes filter', () => {
    it('Nodes filter should return results', () => {
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
      cy.get('.nav-left').should('contain', 'Nodes: 11')
      cy.get('.nav-left').should('contain', 'Edges: 14')

      // click the nodes filter icon
      cy.get('#sidebar-button-nodes-filter').click()

      cy.location('pathname').should('be.equal', ROUTE_NODES_FILTER)

      // AND search should work

      // first AND filter
      cy.get('#nodes-filter-property-0').find('.p-dropdown-trigger').click({ force: true })
      cy.get('#nodes-filter-property-0').find('.p-dropdown-filter').type('rdfs')
      cy.get('#nodes-filter-property-0').find('.p-dropdown-item').click({ force: true })
      cy.get('#nodes-filter-value-0').type('asset')

      // second AND filter
      cy.get('#nodes-filter-property-1').find('.p-dropdown-trigger').click({ force: true })
      cy.get('#nodes-filter-property-1').find('.p-dropdown-filter').type('rdfs')
      cy.get('#nodes-filter-property-1').find('.p-dropdown-item').click({ force: true })
      cy.get('#nodes-filter-value-1').type('mat')

      cy.get('.nodes-filter-button').click()

      cy.wait(1000)

      // shows subgraph
      cy.get('.nav-left').should('contain', 'Nodes: 3')
      cy.get('.nav-left').should('contain', 'Edges: 2')
    })
  })
})
