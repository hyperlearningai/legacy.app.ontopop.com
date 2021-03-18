/// <reference types="cypress" />
import authValid from '../fixtures/authValid'
import emptyNotes from '../fixtures/emptyNotes'
import graphResponse from '../fixtures/graphResponse'
import getStyling from '../fixtures/getStyling'

context('Shortest path', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
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

      cy.get('#email').type('valid@email.com')
      cy.get('#password').type('password')

      cy.get('.auth-button').click()

      cy.wait('@postLogin')

      cy.get('#main-search').type('value')

      cy.wait('@getGraph')

      cy.get('.p-autocomplete-item').click()

      cy.get('.graph-search-results-number').should('contain', 'Search results: 5')

      // click to show network graph
      cy.get('.graph-search-results-list').find('.p-card-buttons').eq(2).find('.p-button')
        .eq(1)
        .click()

      cy.wait(1000)

      // shows subgraph
      cy.get('.nav-left').should('contain', 'Nodes: 11')
      cy.get('.nav-left').should('contain', 'Edges: 14')

      // click the shortest path icon
      cy.get('.sidebar-icons').find('.p-button').eq(10).click()

      // choose starting node
      cy.get('#shortest-path-button-1').click()

      // select first node
      cy.get('#node-select-1').find('.p-dropdown-trigger').click({ force: true })
      cy.get('#node-select-1').find('.p-dropdown-filter').type('asset')
      cy.get('#node-select-1').find('.p-dropdown-item').eq(0).click({ force: true })

      // choose ending node
      cy.get('#shortest-path-button-2').click()

      // select first node
      cy.get('#node-select-2').find('.p-dropdown-trigger').click({ force: true })
      cy.get('#node-select-2').find('.p-dropdown-filter').type('equi')
      cy.get('#node-select-2').find('.p-dropdown-item').eq(0).click({ force: true })

      // check that shortest path button work
      cy.get('.shortest-path-show-button').click()

      // shows subgraph
      cy.get('.nav-left').should('contain', 'Nodes: 2')
      cy.get('.nav-left').should('contain', 'Edges: 1')
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

      cy.get('#email').type('valid@email.com')
      cy.get('#password').type('password')

      cy.get('.auth-button').click()

      cy.wait('@postLogin')

      cy.get('#main-search').type('value')

      cy.wait('@getGraph')

      cy.get('.p-autocomplete-item').click()

      cy.get('.graph-search-results-number').should('contain', 'Search results: 5')

      // click to show network graph
      cy.get('.graph-search-results-list').find('.p-card-buttons').eq(2).find('.p-button')
        .eq(1)
        .click()

      cy.wait(1000)

      // shows subgraph
      cy.get('.nav-left').should('contain', 'Nodes: 11')
      cy.get('.nav-left').should('contain', 'Edges: 14')

      // click the shortest path icon
      cy.get('.sidebar-icons').find('.p-button').eq(10).click()

      // choose starting node
      cy.get('#shortest-path-button-1').click()

      // select first node
      cy.get('#node-select-1').find('.p-dropdown-trigger').click({ force: true })
      cy.get('#node-select-1').find('.p-dropdown-filter').type('strat')
      cy.get('#node-select-1').find('.p-dropdown-item').eq(0).click({ force: true })

      // choose ending node
      cy.get('#shortest-path-button-2').click()

      // select first node
      cy.get('#node-select-2').find('.p-dropdown-trigger').click({ force: true })
      cy.get('#node-select-2').find('.p-dropdown-filter').type('prod')
      cy.get('#node-select-2').find('.p-dropdown-item').eq(0).click({ force: true })

      // select nodes to exclude
      cy.get('#excluded-nodes-select').find('.p-multiselect-trigger').click({ force: true })
      cy.get('#excluded-nodes-select').find('.p-multiselect-filter').type('sys')
      cy.get('#excluded-nodes-select').find('.p-multiselect-item').eq(0).click({ force: true })

      // select edges to exclude
      cy.get('#excluded-edges-select').find('.p-multiselect-trigger').click({ force: true })
      cy.get('#excluded-edges-select').find('.p-multiselect-filter').type('subcla')
      cy.get('#excluded-edges-select').find('.p-multiselect-item').eq(0).click({ force: true })

      // overlay checkbox
      cy.get('#overlay-checkbox').click()

      // check that shortest path button work
      cy.get('.shortest-path-show-button').click()

      // shows subgraph
      cy.get('.nav-left').should('contain', 'Nodes: 11')
      cy.get('.nav-left').should('contain', 'Edges: 14')
    })
  })
})
