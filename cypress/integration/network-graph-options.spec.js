/// <reference types="cypress" />
import authValid from '../fixtures/authValid'
import emptyNotes from '../fixtures/emptyNotes'
import graphResponse from '../fixtures/graphResponse'
import getStyling from '../fixtures/getStyling'
import { ROUTE_NETWORK_GRAPH_OPTIONS } from '../../src/constants/routes'

context('Network graph options', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  describe('Network graph options', () => {
    it('Toggling settings should work', () => {
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

      cy.wait('@getGraph')

      cy.get('#main-search').type('material')

      cy.get('.p-autocomplete-item').click()

      cy.get('.graph-search-results-number').should('contain', 'Search results for material: 4')

      // click to show network graph
      cy.get('.graph-search-results-list').find('.p-card-buttons').eq(2).find('.p-button')
        .eq(1)
        .click()

      cy.get('#sidebar-button-network-graph-options').click()

      cy.location('pathname').should('be.equal', ROUTE_NETWORK_GRAPH_OPTIONS)

      // Check number of nodes and edges at first loading
      cy.get('.nav-left').should('contain', 'Nodes: 23')
      cy.get('.nav-left').should('contain', 'Edges: 40')

      // switch 3 main options
      cy.get('#upper-ontology-checkbox').click()
      cy.get('#subclass-checkbox').click()
      cy.get('#dataset-checkbox').click()

      // save and check new nodes and edges count
      cy.get('#network-graph-options-save').click()

      cy.get('.nav-left').should('contain', 'Nodes: 22')
      cy.get('.nav-left').should('contain', 'Edges: 18')

      // Add nodes filters
      cy.get('#upper-ontology-checkbox').click()
      cy.get('#subclass-checkbox').click()
      cy.get('#dataset-checkbox').click()

      cy.get('.p-accordion').eq(0).click()

      // open first filter
      cy.get('.p-accordion').eq(0).find('.p-accordion-content')
        .find('.p-accordion-tab')
        .eq(0)
        .click()

      // fill in filter and remove
      cy.get('.value-input').type('cond')

      cy.get('.graph-options-button-delete').click()

      // fill in first filter
      cy.get('.logic-select').find('.p-button').eq(1).click()

      cy.get('.property-select').find('.p-dropdown-trigger')
        .click()

      cy.get('.property-select').find('.p-dropdown-item')
        .eq(18)
        .click({ force: true })

      cy.get('.operation-select').find('.p-dropdown-trigger')
        .click()

      cy.get('.operation-select').find('.p-dropdown-item')
        .eq(0)
        .click({ force: true })

      cy.get('.value-input').type('in')

      // add subfilter
      cy.get('.add-delete-buttons').find('.add-property').click()

      cy.get('.value-input').eq(1).type('in')

      cy.get('.add-delete-buttons').eq(1).find('.delete-property').click()

      // add new filter and delete
      cy.get('.graph-options-button-add').click()

      // save and check new nodes and edges count
      cy.get('#network-graph-options-save').click()

      cy.get('.nav-left').should('contain', 'Nodes: 4')
      cy.get('.nav-left').should('contain', 'Edges: 3')

      // Add edges filters
      cy.get('.p-accordion').find('a').eq(0)
        .click({ force: true })
      cy.get('.p-accordion').find('a').eq(3)
        .click({ force: true })

      // open first filter
      cy.get('.p-accordion').eq(2)
        .find('.p-accordion-tab')
        .eq(0)
        .click()

      // fill in filter and remove
      cy.get('.value-input').type('cond')

      cy.get('.graph-options-button-delete').click()

      // fill in first filter
      cy.get('.logic-select').find('.p-button').eq(1).click()

      cy.get('.property-select').find('.p-dropdown-trigger')
        .click()

      cy.get('.property-select').find('.p-dropdown-item')
        .eq(1)
        .click({ force: true })

      cy.get('.operation-select').find('.p-dropdown-trigger')
        .click()

      cy.get('.operation-select').find('.p-dropdown-item')
        .eq(2)
        .click({ force: true })

      cy.get('.value-input').type('of')

      // add subfilter
      cy.get('.add-delete-buttons').find('.add-property').click()

      cy.get('.value-input').eq(1).type('of')

      cy.get('.add-delete-buttons').eq(1).find('.delete-property').click()

      // add new filter and delete
      cy.get('.graph-options-button-add').click()

      // save and check new nodes and edges count
      cy.get('#network-graph-options-save').click()

      cy.get('.nav-left').should('contain', 'Nodes: 4')
      cy.get('.nav-left').should('contain', 'Edges: 0')
    })
  })
})
