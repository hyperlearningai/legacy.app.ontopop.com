/// <reference types="cypress" />
import authValid from '../fixtures/authValid'
import emptyNotes from '../fixtures/emptyNotes'
import graphResponse from '../fixtures/graphResponse'
import getStyling from '../fixtures/getStyling'
import {ROUTE_ELEMENTS_SELECTION} from '../../src/constants/routes'

context('Elements selection', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  describe('Elements selection', () => {
    it('Elements selection should return results', () => {
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
        url: '**/graph/elements/notes',
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

      // click the nodes selection icon
      cy.get('#sidebar-button-elements-selection').click()

      cy.wait(500)

      cy.location('pathname').should('be.equal', ROUTE_ELEMENTS_SELECTION)

      cy.get('.elements-selection-details').should('not.have.exist')

      // select first node
      cy.get('#element-select').find('.p-dropdown-trigger').click({ force: true })
      cy.get('#element-select').find('.p-dropdown-filter').type('asset')
      cy.get('#element-select').find('.p-dropdown-item').eq(0).click({ force: true })

      cy.get('.nodes-selection-details-table-properties').find('tbody tr').should('have.length', '7')
      cy.get('.nodes-selection-details-table-relationships').find('tbody tr').should('have.length', '10')

      // select another node
      cy.get('#element-select').find('.p-dropdown-trigger').click({ force: true })
      cy.get('#element-select').find('.p-dropdown-filter').clear().type('str')
      cy.get('#element-select').find('.p-dropdown-item').eq(0).click({ force: true })

      cy.get('.nodes-selection-details-table-properties').find('tbody tr').should('have.length', '8')
      cy.get('.nodes-selection-details-table-relationships').find('tbody tr').should('have.length', '2')

      // change type to edge
      cy.get('#element-type-select').find('.p-button').eq(1).click()

      // select first edge
      cy.get('#element-select').find('.p-dropdown-trigger').click({ force: true })
      cy.get('#element-select').find('.p-dropdown-filter').clear().type('asset')
      cy.get('#element-select').find('.p-dropdown-item').eq(0).click({ force: true })

      cy.get('.edges-selection-details-table-properties').find('tbody tr').should('have.length', '2')
      cy.get('.edges-selection-details-table-relationships').find('tbody tr').should('have.length', '1')

      // select another edge
      cy.get('#element-select').find('.p-dropdown-trigger').click({ force: true })
      cy.get('#element-select').find('.p-dropdown-filter').clear().type('str')
      cy.get('#element-select').find('.p-dropdown-item').eq(0).click({ force: true })

      cy.get('.edges-selection-details-table-properties').find('tbody tr').should('have.length', '2')
      cy.get('.edges-selection-details-table-relationships').find('tbody tr').should('have.length', '1')

    })
  })
})