/// <reference types="cypress" />
import authValid from '../fixtures/authValid'
import emptyNotes from '../fixtures/emptyNotes'
import graphResponse from '../fixtures/graphResponse'
import getStyling from '../fixtures/getStyling'
import linkAutocomplete from '../fixtures/linkAutocomplete'
import linkSearch from '../fixtures/linkSearch'
import { ROUTE_NETWORK_GRAPH_OPTIONS } from '../../src/constants/routes'
import showTourLs from '../fixtures/showTourLs'

context('Network graph options', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#open-app').click()
    cy.get('#accept-all-btn').click()
    window.localStorage.setItem('showTour', showTourLs)
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

      cy.get('.p-splitbutton-defaultbutton').click()

      cy.wait(5000)

      cy.get('#main-search').type('link')

      cy.wait('@linkAutocomplete')

      cy.get('.p-autocomplete-item').eq(0).click({ force: true })

      cy.wait('@linkSearch')

      cy.get('#card-visualise-btn-0').click({ force: true })

      cy.wait(1000)

      // click to show network graph options
      cy.get('#sidebar-button-network-graph-options').click()

      cy.location('pathname').should('be.equal', ROUTE_NETWORK_GRAPH_OPTIONS)

      cy.get('.nav-left').should('contain', 'Nodes: 24')
      cy.get('.nav-left').should('contain', 'Edges: 52')

      // switch 4 main options
      cy.get('#user-defined-nodes-checkbox').click()
      cy.get('#orphan-nodes-checkbox').click()

      // should toggle physics
      cy.get('.graph-options-physics-buttons').eq(0).find('.p-button').should('have.class', 'p-button p-component')
        .click()
      cy.get('.graph-options-physics-buttons').eq(0).find('.p-button').should('have.class', 'p-button p-component graph-options-physics-buttons-button-selected')

      // should toggle positioning
      cy.get('.graph-options-physics-buttons').eq(1).find('.p-button').eq(0)
        .should('have.class', 'p-button p-component')
      cy.get('.graph-options-physics-buttons').eq(1).find('.p-button').eq(1)
        .should('have.class', 'p-button p-component graph-options-physics-buttons-button-selected')
      cy.get('.graph-options-physics-buttons').eq(1).find('.p-button').eq(0)
        .click()
      cy.get('.graph-options-physics-buttons').eq(1).find('.p-button').eq(1)
        .should('have.class', 'p-button p-component')
      cy.get('.graph-options-physics-buttons').eq(1).find('.p-button').eq(0)
        .should('have.class', 'p-button p-component graph-options-physics-buttons-button-selected')
      cy.get('.graph-options-physics-buttons').eq(1).find('.p-button').should('have.class', 'p-button p-component graph-options-physics-buttons-button-selected')

      // should toggle repulsion
      cy.get('.graph-options-physics-buttons').eq(2).find('.p-button').eq(1)
        .should('have.class', 'p-button p-component')
      cy.get('.graph-options-physics-buttons').eq(2).find('.p-button').eq(0)
        .should('have.class', 'p-button p-component graph-options-physics-buttons-button-selected')
      cy.get('.graph-options-physics-buttons').eq(2).find('.p-button').eq(1)
        .click()
      cy.get('.graph-options-physics-buttons').eq(2).find('.p-button').eq(0)
        .should('have.class', 'p-button p-component')
      cy.get('.graph-options-physics-buttons').eq(2).find('.p-button').eq(1)
        .should('have.class', 'p-button p-component graph-options-physics-buttons-button-selected')
      cy.get('.graph-options-physics-buttons').eq(2).find('.p-button').should('have.class', 'p-button p-component graph-options-physics-buttons-button-selected')

      // switch 3 main options
      cy.get('#upper-ontology-checkbox').click()
      cy.get('#subclass-checkbox').click()
      cy.get('#dataset-checkbox').click()

      // save and check new nodes and edges count
      cy.get('#network-graph-options-save').click()

      cy.get('.nav-left').should('contain', 'Nodes: 13')
      cy.get('.nav-left').should('contain', 'Edges: 19')

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
      cy.get('.p-dropdown-items-wrapper').find('.p-dropdown-item').eq(4).click({ force: true })

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

      cy.get('.nav-left').should('contain', 'Nodes: 4')
      cy.get('.nav-left').should('contain', 'Edges: 4')
    })
  })
})
