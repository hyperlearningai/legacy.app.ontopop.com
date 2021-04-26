/// <reference types="cypress" />
import authValid from '../fixtures/authValid'
import emptyNotes from '../fixtures/emptyNotes'
import graphResponse from '../fixtures/graphResponse'
import getStyling from '../fixtures/getStyling'
import linkAutocomplete from '../fixtures/linkAutocomplete'
import linkSearch from '../fixtures/linkSearch'
import { ROUTE_SHORTEST_PATH } from '../../src/constants/routes'
import showTourLs from '../fixtures/showTourLs'

context('Shortest path', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#accept-all-btn').click()
    window.localStorage.setItem('showTour', showTourLs)
  })

  describe('Shortest path', () => {
    it('Shortest path should return results', () => {
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

      cy.get('#main-search').find('input').type('link', { force: true })

      cy.wait('@linkAutocomplete')

      cy.get('.p-autocomplete-item').eq(0).click()

      cy.wait('@linkSearch')

      cy.get('#card-visualise-btn-0').click()

      cy.wait(1000)

      // click the shortest path icon
      cy.get('#sidebar-button-shortest-path').click()

      cy.location('pathname').should('be.equal', ROUTE_SHORTEST_PATH)

      // choose starting node
      cy.get('#shortest-path-button-1').click()

      // select first node
      cy.get('#node-select-1').find('.p-dropdown-trigger').click({ force: true })
      cy.get('.p-dropdown-filter-container').find('.p-dropdown-filter').clear().type('loc', { force: true })
      cy.get('.p-dropdown-items-wrapper').find('.p-dropdown-item').eq(0).click({ force: true })

      // choose ending node
      cy.get('#shortest-path-button-2').click()

      // select first node
      cy.get('#node-select-2').find('.p-dropdown-trigger').click({ force: true })
      cy.get('.p-dropdown-filter-container').find('.p-dropdown-filter').clear().type('spe', { force: true })
      cy.get('.p-dropdown-items-wrapper').find('.p-dropdown-item').eq(0).click({ force: true })

      // check that shortest path button work
      cy.get('#shortest-path-show-btn').click()

      // shows subgraph
      cy.get('.nav-left').should('contain', 'Nodes: 4')
      cy.get('.nav-left').should('contain', 'Edges: 6')
    })

    it('Shortest path should return results when nodes/edges to exclude and overlay', () => {
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

      cy.get('#main-search').find('input').type('link', { force: true })

      cy.wait('@linkAutocomplete')

      cy.get('.p-autocomplete-item').eq(0).click()

      cy.wait('@linkSearch')

      cy.get('#card-visualise-btn-0').click()

      cy.wait(1000)

      // click the shortest path icon
      cy.get('#sidebar-button-shortest-path').click()

      // choose starting node
      cy.get('#shortest-path-button-1').click()

      // select first node
      cy.get('#node-select-1').find('.p-dropdown-trigger').click({ force: true })
      cy.get('.p-dropdown-filter-container').find('.p-dropdown-filter').clear().type('net')
      cy.get('.p-dropdown-items-wrapper').find('.p-dropdown-item').eq(0).click({ force: true })

      // choose ending node
      cy.get('#shortest-path-button-2').click()

      // select second node
      cy.get('#node-select-2').find('.p-dropdown-trigger').click({ force: true })
      cy.get('.p-dropdown-filter-container').find('.p-dropdown-filter').clear().type('clo')
      cy.get('.p-dropdown-items-wrapper').find('.p-dropdown-item').eq(0).click({ force: true })

      // select nodes to exclude
      cy.get('.p-accordion-header').find('a').click()

      cy.get('#excluded-nodes-select').find('.p-multiselect-trigger').click({ force: true })
      cy.get('.p-multiselect-filter-container').find('.p-multiselect-filter').clear().type('lin')
      cy.get('.p-multiselect-items-wrapper').find('.p-multiselect-item').eq(0).click({ force: true })

      cy.wait(1500)

      // select edges to exclude
      cy.get('#excluded-edges-select').find('.p-multiselect-trigger').click({ force: true })
      cy.get('.p-multiselect-filter-container').find('.p-multiselect-filter').eq(1).type('subcla')
      cy.get('.p-multiselect-items-wrapper').find('.p-multiselect-item').eq(0).click({ force: true })

      // overlay checkbox
      cy.get('#overlay-checkbox').click()

      // check that shortest path button work
      cy.get('#shortest-path-show-btn').click()

      // shows subgraph
      cy.get('.nav-left').should('contain', 'Nodes: 24')
      cy.get('.nav-left').should('contain', 'Edges: 52')
    })
  })
})
