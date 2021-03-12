/// <reference types="cypress" />
import authValid from '../fixtures/authValid'
import emptyNotes from '../fixtures/emptyNotes'
import graphResponse from '../fixtures/graphResponse'

context('Network graph', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
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

      cy.get('#email').type('valid@email.com')
      cy.get('#password').type('password')

      cy.get('.auth-button').click()

      cy.wait('@postLogin')

      cy.get('[name="search"').type('link')

      cy.wait('@getGraph')

      cy.get('.p-autocomplete-item').click()

      cy.get('.graph-search-results-number').should('contain', 'Search results: 6')

      // click to show network graph
      cy.get('.graph-search-results-list').find('.p-card-buttons').eq(1).find('.p-button')
        .eq(1)
        .click()

      // shows subgraph
      cy.get('.nav-left').should('contain', 'Nodes: 13')
      cy.get('.nav-left').should('contain', 'Edges: 24')

      // click to Main
      cy.get('.network-graph-list-row').eq(0).find('.p-button').click()

      cy.wait(2000)

      cy.get('.nav-left').should('contain', 'Nodes: 203')
      cy.get('.nav-left').should('contain', 'Edges: 551')

      // click to Main
      cy.get('.network-graph-list-row').eq(1).find('.p-button').eq(1)
        .click()

      cy.wait(1000)

      // shows subgraph
      cy.get('.nav-left').should('contain', 'Nodes: 13')
      cy.get('.nav-left').should('contain', 'Edges: 24')

      // remove current graph and redirect to main
      cy.get('.network-graph-list-row').eq(1).find('.p-button').eq(0)
        .click()

      cy.wait(2000)

      cy.get('.nav-left').should('contain', 'Nodes: 203')
      cy.get('.nav-left').should('contain', 'Edges: 551')

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
      cy.get('.sidebar-icons').find('.p-button').eq(17).click()
      cy.get('.sidebar-main').should('not.be.exist')
      cy.get('.sidebar-icons').find('.p-button').eq(17).click()
      cy.get('.sidebar-main').should('be.visible')
    })
  })
})
