/// <reference types="cypress" />
import authValid from '../fixtures/authValid'
import emptyNotes from '../fixtures/emptyNotes'
import graphResponse from '../fixtures/graphResponse'
import getStyling from '../fixtures/getStyling'
import { ROUTE_BOUNDING_BOX } from '../../src/constants/routes'

context('Bounding box selection', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login')
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

      cy.get('#email').type('valid@email.com')
      cy.get('#password').type('password')

      cy.get('.auth-button').click()

      cy.wait('@postLogin')

      cy.get('#main-search').type('main')

      cy.wait('@getGraph')

      cy.get('.p-autocomplete-item').click()

      cy.get('.graph-search-results-number').should('contain', 'Search results for main: 103')

      // click to show network graph
      cy.get('.graph-search-results-list').find('.p-card-buttons').eq(4).find('.p-button')
        .eq(1)
        .click()

      cy.wait(1000)

      // shows subgraph
      cy.get('.nav-left').should('contain', 'Nodes: 13')
      cy.get('.nav-left').should('contain', 'Edges: 25')

      // click the bounding box selection icon
      cy.get('#sidebar-button-bounding-box').click()

      cy.location('pathname').should('be.equal', ROUTE_BOUNDING_BOX)

      // generate bounding box
      cy.get('canvas').click(100, 100)
      cy.get('canvas').click(500, 400)

      cy.wait(500)

      // get number of selected elements
      cy.get('.bounding-box-selected').find('td').eq(1).should(($div) => {
        const n = parseInt($div.text())

        expect(n).to.be.gte(0)
      })

      // second AND filter
      cy.get('.bounding-box-button').click()

      cy.wait(1000)

      // shows subgraph
      cy.get('.nav-left').should(($div) => {
        const nodesNumber = $div.text().split('Nodes: ')[1].split('|')[0]

        expect(parseInt(nodesNumber)).to.be.gte(0)
      })
    })
  })
})
