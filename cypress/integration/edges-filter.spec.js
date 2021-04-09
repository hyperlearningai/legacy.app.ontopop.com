/// <reference types="cypress" />
import authValid from '../fixtures/authValid'
import emptyNotes from '../fixtures/emptyNotes'
import graphResponse from '../fixtures/graphResponse'
import getStyling from '../fixtures/getStyling'
import linkAutocomplete from '../fixtures/linkAutocomplete'
import linkSearch from '../fixtures/linkSearch'
import { ROUTE_EDGES_FILTER } from '../../src/constants/routes'

context('Edges filter', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  describe('Edges filter', () => {
    it('Edges filter should return results', () => {
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

      cy.intercept({
        method: 'GET',
        url: '**/autocomplete**',
      }, linkAutocomplete).as('linkAutocomplete')

      cy.intercept({
        method: 'POST',
        url: '**/search?api-version=2020-06-30',
      }, linkSearch).as('linkSearch')

      cy.get('#email').type('valid@email.com')
      cy.get('#password').type('password')

      cy.get('.auth-button').click()

      cy.wait('@postLogin')

      cy.get('#main-search').type('link')

      cy.wait('@linkAutocomplete')

      cy.get('.p-autocomplete-item').eq(0).click()

      cy.wait('@linkSearch')

      cy.get('#card-visualise-btn-0').click()

      cy.wait(1000)

      // click the nodes filter icon
      cy.get('#sidebar-button-edges-filter').click()

      cy.wait(500)

      cy.location('pathname').should('be.equal', ROUTE_EDGES_FILTER)

      // first AND filter
      cy.get('#edges-filter-property-0').find('.p-dropdown-trigger').click({ force: true })
      cy.get('.p-dropdown-filter-container').find('.p-dropdown-filter').type('rdfs')
      cy.get('.p-dropdown-items-wrapper').find('.p-dropdown-item').click({ force: true })
      cy.get('#edges-filter-value-0').type('loc')

      // second AND filter
      cy.get('#edges-filter-property-1').find('.p-dropdown-trigger').click({ force: true })
      cy.get('.p-dropdown-filter-container').find('.p-dropdown-filter').type('rdfs')
      cy.get('.p-dropdown-items-wrapper').find('.p-dropdown-item').click({ force: true })
      cy.get('#edges-filter-value-1').type('in')

      cy.get('.edges-filter-button').click()

      cy.wait(1000)

      // shows subgraph
      cy.get('.nav-left').should('contain', 'Nodes: 18')
      cy.get('.nav-left').should('contain', 'Edges: 39')
    })
  })
})
