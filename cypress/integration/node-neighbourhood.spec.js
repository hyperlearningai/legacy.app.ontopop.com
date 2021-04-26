/// <reference types="cypress" />
import authValid from '../fixtures/authValid'
import emptyNotes from '../fixtures/emptyNotes'
import graphResponse from '../fixtures/graphResponse'
import getStyling from '../fixtures/getStyling'
import linkAutocomplete from '../fixtures/linkAutocomplete'
import linkSearch from '../fixtures/linkSearch'
import { ROUTE_NODE_NEIGHBOURHOOD } from '../../src/constants/routes'
import showTourLs from '../fixtures/showTourLs'

context('Node neighbourhood', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#accept-all-btn').click()
    window.localStorage.setItem('showTour', showTourLs)
  })

  describe('Node neighbourhood', () => {
    it('Node neighbourhood should return results', () => {
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

      // click the node neighbourhood icon
      cy.get('#sidebar-button-node-neighbourhood').click()

      cy.location('pathname').should('be.equal', ROUTE_NODE_NEIGHBOURHOOD)

      // select first node
      cy.get('#node-select').find('.p-dropdown-trigger').click({ force: true })
      cy.get('.p-dropdown-filter-container').find('.p-dropdown-filter').clear().type('loc')
      cy.get('.p-dropdown-items-wrapper').find('.p-dropdown-item').eq(0).click({ force: true })

      // check that separation degree up/down buttons work
      cy.get('.p-button-success').click()
      cy.get('.p-button-success').click()
      cy.get('.p-button-danger').click()

      cy.get('#separation-degree').find('.p-inputnumber-input').should('have.value', 2)

      cy.get('#node-neighbourhood-btn').click()

      cy.wait(1000)

      // shows subgraph
      cy.get('.nav-left').should('contain', 'Nodes: 161')
      cy.get('.nav-left').should('contain', 'Edges: 515')
    })
  })
})
