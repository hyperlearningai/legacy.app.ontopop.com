/// <reference types="cypress" />
import authValid from '../fixtures/authValid'
import emptyNotes from '../fixtures/emptyNotes'
import graphResponse from '../fixtures/graphResponse'
import getStyling from '../fixtures/getStyling'
import { ROUTE_STRUCTURED_SEARCH } from '../../src/constants/routes'

context('Structured search', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login')
  })

  describe('Structured search', () => {
    it('Structured search should return results', () => {
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

      cy.get('#main-search').type('asset')

      cy.wait('@getGraph')

      cy.get('.p-autocomplete-item').click()

      cy.get('.graph-search-results-number').should('contain', 'Search results for asset: 52')

      // click to show network graph
      cy.get('.graph-search-results-list').find('.p-card-buttons').eq(4).find('.p-button')
        .eq(1)
        .click()

      cy.wait(1000)

      // shows subgraph
      cy.get('.nav-left').should('contain', 'Nodes: 8')
      cy.get('.nav-left').should('contain', 'Edges: 11')

      // click the structured search icon
      cy.get('#sidebar-button-structured-search').click()

      cy.location('pathname').should('be.equal', ROUTE_STRUCTURED_SEARCH)

      // AND search should work

      // first AND filter
      cy.get('#structured-search-property-0').find('.p-dropdown-trigger').click({ force: true })
      cy.get('#structured-search-property-0').find('.p-dropdown-filter').type('rdfs')
      cy.get('#structured-search-property-0').find('.p-dropdown-item').click({ force: true })
      cy.get('#structured-search-value-0').type('o')

      // second AND filter
      cy.get('#structured-search-property-1').find('.p-dropdown-trigger').click({ force: true })
      cy.get('#structured-search-property-1').find('.p-dropdown-filter').type('rdfs')
      cy.get('#structured-search-property-1').find('.p-dropdown-item').click({ force: true })
      cy.get('#structured-search-value-1').type('del')

      cy.get('.structured-search-button-wrapper').find('.p-button').click()

      cy.get('.structured-search-text').should('contain', 'Elements found: 2')

      // press on first element
      cy.get('.structured-search-results-row').eq(0).find('.p-button').eq(1)
        .click()

      // remove one item
      cy.get('.structured-search-results-row').eq(0).find('.p-button').eq(0)
        .click()

      cy.get('.structured-search-text').should('contain', 'Elements found: 1')

      // OR search should work
      cy.get('.sidebar-main-title').find('.p-button').click()

      cy.get('.p-selectbutton').find('.p-button').eq(1).click()

      // first OR filter
      cy.get('#structured-search-property-0').find('.p-dropdown-trigger').click({ force: true })
      cy.get('#structured-search-property-0').find('.p-dropdown-filter').clear().type('rdfs')
      cy.get('#structured-search-property-0').find('.p-dropdown-item').click({ force: true })
      cy.get('#structured-search-value-0').clear().type('o')

      // second OR filter
      cy.get('#structured-search-property-1').find('.p-dropdown-trigger').click({ force: true })
      cy.get('#structured-search-property-1').find('.p-dropdown-filter').clear().type('rdfs')
      cy.get('#structured-search-property-1').find('.p-dropdown-item').click({ force: true })
      cy.get('#structured-search-value-1').clear().type('del')

      cy.get('.structured-search-button-wrapper').find('.p-button').click()

      cy.get('.structured-search-text').should('contain', 'Elements found: 15')

      // press on first element
      cy.get('.structured-search-results-row').eq(0).find('.p-button').eq(1)
        .click()

      // remove one item
      cy.get('.structured-search-results-row').eq(0).find('.p-button').eq(0)
        .click()

      cy.get('.structured-search-text').should('contain', 'Elements found: 14')
    })
  })
})
