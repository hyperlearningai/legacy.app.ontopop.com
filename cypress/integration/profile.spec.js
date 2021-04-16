/// <reference types="cypress" />
import authValid from '../fixtures/authValid'
import emptyNotes from '../fixtures/emptyNotes'
import graphResponse from '../fixtures/graphResponse'
import getStyling from '../fixtures/getStyling'
import { ROUTE_LOGIN } from '../../src/constants/routes'

context('Profile', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('Profile', () => {
    it('Editing profile and logout should work', () => {
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

      cy.get('.p-datatable-tbody').find('tr').should('have.length', 1)

      cy.get('.pi-chevron-down').click()

      cy.get('.p-menuitem-link').eq(0).click()

      cy.wait(1000)

      cy.wait('@getGraph')

      // Visit profile page
      cy.get('#overlay-menu-button').click()
      cy.get('#overlay-menu-profile').click()

      // update profile info
      cy.get('#edit-first-name').click()
      cy.get('#first-name').type('Name')
      cy.get('#set-first-name').click()

      cy.get('#edit-last-name').click()
      cy.get('#last-name').type('Last name')
      cy.get('#set-last-name').click()

      cy.get('#edit-email').click()
      cy.get('#email').type('.com')
      cy.get('#set-email').click()

      cy.get('#edit-company').click()
      cy.get('#company').type('Company')
      cy.get('#set-company').click()

      // back home
      cy.get('#overlay-menu-button').click()
      cy.get('#overlay-menu-search').click()

      cy.wait(1000)

      cy.get('#overlay-menu-button').click()
      cy.get('#overlay-menu-home').click()

      cy.get('.pi-chevron-down').click()

      cy.get('.p-menuitem-link').eq(0).click()

      // logout
      cy.get('#overlay-menu-button').click()
      cy.get('#overlay-menu-logout').click()

      cy.wait(1000)

      cy.location('pathname').should('be.equal', ROUTE_LOGIN)
    })
  })
})
