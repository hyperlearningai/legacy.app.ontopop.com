/// <reference types="cypress" />
import authValid from '../fixtures/authValid'
import emptyNotes from '../fixtures/emptyNotes'
import graphResponse from '../fixtures/graphResponse'
import addNode from '../fixtures/addNode'
import addEdge from '../fixtures/addEdge'
import udpateNode from '../fixtures/updateNode'
import deleteNode from '../fixtures/deleteNode'
import deleteEdge from '../fixtures/deleteEdge'
import getStyling from '../fixtures/getStyling'

context('Edit ontology', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  describe('Edit ontology', () => {
    it('Edit ontology should return results', () => {
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
        method: 'POST',
        url: '**/graph/nodes/create?model=1',
      }, addNode).as('addNode')

      cy.intercept({
        method: 'POST',
        url: '**/graph/edges/create?model=1',
      }, addEdge).as('addEdge')

      cy.intercept({
        method: 'PATCH',
        url: '**/graph/nodes/*',
      }, udpateNode).as('updateNode')

      cy.intercept({
        method: 'DELETE',
        url: '**/graph/nodes/*',
      }, deleteNode).as('deleteNode')

      cy.intercept({
        method: 'DELETE',
        url: '**/graph/edges/*',
      }, deleteEdge).as('deleteEdge')

      cy.intercept({
        method: 'GET',
        url: '**/api/ui/styling',
      }, getStyling).as('getStyling')

      cy.get('#email').type('valid@email.com')
      cy.get('#password').type('password')

      cy.get('.auth-button').click()

      cy.wait('@postLogin')

      cy.get('#main-search').type('road')

      cy.wait('@getGraph')

      cy.get('.p-autocomplete-item').click()

      cy.get('.graph-search-results-number').should('contain', 'Search results: 28')

      // click to show network graph
      cy.get('.graph-search-results-list').find('.p-card-buttons').eq(1).find('.p-button')
        .eq(1)
        .click()

      cy.wait(1000)

      // shows subgraph
      cy.get('.nav-left').should('contain', 'Nodes: 4')
      cy.get('.nav-left').should('contain', 'Edges: 5')

      // click the edit ontology sidebar icon
      cy.get('.sidebar-icons').find('.p-button').eq(16).click()

      // add node
      cy.get('.p-inputtextarea').should('have.length', 12)

      cy.get('.p-inputtextarea').eq(2).type('http://test/node')
      cy.get('.p-inputtextarea').eq(3).type('Test node')

      cy.get('.go-button').click()

      cy.wait('@addNode')

      cy.get('.nav-left').should('contain', 'Nodes: 5')
      cy.get('.nav-left').should('contain', 'Edges: 5')

      // add edge
      cy.get('#type-select').find('.p-button').eq(1).click()

      cy.get('#graph-select-from').find('.p-dropdown-trigger').click({ force: true })
      cy.get('#graph-select-from').find('.p-dropdown-item').eq(0).click({ force: true })

      cy.get('#graph-select-edge').find('.p-dropdown-trigger').click({ force: true })
      cy.get('#graph-select-edge').find('.p-dropdown-item').eq(0).click({ force: true })

      cy.get('#graph-select-to').find('.p-dropdown-trigger').click({ force: true })
      cy.get('#graph-select-to').find('.p-dropdown-item').eq(2).click({ force: true })

      cy.get('.go-button').click()

      cy.wait('@addEdge')

      cy.get('.nav-left').should('contain', 'Nodes: 5')
      cy.get('.nav-left').should('contain', 'Edges: 6')

      // update node
      cy.get('#operation-select').find('.p-button').eq(1).click()

      cy.get('.p-dropdown-trigger').click({ force: true })
      cy.get('.p-dropdown-item').eq(0).click({ force: true })
      cy.get('.p-inputtextarea').eq(3).type(' updated')

      // restore node
      cy.get('.go-button').eq(0).click()
      cy.get('.p-inputtextarea').eq(3).should('have.value', 'Test node')
      cy.get('.p-inputtextarea').eq(3).type(' updated')

      cy.get('.go-button').eq(1).click()

      cy.wait('@updateNode')

      cy.get('.nav-left').should('contain', 'Nodes: 5')
      cy.get('.nav-left').should('contain', 'Edges: 6')

      // delete edge
      cy.get('#operation-select').find('.p-button').eq(2).click()

      cy.get('.p-multiselect').find('.p-multiselect-trigger').click({ force: true })
      cy.get('.p-multiselect').find('.p-multiselect-item').click({ force: true })

      cy.get('.go-button').click({ force: true })

      cy.wait('@deleteEdge')

      cy.get('.nav-left').should('contain', 'Nodes: 5')
      cy.get('.nav-left').should('contain', 'Edges: 5')

      // restore edge
      cy.get('#operation-select').find('.p-button').eq(3).click()

      cy.get('.p-multiselect').find('.p-multiselect-trigger').click({ force: true })
      cy.get('.p-multiselect').find('.p-multiselect-item').click({ force: true })

      cy.get('.go-button').click({ force: true })

      cy.wait('@addEdge')

      cy.get('.nav-left').should('contain', 'Nodes: 5')
      cy.get('.nav-left').should('contain', 'Edges: 6')

      // delete node
      cy.get('#operation-select').find('.p-button').eq(2).click()
      cy.get('#type-select').find('.p-button').eq(0).click()

      cy.get('.p-multiselect').find('.p-multiselect-trigger').click({ force: true })
      cy.get('.p-multiselect').find('.p-multiselect-item').click({ force: true })

      cy.get('.go-button').click({ force: true })

      cy.wait('@deleteNode')

      cy.get('.nav-left').should('contain', 'Nodes: 4')
      cy.get('.nav-left').should('contain', 'Edges: 6')

      // restore node
      cy.get('#operation-select').find('.p-button').eq(3).click()

      cy.get('.p-multiselect').find('.p-multiselect-trigger').click({ force: true })
      cy.get('.p-multiselect').find('.p-multiselect-item').click({ force: true })

      cy.get('.go-button').click({ force: true })

      cy.wait('@addNode')

      cy.get('.nav-left').should('contain', 'Nodes: 5')
      cy.get('.nav-left').should('contain', 'Edges: 6')
    })
  })
})
