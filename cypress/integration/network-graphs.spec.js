/// <reference types="cypress" />
import authValid from '../fixtures/authValid'
import emptyNotes from '../fixtures/emptyNotes'
import graphResponse from '../fixtures/graphResponse'
import getStyling from '../fixtures/getStyling'
import linkAutocomplete from '../fixtures/linkAutocomplete'
import linkSearch from '../fixtures/linkSearch'
import { ROUTE_NETWORK_GRAPHS } from '../../src/constants/routes'
import showTourLs from '../fixtures/showTourLs'

context('Network graph', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#accept-all-btn').click()
    window.localStorage.setItem('showTour', showTourLs)
  })

  describe('Network graph', () => {
    it('Switching between graphs and removing subgraph should work', () => {
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

      cy.get('#main-search').type('link')

      cy.wait('@linkAutocomplete')

      cy.get('.p-autocomplete-item').eq(0).click()

      cy.wait('@linkSearch')

      cy.get('#card-visualise-btn-0').click()

      cy.wait(1000)

      cy.location('pathname').should('be.equal', ROUTE_NETWORK_GRAPHS)

      // shows subgraph
      cy.get('.nav-left').should('contain', 'Nodes: 24')
      cy.get('.nav-left').should('contain', 'Edges: 52')

      // click to Main
      cy.get('.network-graph-list-row').eq(0).find('.p-button').click()

      cy.wait(3000)

      cy.get('.nav-left').should('contain', 'Nodes: 305')
      cy.get('.nav-left').should('contain', 'Edges: 828')

      // click to Main
      cy.get('.network-graph-list-row').eq(1).find('.p-button').eq(1)
        .click()

      cy.wait(1000)

      // shows subgraph
      cy.get('.nav-left').should('contain', 'Nodes: 24')
      cy.get('.nav-left').should('contain', 'Edges: 52')

      // remove current graph and redirect to main
      cy.get('.network-graph-list-row').eq(1).find('.p-button').eq(0)
        .click()

      cy.wait(3000)

      cy.get('.nav-left').should('contain', 'Nodes: 305')
      cy.get('.nav-left').should('contain', 'Edges: 828')

      // check navigation buttons
      cy.get('.vis-up').click()
      cy.get('.vis-down').click()
      cy.get('.vis-left').click()
      cy.get('.vis-zoomIn').click()
      cy.get('.vis-zoomIn').click()
      cy.get('.vis-zoomExtends').click()
      cy.get('.vis-zoomOut').click()
      cy.get('.vis-zoomOut').click()

      // check that sidebar Arrow icon toggles sidebar
      cy.get('.sidebar-main').should('be.visible')
      cy.get('#sidebar-button-toggle').click()
      cy.get('.sidebar-main').should('not.be.exist')
      cy.get('#sidebar-button-toggle').click()
      cy.get('.sidebar-main').should('be.visible')

      // back to search
      cy.get('#back-button').click()
    })
  })
})
