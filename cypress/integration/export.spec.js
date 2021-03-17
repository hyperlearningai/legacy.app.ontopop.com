/// <reference types="cypress" />
import authValid from '../fixtures/authValid'
import emptyNotes from '../fixtures/emptyNotes'
import graphResponse from '../fixtures/graphResponse'

context('Export', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  describe('Export', () => {
    it('Export should return results', () => {
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

      cy.get('#main-search').type('record')

      cy.wait('@getGraph')

      cy.get('.p-autocomplete-item').click()

      cy.get('.graph-search-results-number').should('contain', 'Search results: 16')

      // click to show network graph
      cy.get('.graph-search-results-list').find('.p-card-buttons').eq(15).find('.p-button')
        .eq(1)
        .click()

      cy.wait(1000)

      // shows subgraph
      cy.get('.nav-left').should('contain', 'Nodes: 13')
      cy.get('.nav-left').should('contain', 'Edges: 20')

      // click the export sidebar icon
      cy.get('#sidebar-button-export').click()

      // change file name
      cy.get('#filename').clear().type('new-file')

      // export images
      cy.get('.export-settings-buttons').eq(0).find('.p-button').eq(0)
        .click()
      cy.get('.export-settings-buttons').eq(0).find('.p-button').eq(1)
        .click()
      cy.get('.export-settings-buttons').eq(0).find('.p-button').eq(2)
        .click()

      // export data
      cy.get('.export-settings-buttons').eq(1).find('.p-button').eq(0)
        .click()
      cy.get('.export-settings-buttons').eq(1).find('.p-button').eq(1)
        .click()

      // print
      cy.get('.export-settings-buttons').eq(2).find('.p-button-label').should('have.text', 'Print')
    })
  })
})
