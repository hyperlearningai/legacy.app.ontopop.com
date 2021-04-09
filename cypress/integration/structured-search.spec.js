/// <reference types="cypress" />
import authValid from '../fixtures/authValid'
import emptyNotes from '../fixtures/emptyNotes'
import graphResponse from '../fixtures/graphResponse'
import getStyling from '../fixtures/getStyling'
import linkAutocomplete from '../fixtures/linkAutocomplete'
import linkSearch from '../fixtures/linkSearch'
import { ROUTE_STRUCTURED_SEARCH } from '../../src/constants/routes'

context('Structured search', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
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

      cy.get('.auth-button').click()

      cy.wait('@postLogin')

      cy.get('#main-search').type('link')

      cy.wait('@linkAutocomplete')

      cy.get('.p-autocomplete-item').eq(0).click()

      cy.wait('@linkSearch')

      cy.get('#card-visualise-btn-0').click()

      cy.wait(1000)

      // click the structured search icon
      cy.get('#sidebar-button-structured-search').click()

      cy.location('pathname').should('be.equal', ROUTE_STRUCTURED_SEARCH)

      // AND search should work

      // first AND filter
      cy.get('#structured-search-property-0').find('.p-dropdown-trigger').click({ force: true })
      cy.get('.p-dropdown-filter-container').find('.p-dropdown-filter').type('rdfs')
      cy.get('.p-dropdown-items-wrapper').find('.p-dropdown-item').eq(0).click({ force: true })
      cy.get('#structured-search-value-0').type('o')

      // second AND filter
      cy.get('#structured-search-property-1').find('.p-dropdown-trigger').click({ force: true })
      cy.get('.p-dropdown-filter-container').find('.p-dropdown-filter').type('rdfs')
      cy.get('.p-dropdown-items-wrapper').find('.p-dropdown-item').eq(0).click({ force: true })
      cy.get('#structured-search-value-1').type('del')

      cy.get('.structured-search-button-wrapper').find('.p-button').click()

      cy.get('.structured-search-text').should('contain', 'Elements found: 1')

      // press on first element
      cy.get('.structured-search-results-row').eq(0).find('.p-button').eq(1)
        .click()

      // remove one item
      cy.get('.structured-search-results-row').eq(0).find('.p-button').eq(0)
        .click()

      // OR search should work
      cy.get('.p-selectbutton').find('.p-button').eq(1).click()

      // first OR filter
      cy.get('#structured-search-property-0').find('.p-dropdown-trigger').click({ force: true })
      cy.get('.p-dropdown-filter-container').find('.p-dropdown-filter').type('rdfs')
      cy.get('.p-dropdown-items-wrapper').find('.p-dropdown-item').eq(0).click({ force: true })
      cy.get('#structured-search-value-0').clear().type('o')

      // second OR filter
      cy.get('#structured-search-property-1').find('.p-dropdown-trigger').click({ force: true })
      cy.get('.p-dropdown-filter-container').find('.p-dropdown-filter').type('rdfs')
      cy.get('.p-dropdown-items-wrapper').find('.p-dropdown-item').eq(0).click({ force: true })
      cy.get('#structured-search-value-1').clear().type('del')

      cy.get('.structured-search-button-wrapper').find('.p-button').click()

      cy.get('.structured-search-text').should('contain', 'Elements found: 57')

      // press on first element
      cy.get('.structured-search-results-row').eq(0).find('.p-button').eq(1)
        .click()

      // remove one item
      cy.get('.structured-search-results-row').eq(0).find('.p-button').eq(0)
        .click()

      cy.get('.structured-search-text').should('contain', 'Elements found: 56')
    })
  })
})
