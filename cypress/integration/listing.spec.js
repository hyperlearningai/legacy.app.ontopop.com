/// <reference types="cypress" />
import authValid from '../fixtures/authValid'
import emptyNotes from '../fixtures/emptyNotes'
import graphResponse from '../fixtures/graphResponse'
import { ROUTE_LISTING, ROUTE_SEARCH } from '../../src/constants/routes'
import getStyling from '../fixtures/getStyling'
import showTourLs from '../fixtures/showTourLs'

context('Listing', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.get('#accept-all-btn').click()
    window.localStorage.setItem('showTour', showTourLs)
  })

  describe('Listing', () => {
    it('Links and buttons should work', () => {
      cy.intercept({
        method: 'POST',
        url: '**/login',
      }, authValid).as('postLogin')

      cy.intercept({
        method: 'POST',
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

      cy.get('#auth-login-button').click()

      cy.wait('@postLogin')

      cy.get('.auth-error').should('not.be.exist')

      cy.wait(500)

      cy.location('pathname').should('be.equal', ROUTE_LISTING)

      cy.get('.p-datatable-tbody').find('tr').should('have.length', 1)

      cy.get('.p-link').should('have.attr', 'href', 'https://highwaysengland.co.uk/')

      cy.get('.pi-chevron-down').click()

      cy.get('.p-menuitem-link').eq(1).find('.p-menuitem-text').should('have.text', 'Open in WebProtege')

      cy.get('.p-menuitem-link').eq(0).click()

      cy.wait(1000)

      cy.location('pathname').should('be.equal', ROUTE_SEARCH)
    })
  })
})
