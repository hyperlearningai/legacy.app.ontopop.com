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

context('Tour', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#accept-all-btn').click()
  })

  describe('Entry search', () => {
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

      cy.get('.auth-button').click()

      cy.wait('@postLogin')

      cy.get('.p-datatable-tbody').find('tr').should('have.length', 1)

      cy.get('.pi-chevron-down').click()

      cy.get('.p-menuitem-link').eq(0).click()

      cy.wait(2000)

      cy.get('.react-joyride__tooltip').find('div').eq(0).should('have.text', 'Start by searching. Try typing: road')
      cy.get('.react-joyride__tooltip').find('button[data-action="primary"]').click()

      cy.get('.react-joyride__tooltip').find('div').eq(0).should('have.text', 'This allows you to visualise this entity')
      cy.get('.react-joyride__tooltip').find('button[data-action="primary"]').click()

      cy.wait('@linkSearch')

      cy.location('pathname').should('be.equal', ROUTE_NETWORK_GRAPHS)
      cy.get('.react-joyride__tooltip').find('div').eq(0).should('have.text', 'This allows you to use buttons to navigate')
      cy.get('.react-joyride__tooltip').find('button[data-action="primary"]').click()

      cy.location('pathname').should('be.equal', ROUTE_NETWORK_GRAPHS)
      cy.get('.react-joyride__tooltip').find('div').eq(0).should('have.text', 'This allows you to see data in a datable')
      cy.get('.react-joyride__tooltip').find('button[data-action="primary"]').click()

      cy.location('pathname').should('be.equal', ROUTE_NETWORK_GRAPHS)
      cy.get('.react-joyride__tooltip').find('div').eq(0).should('have.text', 'This allows you to navigate to a different section')
      cy.get('.react-joyride__tooltip').find('button[data-action="primary"]').click()

      cy.location('pathname').should('be.equal', ROUTE_ELEMENTS_SELECTION)
      cy.get('.react-joyride__tooltip').find('div').eq(0).should('have.text', 'This allows you to choose element type')
      cy.get('.react-joyride__tooltip').find('button[data-action="primary"]').click()

      cy.location('pathname').should('be.equal', ROUTE_ELEMENTS_SELECTION)
      cy.get('.react-joyride__tooltip').find('div').eq(0).should('have.text', 'This allows you to choose element')
      cy.get('.react-joyride__tooltip').find('button[data-action="primary"]').click()

      cy.location('pathname').should('be.equal', ROUTE_ELEMENTS_SELECTION)
      cy.get('.react-joyride__tooltip').find('div').eq(0).should('have.text', 'This allows you to choose properties')
      cy.get('.react-joyride__tooltip').find('button[data-action="primary"]').click()

      cy.location('pathname').should('be.equal', ROUTE_NETWORK_GRAPH_OPTIONS)
      cy.get('.react-joyride__tooltip').find('div').eq(0).should('have.text', 'This allows you to change physics')
      cy.get('.react-joyride__tooltip').find('button[data-action="primary"]').click()

      cy.location('pathname').should('be.equal', ROUTE_NETWORK_GRAPH_OPTIONS)
      cy.get('.react-joyride__tooltip').find('div').eq(0).should('have.text', 'This allows you to change positioning')
      cy.get('.react-joyride__tooltip').find('button[data-action="primary"]').click()

      cy.location('pathname').should('be.equal', ROUTE_NETWORK_GRAPH_OPTIONS)
      cy.get('.react-joyride__tooltip').find('div').eq(0).should('have.text', 'This allows you to change repulsion')
      cy.get('.react-joyride__tooltip').find('button[data-action="primary"]').click()

      cy.location('pathname').should('be.equal', ROUTE_NOTES)
      cy.get('.react-joyride__tooltip').find('div').eq(0).should('have.text', 'This allows you to select note type')
      cy.get('.react-joyride__tooltip').find('button[data-action="primary"]').click()

      cy.location('pathname').should('be.equal', ROUTE_NOTES)
      cy.get('.react-joyride__tooltip').find('div').eq(0).should('have.text', 'This allows you to select an element')
      cy.get('.react-joyride__tooltip').find('button[data-action="primary"]').click()

      cy.location('pathname').should('be.equal', ROUTE_SYNONYMS)
      cy.get('.react-joyride__tooltip').find('div').eq(0).should('have.text', 'This allows you to select an element')
      cy.get('.react-joyride__tooltip').find('button[data-action="primary"]').click()

      cy.location('pathname').should('be.equal', ROUTE_SYNONYMS)
      cy.get('.react-joyride__tooltip').find('div').eq(0).should('have.text', 'This allows you to manage synonyms')
      cy.get('.react-joyride__tooltip').find('button[data-action="primary"]').click()

      cy.location('pathname').should('be.equal', ROUTE_EDIT_ONTOLOGY)
      cy.get('.react-joyride__tooltip').find('div').eq(0).should('have.text', 'This allows you to choose operation')
      cy.get('.react-joyride__tooltip').find('button[data-action="primary"]').click()

      cy.location('pathname').should('be.equal', ROUTE_EDIT_ONTOLOGY)
      cy.get('.react-joyride__tooltip').find('div').eq(0).should('have.text', 'This allows you to manage properties')
      cy.get('.react-joyride__tooltip').find('button[data-action="primary"]').click()

      cy.location('pathname').should('be.equal', ROUTE_EXPORT)
      cy.get('.react-joyride__tooltip').find('div').eq(0).should('have.text', 'Start by choosing filename')
      cy.get('.react-joyride__tooltip').find('button[data-action="primary"]').click()

      cy.location('pathname').should('be.equal', ROUTE_EXPORT)
      cy.get('.react-joyride__tooltip').find('div').eq(0).should('have.text', 'This allows you to export as image')
      cy.get('.react-joyride__tooltip').find('button[data-action="primary"]').click()

      cy.location('pathname').should('be.equal', ROUTE_EXPORT)
      cy.get('.react-joyride__tooltip').find('div').eq(0).should('have.text', 'This allows you to export as data')
      cy.get('.react-joyride__tooltip').find('button[data-action="primary"]').click()
    })
  })
})
