/// <reference types="cypress" />
import authValid from '../fixtures/authValid'
import emptyNotes from '../fixtures/emptyNotes'
import graphResponse from '../fixtures/graphResponse'
import getStyling from '../fixtures/getStyling'
import linkAutocomplete from '../fixtures/linkAutocomplete'
import linkSearch from '../fixtures/linkSearch'
import { ROUTE_EXPORT } from '../../src/constants/routes'
import showTourLs from '../fixtures/showTourLs'

context('Export', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#accept-all-btn').click()
    window.localStorage.setItem('showTour', showTourLs)
  })

  describe('Export', () => {
    it('Export should return results', () => {
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

      cy.get('#auth-login-button').click()

      cy.wait('@postLogin')

      cy.get('.p-datatable-tbody').find('tr').should('have.length', 1)

      cy.get('.pi-chevron-down').click()

      cy.get('.p-menuitem-link').eq(0).click()

      cy.wait(1000)

      cy.get('#main-search').type('link')

      cy.wait('@linkAutocomplete')

      cy.get('.p-autocomplete-item').eq(0).click()

      cy.wait('@linkSearch')

      cy.get('#card-visualise-btn-0').click()

      cy.wait(1000)

      // click the export sidebar icon
      cy.get('#sidebar-button-export').click()

      cy.location('pathname').should('be.equal', ROUTE_EXPORT)

      // change file name
      cy.get('#filename').clear().type('new-file')

      // export images
      cy.get('.export-settings-buttons').eq(0).find('.p-button-label').eq(0)
        .should('have.text', 'JPG')

      cy.get('.export-settings-buttons').eq(0).find('.p-button-label').eq(1)
        .should('have.text', 'PNG')

      cy.get('.export-settings-buttons').eq(0).find('.p-button-label').eq(2)
        .should('have.text', 'PDF')

      // export data
      cy.get('.export-settings-buttons').eq(1).find('.p-button-label').eq(0)
        .should('have.text', 'CSV')

      cy.get('.export-settings-buttons').eq(1).find('.p-button-label').eq(1)
        .should('have.text', 'OWL')

      // print
      cy.get('.export-settings-buttons').eq(2).find('.p-button-label').should('have.text', 'Print')
    })
  })
})
