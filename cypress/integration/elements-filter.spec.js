/// <reference types="cypress" />
import authValid from '../fixtures/authValid'
import emptyNotes from '../fixtures/emptyNotes'
import graphResponse from '../fixtures/graphResponse'
import getStyling from '../fixtures/getStyling'
import linkAutocomplete from '../fixtures/linkAutocomplete'
import linkSearch from '../fixtures/linkSearch'
import { ROUTE_ELEMENTS_FILTER } from '../../src/constants/routes'

context('Elements filter', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#accept-all-btn').click()
  })

  describe('Elements filter', () => {
    it('Elements filter should return results', () => {
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

      cy.get('.p-datatable-tbody').find('tr').should('have.length', 1)

      cy.get('.pi-chevron-down').click()

      cy.get('.p-menuitem-link').eq(0).click()

      cy.wait(1000)

      cy.get('#main-search').type('link')

      cy.wait('@linkAutocomplete')

      cy.get('.p-autocomplete-item').eq(0).click()

      cy.wait('@linkSearch')

      cy.get('#card-visualise-btn-0').click()

      cy.wait(1000)

      // click the elements filter icon
      cy.get('#sidebar-button-elements-filter').click()

      cy.location('pathname').should('be.equal', ROUTE_ELEMENTS_FILTER)

      // AND search should work

      // first AND filter
      cy.get('#nodes-filter-property-0').find('.p-dropdown-trigger').click({ force: true })
      cy.get('.p-dropdown-filter-container').find('.p-dropdown-filter').type('rdfs')
      cy.get('.p-dropdown-items-wrapper').find('.p-dropdown-item').eq(0).click({ force: true })
      cy.get('#nodes-filter-value-0').type('loc')

      cy.get('#elements-filter-add').click()

      // second AND filter
      cy.get('#nodes-filter-property-1').find('.p-dropdown-trigger').click({ force: true })
      cy.get('.p-dropdown-filter-container').find('.p-dropdown-filter').type('rdfs')
      cy.get('.p-dropdown-items-wrapper').find('.p-dropdown-item').eq(0).click({ force: true })
      cy.get('#nodes-filter-value-1').type('net')

      cy.get('#elements-filter-btn').click()

      cy.wait(1000)

      // shows subgraph
      cy.get('.nav-left').should('contain', 'Nodes: 3')
      cy.get('.nav-left').should('contain', 'Edges: 1')

      cy.get('#remove-graph-1').click()
      cy.get('#remove-graph-1').click()

      cy.get('#sidebar-button-search').click()

      cy.get('#main-search').clear().type('link')

      cy.wait('@linkAutocomplete')

      cy.get('.p-autocomplete-item').eq(0).click()

      cy.wait('@linkSearch')

      cy.get('#card-visualise-btn-0').click()

      cy.wait(1000)

      // click the elements filter icon
      cy.get('#sidebar-button-elements-filter').click()

      cy.wait(500)

      cy.location('pathname').should('be.equal', ROUTE_ELEMENTS_FILTER)

      // change type to edge
      cy.get('#element-type-select').find('.p-button').eq(1).click()

      // first AND filter
      cy.get('#edges-filter-property-0').find('.p-dropdown-trigger').click({ force: true })
      cy.get('.p-dropdown-filter-container').find('.p-dropdown-filter').type('rdfs')
      cy.get('.p-dropdown-items-wrapper').find('.p-dropdown-item').click({ force: true })
      cy.get('#edges-filter-value-0').type('loc')

      cy.get('#elements-filter-add').click()

      // second AND filter
      cy.get('#edges-filter-property-1').find('.p-dropdown-trigger').click({ force: true })
      cy.get('.p-dropdown-filter-container').find('.p-dropdown-filter').type('rdfs')
      cy.get('.p-dropdown-items-wrapper').find('.p-dropdown-item').click({ force: true })
      cy.get('#edges-filter-value-1').type('in')

      cy.get('#elements-filter-btn').click()

      cy.wait(1000)

      // shows subgraph
      cy.get('.nav-left').should('contain', 'Nodes: 18')
      cy.get('.nav-left').should('contain', 'Edges: 39')
    })
  })
})
