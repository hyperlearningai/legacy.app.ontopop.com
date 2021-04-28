/// <reference types="cypress" />
import authValid from '../fixtures/authValid'
import emptyNotes from '../fixtures/emptyNotes'
import graphResponse from '../fixtures/graphResponse'
import getStyling from '../fixtures/getStyling'
import linkAutocomplete from '../fixtures/linkAutocomplete'
import linkSearch from '../fixtures/linkSearch'
import { ROUTE_BOUNDING_BOX } from '../../src/constants/routes'
import showTourLs from '../fixtures/showTourLs'

context('Bounding box selection', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.get('#accept-all-btn').click()
    window.localStorage.setItem('showTour', showTourLs)
  })

  describe('Bounding box selection', () => {
    it('Bounding box selection should return results', () => {
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

      // click the bounding box selection icon
      cy.get('#sidebar-button-bounding-box').click()

      cy.wait(500)

      cy.location('pathname').should('be.equal', ROUTE_BOUNDING_BOX)

      // generate bounding box
      cy.get('canvas').click(100, 100)
      cy.get('canvas').click(500, 400)

      cy.wait(500)

      // get number of selected elements
      cy.get('.bounding-box-selection').should(($div) => {
        const selectedNodes = parseInt($div.text().split(': ')[1])

        expect(selectedNodes).to.be.gte(0)
      })

      // second AND filter
      cy.get('#bounding-box-button').click()

      cy.wait(1000)

      // shows subgraph
      cy.get('.nav-left').should(($div) => {
        const nodesNumber = $div.text().split('Nodes: ')[1].split('|')[0]

        expect(parseInt(nodesNumber)).to.be.gte(0)
      })
    })
  })
})
