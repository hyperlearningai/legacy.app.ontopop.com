/// <reference types="cypress" />
import authValid from '../fixtures/authValid'
import graphResponse from '../fixtures/graphResponse'
import getNodesSynonyms from '../fixtures/getNodesSynonyms'
import deleteNodeSynonym from '../fixtures/deleteNodeSynonym'
import createNodeSynonym from '../fixtures/createNodeSynonym'
import updateNodeSynonym from '../fixtures/updateNodeSynonym'
import getStyling from '../fixtures/getStyling'
import linkAutocomplete from '../fixtures/linkAutocomplete'
import linkSearch from '../fixtures/linkSearch'
import { ROUTE_SYNONYMS } from '../../src/constants/routes'
import showTourLs from '../fixtures/showTourLs'

context('Synonyms list', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#accept-all-btn').click()
    window.localStorage.setItem('showTour', showTourLs)
  })

  describe('Synonyms list', () => {
    it('Nodes synonyms list should return results', () => {
      cy.intercept({
        method: 'POST',
        url: '**/login',
      }, authValid).as('postLogin')

      cy.intercept({
        method: 'GET',
        url: '**/graph/node/*/synonyms',
      }, getNodesSynonyms).as('getNodesSynonyms')

      cy.intercept({
        method: 'GET',
        url: '**/graph?model=1',
      }, graphResponse).as('getGraph')

      cy.intercept({
        method: 'POST',
        url: '**/graph/nodes/*/synonyms/create',
      }, createNodeSynonym).as('createNodeSynonym')

      cy.intercept({
        method: 'DELETE',
        url: '**/graph/nodes/*/synonyms/*',
      }, deleteNodeSynonym).as('deleteNodeSynonym')

      cy.intercept({
        method: 'PATCH',
        url: '**/graph/nodes/*/synonyms/*',
      }, updateNodeSynonym).as('updateNodeSynonym')

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

      // click the synonym sidebar icon
      cy.get('#card-synonyms-btn-0').click()
      cy.location('pathname').should('be.equal', ROUTE_SYNONYMS)

      cy.get('#sidebar-button-search').click()

      cy.get('#card-visualise-btn-0').click()

      cy.wait(1000)

      cy.get('#sidebar-button-synonyms').click()

      cy.wait(500)

      cy.location('pathname').should('be.equal', ROUTE_SYNONYMS)

      // select first node from dropdown
      cy.get('#synonyms-select-element').find('.p-dropdown-trigger').click({ force: true })

      // only class type nodes should be displayed
      cy.get('.p-dropdown-items-wrapper').find('.p-dropdown-item').should('have.length', 13)

      // select first node
      cy.get('.p-dropdown-items-wrapper').find('.p-dropdown-item').eq(0).click({ force: true })

      // add Node synonym
      cy.get('#add-synonym').click()
      cy.get('#selected-element-label').should('have.text', 'For Node: Link')

      cy.get('#synonym-textarea').type('Latest node synonym')
      cy.get('#submit-synonym').click()

      cy.wait('@createNodeSynonym')

      cy.get('.synonyms-synonym').should('have.length', 1)

      // search filter should work
      cy.get('.p-accordion-header').find('a').click()

      cy.get('#synonyms-search-filter').type('latest')
      cy.get('.synonyms-synonym').should('have.length', 1)

      cy.get('#synonyms-search-filter').clear()

      cy.get('.synonyms-synonym').should('have.length', 1)

      // editing and closing should work
      cy.get('.edit-synonym').click({ force: true })

      cy.get('.close-synonym').click({ force: true })
      cy.get('.synonyms-content').eq(0).should('have.text', 'Latest node synonym')

      // editing should work
      cy.get('.edit-synonym').click({ force: true })
      cy.get('.synonym-text').type(' added')
      cy.get('.edit-synonym').click({ force: true })

      cy.wait('@updateNodeSynonym')

      cy.get('.synonyms-content').eq(0).should('have.text', 'Latest node synonym added')

      cy.get('.delete-synonym').eq(0).click({ force: true })
      cy.wait('@deleteNodeSynonym')

      cy.get('.synonyms-synonym').should('not.exist')
      cy.get('#no-synonyms-message').should('have.text', 'No synonyms present')
    })
  })
})
