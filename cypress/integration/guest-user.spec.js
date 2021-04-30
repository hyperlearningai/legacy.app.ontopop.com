/// <reference types="cypress" />
import emptyNotes from '../fixtures/emptyNotes'
import getNodesNotes from '../fixtures/getNodesNotes'
import graphResponse from '../fixtures/graphResponse'
import getStyling from '../fixtures/getStyling'
import linkAutocomplete from '../fixtures/linkAutocomplete'
import linkSearch from '../fixtures/linkSearch'
import businessAreaValues from '../fixtures/businessAreaValues'
import { ROUTE_SEARCH } from '../../src/constants/routes'

context('Guest user', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#open-app').click()
    cy.get('#accept-all-btn').click()
  })

  describe('Guest user', () => {
    it('Guest user signin should work', () => {
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

      cy.get('#guest-login-button').click()

      cy.wait(1000)

      cy.get('.p-splitbutton-defaultbutton').click()

      cy.wait(10000)

      cy.location('pathname').should('be.equal', ROUTE_SEARCH)

      cy.get('.sidebar-icons').find('button').should('have.length', 11)
    })
  })
})
