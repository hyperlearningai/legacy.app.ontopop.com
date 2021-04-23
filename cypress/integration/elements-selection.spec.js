/// <reference types="cypress" />
import authValid from '../fixtures/authValid'
import emptyNotes from '../fixtures/emptyNotes'
import graphResponse from '../fixtures/graphResponse'
import getStyling from '../fixtures/getStyling'
import linkAutocomplete from '../fixtures/linkAutocomplete'
import linkSearch from '../fixtures/linkSearch'
import { ROUTE_ELEMENTS_SELECTION } from '../../src/constants/routes'

context('Elements selection', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#accept-all-btn').click()
  })

  describe('Elements selection', () => {
    it('Elements selection should return results', () => {
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
        url: '**/graph/elements/notes',
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

      // click the nodes selection icon
      cy.get('#sidebar-button-elements-selection').click()

      cy.wait(500)

      cy.location('pathname').should('be.equal', ROUTE_ELEMENTS_SELECTION)

      // select first node
      cy.get('#element-select').find('.p-dropdown-trigger').click({ force: true })
      cy.get('.p-dropdown-filter-container').find('.p-dropdown-filter').clear().type('rou')
      cy.get('.p-dropdown-items-wrapper').find('.p-dropdown-item').eq(0).click({ force: true })

      cy.get('.elements-selection-details-table-properties').find('.elements-selection-details-table-row').should('have.length', '10')
      cy.get('.elements-selection-details-table-relationships').find('.elements-selection-details-table-row').should('have.length', '2')

      // select another node
      cy.get('#element-select').find('.p-dropdown-trigger').click({ force: true })
      cy.get('.p-dropdown-filter-container').find('.p-dropdown-filter').clear().type('lin')
      cy.get('.p-dropdown-items-wrapper').find('.p-dropdown-item').eq(0).click({ force: true })

      cy.get('.elements-selection-details-table-properties').find('.elements-selection-details-table-row').should('have.length', '9')
      cy.get('.elements-selection-details-table-relationships').find('.elements-selection-details-table-row').should('have.length', '25')

      // change type to edge
      cy.get('#element-type-select').find('.p-button').eq(1).click()

      // select first edge
      cy.get('#element-select').find('.p-dropdown-trigger').click({ force: true })
      cy.get('.p-dropdown-filter-container').find('.p-dropdown-filter').clear().type('lin')
      cy.get('.p-dropdown-items-wrapper').find('.p-dropdown-item').eq(0).click({ force: true })

      cy.get('.elements-selection-details-table-properties').find('.elements-selection-details-table-row').should('have.length', '2')
      cy.get('.elements-selection-details-table-relationships').find('.elements-selection-details-table-row').should('have.length', '2')

      // select another edge
      cy.get('#element-select').find('.p-dropdown-trigger').click({ force: true })
      cy.get('.p-dropdown-filter-container').find('.p-dropdown-filter').clear().type('in')
      cy.get('.p-dropdown-items-wrapper').find('.p-dropdown-item').eq(0).click({ force: true })

      cy.get('.elements-selection-details-table-properties').find('.elements-selection-details-table-row').should('have.length', '2')
      cy.get('.elements-selection-details-table-relationships').find('.elements-selection-details-table-row').should('have.length', '2')
    })
  })
})
