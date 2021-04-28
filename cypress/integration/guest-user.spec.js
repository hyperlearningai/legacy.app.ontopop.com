/// <reference types="cypress" />
import authValid from '../fixtures/authValid'
import emptyNotes from '../fixtures/emptyNotes'
import getNodesNotes from '../fixtures/getNodesNotes'
import graphResponse from '../fixtures/graphResponse'
import getStyling from '../fixtures/getStyling'
import linkAutocomplete from '../fixtures/linkAutocomplete'
import linkSearch from '../fixtures/linkSearch'
import businessAreaValues from '../fixtures/businessAreaValues'
import {
  ROUTE_EDIT_ONTOLOGY, ROUTE_ELEMENTS_SELECTION, ROUTE_EXPORT, ROUTE_NETWORK_GRAPHS, ROUTE_NETWORK_GRAPH_OPTIONS, ROUTE_NOTES, ROUTE_SYNONYMS
} from '../../src/constants/routes'
import en from '../../src/i18n/en'

context('Guest user', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.get('#accept-all-btn').click()
  })

  describe('Guest user', () => {
    it('tour should work', () => {
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

      cy.get('#guest-login-button').click()

      cy.wait('@postLogin')

      cy.get('.p-datatable-tbody').find('tr').should('have.length', 1)

      cy.get('.pi-chevron-down').click()

      cy.get('.p-menuitem-link').eq(0).click()

      cy.wait(2000)

      cy.get('.react-joyride__tooltip').find('div').eq(0).should('have.text', en.introSearchStart)
      cy.get('.react-joyride__tooltip').find('button[data-action="primary"]').click()

      cy.get('.react-joyride__tooltip').find('div').eq(0).should('have.text', en.introSearchResults)
      cy.get('.react-joyride__tooltip').find('button[data-action="primary"]').click()

      cy.wait('@linkSearch')

      cy.location('pathname').should('be.equal', ROUTE_NETWORK_GRAPHS)
      cy.get('.react-joyride__tooltip').find('div').eq(0).should('have.text', en.introNavigateButtons)
      cy.get('.react-joyride__tooltip').find('button[data-action="primary"]').click()

      cy.location('pathname').should('be.equal', ROUTE_NETWORK_GRAPHS)
      cy.get('.react-joyride__tooltip').find('div').eq(0).should('have.text', en.introNavigateZoom)
      cy.get('.react-joyride__tooltip').find('button[data-action="primary"]').click()

      cy.location('pathname').should('be.equal', ROUTE_NETWORK_GRAPHS)
      cy.get('.react-joyride__tooltip').find('div').eq(0).should('have.text', en.introNavigateDatatable)
      cy.get('.react-joyride__tooltip').find('button[data-action="primary"]').click()

      cy.location('pathname').should('be.equal', ROUTE_NETWORK_GRAPHS)
      cy.get('.react-joyride__tooltip').find('div').eq(0).should('have.text', en.introDatatableSection)
      cy.get('.react-joyride__tooltip').find('button[data-action="primary"]').click()

      cy.location('pathname').should('be.equal', ROUTE_ELEMENTS_SELECTION)
      cy.get('.react-joyride__tooltip').find('div').eq(0).should('have.text', en.introElementSelectionType)
      cy.get('.react-joyride__tooltip').find('button[data-action="primary"]').click()

      cy.location('pathname').should('be.equal', ROUTE_ELEMENTS_SELECTION)
      cy.get('.react-joyride__tooltip').find('div').eq(0).should('have.text', en.introElementSelectionElement)
      cy.get('.react-joyride__tooltip').find('button[data-action="primary"]').click()

      cy.location('pathname').should('be.equal', ROUTE_ELEMENTS_SELECTION)
      cy.get('.react-joyride__tooltip').find('div').eq(0).should('have.text', en.introElementSelectionProperties)
      cy.get('.react-joyride__tooltip').find('button[data-action="primary"]').click()

      cy.location('pathname').should('be.equal', ROUTE_NETWORK_GRAPH_OPTIONS)
      cy.get('.react-joyride__tooltip').find('div').eq(0).should('have.text', en.introGraphOptionsPhysics)
      cy.get('.react-joyride__tooltip').find('button[data-action="primary"]').click()

      cy.location('pathname').should('be.equal', ROUTE_NETWORK_GRAPH_OPTIONS)
      cy.get('.react-joyride__tooltip').find('div').eq(0).should('have.text', en.introGraphOptionsPositioning)
      cy.get('.react-joyride__tooltip').find('button[data-action="primary"]').click()

      cy.location('pathname').should('be.equal', ROUTE_NETWORK_GRAPH_OPTIONS)
      cy.get('.react-joyride__tooltip').find('div').eq(0).should('have.text', en.introGraphOptionsRepulsion)
      cy.get('.react-joyride__tooltip').find('button[data-action="primary"]').click()

      cy.location('pathname').should('be.equal', ROUTE_EXPORT)
      cy.get('.react-joyride__tooltip').find('div').eq(0).should('have.text', en.introExportFilename)
      cy.get('.react-joyride__tooltip').find('button[data-action="primary"]').click()

      cy.location('pathname').should('be.equal', ROUTE_EXPORT)
      cy.get('.react-joyride__tooltip').find('div').eq(0).should('have.text', en.introExportImage)
      cy.get('.react-joyride__tooltip').find('button[data-action="primary"]').click()

      cy.location('pathname').should('be.equal', ROUTE_EXPORT)
      cy.get('.react-joyride__tooltip').find('div').eq(0).should('have.text', en.introExportData)
      cy.get('.react-joyride__tooltip').find('button[data-action="primary"]').click()
    })
  })
})
