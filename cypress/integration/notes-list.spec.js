/// <reference types="cypress" />
import authValid from '../fixtures/authValid'
import graphResponse from '../fixtures/graphResponse'
import getNotes from '../fixtures/getNotes'
import createNote from '../fixtures/createNote'
import getNodesNotes from '../fixtures/getNodesNotes'
import getEdgesNotes from '../fixtures/getEdgesNotes'
import deleteNodeNote from '../fixtures/deleteNodeNote'
import createNodeNote from '../fixtures/createNodeNote'
import createEdgeNote from '../fixtures/createEdgeNote'
import deleteEdgeNote from '../fixtures/deleteEdgeNote'
import updateEdgeNote from '../fixtures/updateEdgeNote'
import updateNodeNote from '../fixtures/updateNodeNote'

context('Notes list', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  describe('Notes list', () => {
    it('Notes list should return results', () => {
      cy.intercept({
        method: 'POST',
        url: '**/login',
      }, authValid).as('postLogin')

      cy.intercept({
        method: 'GET',
        url: '**/graph/notes',
      }, getNotes).as('getNotes')

      cy.intercept({
        method: 'GET',
        url: '**/graph/nodes/notes',
      }, getNodesNotes).as('getNodesNotes')

      cy.intercept({
        method: 'GET',
        url: '**/graph/edges/notes',
      }, getEdgesNotes).as('getEdgesNotes')

      cy.intercept({
        method: 'GET',
        url: '**/graph?model=1',
      }, graphResponse).as('getGraph')

      cy.intercept({
        method: 'POST',
        url: '**/graph/notes/create',
      }, createNote).as('createNote')

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

      // click the noets sidebar icon
      cy.get('#sidebar-button-notes').click()

      cy.get('.notes-note').should('have.length', 2)

      // add graph note
      cy.get('#add-note').click()
      cy.get('#close-add-note').click()
      cy.get('#note-textarea').should('not.be.exist')
      cy.get('#add-note').click()
      cy.get('#note-textarea').type('Latest graph note')
      cy.get('#submit-note').click()

      cy.wait('@createNote')

      cy.get('.notes-note').should('have.length', 3)

      // search filter should work
      cy.get('#notes-search-filter').type('graph')
      cy.get('.notes-note').should('have.length', 2)

      cy.get('#notes-search-filter').clear()

      // sort notes
      cy.get('#notes-sort-by').find('.p-dropdown-trigger').click({ force: true })
      cy.get('#notes-sort-by').find('.p-dropdown-item').eq(0).click({ force: true })
      cy.get('.notes-content').eq(0).find('p').should('have.text', 'graph note')
      cy.get('#notes-sort-by-direction').click()
      cy.get('.notes-content').eq(0).find('p').should('have.text', 'new note')

      // should filter notes
      cy.get('#notes-filter').find('.p-accordion-header-link').click({ force: true })
      cy.get('#notes-filter-field').find('.p-dropdown-trigger').click({ force: true })
      cy.get('#notes-filter-field').find('.p-dropdown-item').eq(0).click({ force: true })
      cy.get('.p-datepicker-calendar').find('td:not(.p-datepicker-other-month)').eq(0).find('span')
        .click({ force: true })
      cy.get('.notes-note').should('have.length', 2)

      cy.get('#notes-filter-field').find('.p-dropdown-trigger').click({ force: true })
      cy.get('#notes-filter-field').find('.p-dropdown-item').eq(2).click({ force: true })

      cy.get('#notes-filter-user').find('.p-multiselect-trigger').click({ force: true })
      cy.get('#notes-filter-user').find('.p-multiselect-item').eq(0).click({ force: true })

      cy.get('.notes-note').should('have.length', 3)
    })

    it('Nodes notes list should return results', () => {
      cy.intercept({
        method: 'POST',
        url: '**/login',
      }, authValid).as('postLogin')

      cy.intercept({
        method: 'GET',
        url: '**/graph/notes',
      }, getNotes).as('getNotes')

      cy.intercept({
        method: 'GET',
        url: '**/graph/nodes/notes',
      }, getNodesNotes).as('getNodesNotes')

      cy.intercept({
        method: 'GET',
        url: '**/graph/edges/notes',
      }, getEdgesNotes).as('getEdgesNotes')

      cy.intercept({
        method: 'GET',
        url: '**/graph?model=1',
      }, graphResponse).as('getGraph')

      cy.intercept({
        method: 'POST',
        url: '**/graph/nodes/*/notes/create',
      }, createNodeNote).as('createNodeNote')

      cy.intercept({
        method: 'DELETE',
        url: '**/graph/nodes/*/notes/*',
      }, deleteNodeNote).as('deleteNodeNote')

      cy.intercept({
        method: 'PATCH',
        url: '**/graph/nodes/*/notes/*',
      }, updateNodeNote).as('updateNodeNote')

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

      // click the noets sidebar icon
      cy.get('#sidebar-button-notes').click()

      // select node
      cy.get('#notes-select').find('.p-button').eq(1).click()

      // select first node from dropdown
      cy.get('#notes-select-element').find('.p-dropdown-trigger').click({ force: true })
      cy.get('#notes-select-element').find('.p-dropdown-item').eq(0).click({ force: true })

      // add graph note
      cy.get('#add-note').click()
      cy.get('#selected-element-label').should('have.text', 'For Node: Geotechnical')

      cy.get('#note-textarea').type('Latest node note')
      cy.get('#submit-note').click()

      cy.wait('@createNodeNote')

      cy.get('.notes-note').should('have.length', 3)

      // search filter should work
      cy.get('#notes-search-filter').type('latest')
      cy.get('.notes-note').should('have.length', 2)

      cy.get('#notes-search-filter').clear()

      cy.get('.notes-note').should('have.length', 3)

      // editing and closing should work
      cy.get('.edit-note').eq(1).click({ force: true })

      cy.get('.close-note').click({ force: true })
      cy.get('.notes-content').eq(1).find('p').should('have.text', 'Latest node note')

      // editing hould work
      cy.get('.edit-note').eq(1).click({ force: true })
      cy.get('.note-text').type(' added')
      cy.get('.edit-note').eq(1).click({ force: true })

      cy.wait('@updateNodeNote')

      cy.get('.notes-content').eq(1).find('p').should('have.text', 'Latest node note added')

      cy.get('.delete-note').eq(1).click({ force: true })
      cy.wait('@deleteNodeNote')

      cy.get('.notes-note').should('have.length', 2)
    })

    it('Edges notes list should return results', () => {
      cy.intercept({
        method: 'POST',
        url: '**/login',
      }, authValid).as('postLogin')

      cy.intercept({
        method: 'GET',
        url: '**/graph/notes',
      }, getNotes).as('getNotes')

      cy.intercept({
        method: 'GET',
        url: '**/graph/nodes/notes',
      }, getNodesNotes).as('getNodesNotes')

      cy.intercept({
        method: 'GET',
        url: '**/graph/edges/notes',
      }, getEdgesNotes).as('getEdgesNotes')

      cy.intercept({
        method: 'GET',
        url: '**/graph?model=1',
      }, graphResponse).as('getGraph')

      cy.intercept({
        method: 'POST',
        url: '**/graph/edges/*/notes/create',
      }, createEdgeNote).as('createEdgeNote')

      cy.intercept({
        method: 'DELETE',
        url: '**/graph/edges/*/notes/*',
      }, deleteEdgeNote).as('deleteEdgeNote')

      cy.intercept({
        method: 'PATCH',
        url: '**/graph/edges/*/notes/*',
      }, updateEdgeNote).as('updateEdgeNote')

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

      // click the noets sidebar icon
      cy.get('#sidebar-button-notes').click()

      // select node
      cy.get('#notes-select').find('.p-button').eq(2).click()

      // select first node from dropdown
      cy.get('#notes-select-element').find('.p-dropdown-trigger').click({ force: true })
      cy.get('#notes-select-element').find('.p-dropdown-item').eq(0).click({ force: true })

      // add graph note
      cy.get('#add-note').click()
      cy.get('#selected-element-label').should('have.text', 'For Edge: Geotechnical => Subclass\nof => Strategic\nRoad\nNetwork\nAsset')

      cy.get('#note-textarea').type('Latest edge note')
      cy.get('#submit-note').click()

      cy.wait('@createEdgeNote')

      cy.get('.notes-note').should('have.length', 3)

      // search filter should work
      cy.get('#notes-search-filter').type('latest')
      cy.get('.notes-note').should('have.length', 2)

      cy.get('#notes-search-filter').clear()

      cy.get('.notes-note').should('have.length', 3)

      // editing and closing should work
      cy.get('.edit-note').eq(1).click({ force: true })

      cy.get('.close-note').click({ force: true })
      cy.get('.notes-content').eq(1).find('p').should('have.text', 'Latest edge note')

      // editing hould work
      cy.get('.edit-note').eq(1).click({ force: true })
      cy.get('.note-text').type(' added')
      cy.get('.edit-note').eq(1).click({ force: true })

      cy.wait('@updateEdgeNote')

      cy.get('.notes-content').eq(1).find('p').should('have.text', 'Latest edge note added')

      cy.get('.delete-note').eq(1).click({ force: true })
      cy.wait('@deleteEdgeNote')

      cy.get('.notes-note').should('have.length', 2)
    })
  })
})
