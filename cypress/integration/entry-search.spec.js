/// <reference types="cypress" />
import authValid from '../fixtures/authValid'
import emptyNotes from '../fixtures/emptyNotes'
import getNodesNotes from '../fixtures/getNodesNotes'
import graphResponse from '../fixtures/graphResponse'
import getStyling from '../fixtures/getStyling'
import linkAutocomplete from '../fixtures/linkAutocomplete'
import emptyAutocomplete from '../fixtures/emptyAutocomplete'
import linkSearch from '../fixtures/linkSearch'
import emptySearch from '../fixtures/emptySearch'
import businessAreaValues from '../fixtures/businessAreaValues'
import { ROUTE_SEARCH } from '../../src/constants/routes'

context('Entry search', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  describe('Entry search', () => {
    it('searching for link should work', () => {
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
      }, getNodesNotes).as('getNodesNotes')

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

      cy.intercept({
        method: 'GET',
        url: '**/graph/nodes/properties/Business%20Area/values?unique=true',
      }, businessAreaValues).as('businessAreaValues')

      cy.get('#email').type('valid@email.com')
      cy.get('#password').type('password')

      cy.get('.auth-button').click()

      cy.wait('@postLogin')

      cy.location('pathname').should('be.equal', ROUTE_SEARCH)

      cy.get('#main-search').type('link')

      cy.wait('@linkAutocomplete')

      cy.get('.p-autocomplete-item').eq(0).click()

      cy.wait('@linkSearch')

      cy.get('.nav-left').should('contain', 'Search results: 1-10 of 44')

      // set result type
      cy.get('#data-type-option-class').click()
      cy.get('#ontology-type-option-true').click()

      // set advanced search
      cy.get('.p-accordion-header').find('a').click()
      cy.get('#advanced-search-property-0').find('.p-dropdown-trigger').click()
      cy.get('.p-dropdown-item').eq(1).click()

      cy.get('#advanced-search-value-0').type('test')
      cy.get('#advanced-search-plus-0').click()

      cy.get('.entry-search-block').should('have.length', 2)
      cy.get('#advanced-search-minus-1').click()
      cy.get('.entry-search-block').should('have.length', 1)

      cy.get('#advanced-search-property-0').find('.p-dropdown-trigger').click()
      cy.get('.p-dropdown-item').eq(0).click()
      cy.wait('@businessAreaValues')
      cy.get('#advanced-search-value-0').find('.p-dropdown-trigger').click()
      cy.get('.p-dropdown-item').eq(1).click()

      // check pagination
      cy.get('.p-paginator-page').eq(2).click()
      cy.get('.nav-left').should('contain', 'Search results: 21-30 of 44')

      // click on visualise
      cy.get('#card-visualise-btn-0').click()
      cy.get('.nav-left').should('contain', 'Nodes: 24')
      cy.get('.nav-left').should('contain', 'Edges: 52')
      cy.get('#sidebar-button-search').click()

      cy.get('#card-synonyms-btn-0').click()
      cy.get('#synonyms-select-element').find('.p-dropdown-label').should('contain', 'Link')
      cy.get('#sidebar-button-search').click()

      cy.get('#card-notes-btn-0').click()
      cy.get('#notes-select-element').find('.p-dropdown-label').should('contain', 'Link')
      cy.get('#sidebar-button-search').click()
    })

    it('no results page should work', () => {
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
      }, getNodesNotes).as('getNodesNotes')

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
      }, emptyAutocomplete).as('emptyAutocomplete')

      cy.intercept({
        method: 'POST',
        url: '**/search?api-version=2020-06-30',
      }, emptySearch).as('emptySearch')

      cy.intercept({
        method: 'GET',
        url: '**/graph/nodes/properties/Business%20Area/values?unique=true',
      }, businessAreaValues).as('businessAreaValues')

      cy.get('#email').type('valid@email.com')
      cy.get('#password').type('password')

      cy.get('.auth-button').click()

      cy.wait('@postLogin')

      cy.location('pathname').should('be.equal', ROUTE_SEARCH)

      cy.get('#main-search').type('abc123')

      cy.wait('@emptyAutocomplete')

      cy.get('.p-autocomplete-item').eq(0).click()

      cy.wait('@emptySearch')

      cy.get('.nav-left').should('contain', 'Search results: 0 of 0')

      // click on visualise
      cy.get('#visualise-ontology-button').click()

      cy.wait(3000)

      cy.get('.nav-left').should('contain', 'Nodes: 320')
      cy.get('.nav-left').should('contain', 'Edges: 828')
    })
  })
})
