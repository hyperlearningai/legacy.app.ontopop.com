/// <reference types="cypress" />
import authValid from '../fixtures/authValid'
import emptyNotes from '../fixtures/emptyNotes'
import graphResponse from '../fixtures/graphResponse'
import getStyling from '../fixtures/getStyling'
import linkAutocomplete from '../fixtures/linkAutocomplete'
import linkSearch from '../fixtures/linkSearch'
import { ROUTE_SETTINGS } from '../../src/constants/routes'

context('Physics settings', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('Physics settings', () => {
    it('Physics settings should return results', () => {
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

      // click the physics settings sidebar icon
      cy.get('#sidebar-button-settings').click()

      cy.location('pathname').should('be.equal', ROUTE_SETTINGS)

      // should toggle physics
      cy.get('.network-settings-buttons').eq(0).find('.p-button').should('have.class', 'p-button p-component')
        .click()
      cy.get('.network-settings-buttons').eq(0).find('.p-button').should('have.class', 'p-button p-component network-settings-buttons-button-selected')

      // should toggle positioning
      cy.get('.network-settings-buttons').eq(1).find('.p-button').eq(0)
        .should('have.class', 'p-button p-component')
      cy.get('.network-settings-buttons').eq(1).find('.p-button').eq(1)
        .should('have.class', 'p-button p-component network-settings-buttons-button-selected')
      cy.get('.network-settings-buttons').eq(1).find('.p-button').eq(0)
        .click()
      cy.get('.network-settings-buttons').eq(1).find('.p-button').eq(1)
        .should('have.class', 'p-button p-component')
      cy.get('.network-settings-buttons').eq(1).find('.p-button').eq(0)
        .should('have.class', 'p-button p-component network-settings-buttons-button-selected')
      cy.get('.network-settings-buttons').eq(1).find('.p-button').should('have.class', 'p-button p-component network-settings-buttons-button-selected')

      // should toggle repulsion
      cy.get('.network-settings-buttons').eq(2).find('.p-button').eq(1)
        .should('have.class', 'p-button p-component')
      cy.get('.network-settings-buttons').eq(2).find('.p-button').eq(0)
        .should('have.class', 'p-button p-component network-settings-buttons-button-selected')
      cy.get('.network-settings-buttons').eq(2).find('.p-button').eq(1)
        .click()
      cy.get('.network-settings-buttons').eq(2).find('.p-button').eq(0)
        .should('have.class', 'p-button p-component')
      cy.get('.network-settings-buttons').eq(2).find('.p-button').eq(1)
        .should('have.class', 'p-button p-component network-settings-buttons-button-selected')
      cy.get('.network-settings-buttons').eq(2).find('.p-button').should('have.class', 'p-button p-component network-settings-buttons-button-selected')
    })
  })
})
