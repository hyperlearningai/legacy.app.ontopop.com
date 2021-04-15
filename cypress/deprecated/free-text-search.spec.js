/// <reference types="cypress" />
import authValid from '../fixtures/authValid'
import emptyNotes from '../fixtures/emptyNotes'
import graphResponse from '../fixtures/graphResponse'
import getStyling from '../fixtures/getStyling'
import linkAutocomplete from '../fixtures/linkAutocomplete'
import linkSearch from '../fixtures/linkSearch'
import { ROUTE_FREE_TEXT_SEARCH } from '../../src/constants/routes'

context('Free text search', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('Free text search', () => {
    it('Free-text search should return results', () => {
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

      // click the free text search icon
      cy.get('#sidebar-button-free-text-search').click()

      cy.location('pathname').should('be.equal', ROUTE_FREE_TEXT_SEARCH)

      cy.get('.freetext-search-input').find('.p-inputtext').type('main')

      cy.get('.freetext-search-row').should('have.length', 9)

      // press on first element
      cy.get('.freetext-search-row').eq(0).find('.p-button').eq(1)
        .click()

      // remove one item
      cy.get('.freetext-search-row').eq(0).find('.p-button').eq(0)
        .click()

      cy.get('.freetext-search-row').should('have.length', 8)
    })
  })
})
