/// <reference types="cypress" />
import authValid from '../fixtures/authValid'
import emptyNotes from '../fixtures/emptyNotes'
import graphResponse from '../fixtures/graphResponse'

context('Physics settings', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  describe('Physics settings', () => {
    it('Physics settings should return results', () => {
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

      cy.get('#main-search').type('link')

      cy.wait('@getGraph')

      cy.get('.p-autocomplete-item').click()

      cy.get('.graph-search-results-number').should('contain', 'Search results: 6')

      // click to show network graph
      cy.get('.graph-search-results-list').find('.p-card-buttons').eq(5).find('.p-button')
        .eq(1)
        .click()

      cy.wait(1000)

      // shows subgraph
      cy.get('.nav-left').should('contain', 'Nodes: 6')
      cy.get('.nav-left').should('contain', 'Edges: 9')

      // click the physics settings sidebar icon
      cy.get('.sidebar-icons').find('.p-button').eq(12).click()

      // should toggle physics
      cy.get('.network-settings-buttons').eq(0).find('.p-button').should('have.class', 'p-button p-component')
        .click()
      cy.get('.network-settings-buttons').eq(0).find('.p-button').should('have.class', 'p-button p-component network-settings-buttons-button-selected')

      // should toggle positioning
      cy.get('.network-settings-buttons').eq(1).find('.p-button').eq(0)
        .should('have.class', 'p-button p-component')
      cy.get('.network-settings-buttons').eq(1).find('.p-button').eq(1)
        .should('have.class', 'p-button p-component network-settings-buttons-button-selected')
      cy.get('.network-settings-buttons').eq(1).find('.p-button').eq(0)
        .click()
      cy.get('.network-settings-buttons').eq(1).find('.p-button').eq(1)
        .should('have.class', 'p-button p-component')
      cy.get('.network-settings-buttons').eq(1).find('.p-button').eq(0)
        .should('have.class', 'p-button p-component network-settings-buttons-button-selected')
      cy.get('.network-settings-buttons').eq(1).find('.p-button').should('have.class', 'p-button p-component network-settings-buttons-button-selected')

      // should toggle repulsion
      cy.get('.network-settings-buttons').eq(2).find('.p-button').eq(1)
        .should('have.class', 'p-button p-component')
      cy.get('.network-settings-buttons').eq(2).find('.p-button').eq(0)
        .should('have.class', 'p-button p-component network-settings-buttons-button-selected')
      cy.get('.network-settings-buttons').eq(2).find('.p-button').eq(1)
        .click()
      cy.get('.network-settings-buttons').eq(2).find('.p-button').eq(0)
        .should('have.class', 'p-button p-component')
      cy.get('.network-settings-buttons').eq(2).find('.p-button').eq(1)
        .should('have.class', 'p-button p-component network-settings-buttons-button-selected')
      cy.get('.network-settings-buttons').eq(2).find('.p-button').should('have.class', 'p-button p-component network-settings-buttons-button-selected')
    })
  })
})
