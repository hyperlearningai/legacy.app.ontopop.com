/// <reference types="cypress" />
import authValid from '../fixtures/authValid'
import emptyNotes from '../fixtures/emptyNotes'
import graphResponse from '../fixtures/graphResponse'
import getStyling from '../fixtures/getStyling'
import linkAutocomplete from '../fixtures/linkAutocomplete'
import linkSearch from '../fixtures/linkSearch'
import { ROUTE_NETWORK_GRAPH_OPTIONS } from '../../src/constants/routes'

context('Network graph options', () => {
  beforeEach(() => {
    cy.visit('/')
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

      cy.get('#auth-login-button').click()

      cy.wait('@postLogin')

      cy.get('.p-datatable-tbody').find('tr').should('have.length', 1)

      cy.get('.pi-chevron-down').click()

      cy.get('.p-menuitem-link').eq(0).click()

      cy.wait(1000)

      // click to show network graph options
      cy.get('#sidebar-button-network-graph-options').click()

      cy.wait(5000)

      cy.location('pathname').should('be.equal', ROUTE_NETWORK_GRAPH_OPTIONS)

      // Check number of nodes and edges at first loading
      cy.get('.nav-left').should('contain', 'Nodes: 305')
      cy.get('.nav-left').should('contain', 'Edges: 828')

      // switch 4 main options
      cy.get('#user-defined-nodes-checkbox').click()
      cy.get('#orphan-nodes-checkbox').click()
      cy.get('#upper-ontology-checkbox').click()
      cy.get('#subclass-checkbox').click()
      cy.get('#dataset-checkbox').click()

      // save and check new nodes and edges count
      cy.get('#network-graph-options-save').click()

      cy.wait(5000)

      cy.get('.nav-left').should('contain', 'Nodes: 200')
      cy.get('.nav-left').should('contain', 'Edges: 352')

      // Add nodes filters
      cy.get('#upper-ontology-checkbox').click()
      cy.get('#subclass-checkbox').click()
      cy.get('#dataset-checkbox').click()

      // set filters
      cy.get('#pr_id_5_header_0').click({ force: true })

      // open first filter
      cy.get('#pr_id_6_header_0').click({ force: true })

      // fill in filter and remove
      cy.get('.value-input').type('cond')

      cy.get('.graph-options-button-delete').click()

      // fill in first filter
      cy.get('.logic-select').find('.p-button').eq(1).click()

      cy.get('.property-select').find('.p-dropdown-trigger')
        .click()
      cy.get('.p-dropdown-items-wrapper').find('.p-dropdown-item').eq(18).click({ force: true })

      cy.get('.operation-select').find('.p-dropdown-trigger')
        .click()

      cy.get('.p-dropdown-items-wrapper').find('.p-dropdown-item').eq(0).click({ force: true })

      cy.get('.value-input').type('in')

      // add subfilter
      cy.get('.add-delete-buttons').find('.add-property').click()

      cy.get('.value-input').eq(1).type('in')

      cy.get('.add-delete-buttons').eq(1).find('.delete-property').click()

      // add new filter and delete
      cy.get('.graph-options-button-add').click()

      // save and check new nodes and edges count
      cy.get('#network-graph-options-save').click()

      cy.get('.nav-left').should('contain', 'Nodes: 36')
      cy.get('.nav-left').should('contain', 'Edges: 17')

      // Add edges filters
      cy.get('#pr_id_5_header_1').click({ force: true })

      // open first filter
      cy.get('#pr_id_9_header_0').click({ force: true })

      // fill in filter and remove
      cy.get('.value-input').eq(1).type('cond')

      cy.get('.graph-options-button-delete').click()

      // fill in first filter
      cy.get('.logic-select').find('.p-button').eq(1).click()

      cy.get('.property-select').find('.p-dropdown-trigger')
        .click()

      cy.get('.p-dropdown-items-wrapper').find('.p-dropdown-item').eq(1).click({ force: true })

      cy.get('.operation-select').find('.p-dropdown-trigger')
        .click()

      cy.get('.p-dropdown-items-wrapper').find('.p-dropdown-item').eq(2).click({ force: true })

      cy.get('.value-input').type('of')

      // add subfilter
      cy.get('.add-delete-buttons').find('.add-property').click()

      cy.get('.value-input').eq(1).type('of')

      cy.get('.add-delete-buttons').eq(1).find('.delete-property').click()

      // add new filter and delete
      cy.get('.graph-options-button-add').click()

      // save and check new nodes and edges count
      cy.get('#network-graph-options-save').click()

      cy.get('.nav-left').should('contain', 'Nodes: 36')
      cy.get('.nav-left').should('contain', 'Edges: 5')
    })
  })
})
