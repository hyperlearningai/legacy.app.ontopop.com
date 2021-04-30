/// <reference types="cypress" />
import authNotValid from '../fixtures/authNotValid'
import authValid from '../fixtures/authValid'
import emptyNotes from '../fixtures/emptyNotes'
import graphResponse from '../fixtures/graphResponse'
import { ROUTE_LISTING } from '../../src/constants/routes'
import getStyling from '../fixtures/getStyling'

context('Auth', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#open-app').click()
    cy.get('#accept-all-btn').click()
  })

  describe('Auth', () => {
    it('credentials should be wrong', () => {
      cy.intercept({
        method: 'POST',
        url: '**/login',
      }, authNotValid).as('postLogin')

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

      cy.get('#email').type('wrong@email.com')
      cy.get('#password').type('password')

      cy.get('#auth-login-button').click()

      cy.wait('@postLogin')

      cy.get('.auth-error').should('contain', 'Invalid Email or Password')
    })

    it('credentials should be valid', () => {
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
    })
  })
})
