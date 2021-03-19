/// <reference types="cypress" />
import authValid from '../fixtures/authValid'
import emptyNotes from '../fixtures/emptyNotes'
import graphResponse from '../fixtures/graphResponse'
import getStyling from '../fixtures/getStyling'

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

      cy.get('.graph-search-results-number').should('contain', 'Search results: 4')

      // click to show network graph
      cy.get('.graph-search-results-list').find('.p-card-buttons').eq(2).find('.p-button')
        .eq(1)
        .click()

      cy.get('#sidebar-button-graph-options').click()

      // cy.wait(3000)

      // Check number of nodes and edges at first loading
      cy.get('.nav-left').should('contain', 'Nodes: 22')
      cy.get('.nav-left').should('contain', 'Edges: 18')
      // cy.get('.nav-left').should('contain', 'Nodes: 200')
      // cy.get('.nav-left').should('contain', 'Edges: 517')

      // switch 3 main optinos
      cy.get('#upper-ontology-checkbox').click()
      cy.get('#subclass-checkbox').click()
      cy.get('#dataset-checkbox').click()

      // save and check new nodes and edges count
      cy.get('#network-graph-options-save').click()
      // cy.wait(13000)

      cy.get('.nav-left').should('contain', 'Nodes: 23')
      cy.get('.nav-left').should('contain', 'Edges: 18')
    })
  })
})
