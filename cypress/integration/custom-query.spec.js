/// <reference types="cypress" />
import authValid from '../fixtures/authValid'
import emptyNotes from '../fixtures/emptyNotes'
import graphResponse from '../fixtures/graphResponse'
import customQueryResponse from '../fixtures/customQueryResponse'
import getStyling from '../fixtures/getStyling'

context('Custom query', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  describe('Custom query', () => {
    it('Custom query should return results', () => {
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
        method: 'POST',
        url: '**/graph/query',
      }, customQueryResponse).as('postQuery')

      cy.intercept({
        method: 'GET',
        url: '**/api/ui/styling',
      }, getStyling).as('getStyling')

      cy.get('#email').type('valid@email.com')
      cy.get('#password').type('password')

      cy.get('.auth-button').click()

      cy.wait('@postLogin')

      cy.get('#main-search').type('link')

      cy.wait('@getGraph')

      cy.get('.p-autocomplete-item').click()

      cy.get('.graph-search-results-number').should('contain', 'Search results: 6')

      // click to show network graph
      cy.get('.graph-search-results-list').find('.p-card-buttons').eq(4).find('.p-button')
        .eq(1)
        .click()

      cy.wait(1000)

      // shows subgraph
      cy.get('.nav-left').should('contain', 'Nodes: 11')
      cy.get('.nav-left').should('contain', 'Edges: 19')

      // click the custom query sidebar icon
      cy.get('#sidebar-button-custom-query').click()

      // should have two items in query history
      cy.get('.custom-query-row').should('have.length', 2)

      // get results from manual search
      cy.get('.custom-query-editor').find('textarea').type('V().hasLabel(\'class\').count()')

      // query and get result
      cy.get('.custom-query-buttons-button').eq(1).click()

      cy.wait('@postQuery')

      // check if JSON result is displayed
      cy.get('.react-json-view').should('be.visible')

      // check that json export works
      cy.get('.custom-query-buttons-button').eq(2).click()

      // check that clear button works
      cy.get('.custom-query-buttons-button').eq(0).click()

      // check that query history is longer
      cy.get('.custom-query-row').should('have.length', 3)

      // check that textarea value is equal to value pressed in query history
      cy.get('.custom-query-row').eq(1).find('.custom-query-row-main').find('.p-button')
        .click()
      cy.get('.custom-query-editor').find('textarea').should('have.value', 'g.V().has(\'id\', 48).bothE().otherV().path().unfold().dedup().valueMap()')

      // check that element is removed from query history
      cy.get('.custom-query-row').eq(1).find('.custom-query-row-delete').find('.p-button')
        .click()
      cy.get('.custom-query-row').should('have.length', 2)
    })
  })
})
