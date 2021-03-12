/// <reference types="cypress" />
import authValid from '../fixtures/authValid'
import emptyNotes from '../fixtures/emptyNotes'
import graphResponse from '../fixtures/graphResponse'

context('Entry search', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  describe('Entry search', () => {
    it('searching for link should work', () => {
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

      cy.get('#email').type('valid@email.com')
      cy.get('#password').type('password')

      cy.get('.auth-button').click()

      cy.wait('@postLogin')

      cy.get('[name="search"').type('link')

      cy.wait('@getGraph')

      cy.get('.p-autocomplete-item').click()

      cy.get('.graph-search-results-number').should('contain', 'Search results: 6')

      // display more card info
      cy.get('.graph-search-results-list').find('.p-card-buttons').eq(1).find('.p-card-buttons-info')
        .click()

      // check that more info have been displayed
      cy.get('.graph-search-results-list').find('.p-card').eq(1).find('.bold')
        .eq(1)
        .should('contain', 'rdfsLabel')

      // close more card info
      cy.get('.graph-search-results-list').find('.p-card-buttons').eq(1).find('.p-card-buttons-info')
        .click()

      // check that more info have been hidden
      cy.get('.graph-search-results-list').find('.p-card').eq(1).find('.bold')
        .eq(1)
        .should('not.be.exist')

      // click to show network graph
      cy.get('.graph-search-results-list').find('.p-card-buttons').eq(1).find('.p-button')
        .eq(1)
        .click()

      cy.get('.nav-left').should('contain', 'Nodes: 13')
      cy.get('.nav-left').should('contain', 'Edges: 24')
    })

    it('searching for record should work when nodes results only', () => {
      cy.intercept({
        method: 'POST',
        url: '**/login',
      }, authValid).as('postLogin')

      cy.intercept({
        method: 'POST',
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

      cy.get('#email').type('valid@email.com')
      cy.get('#password').type('password')

      cy.get('.auth-button').click()

      cy.wait('@postLogin')

      // set nodes as result type
      cy.get('#filter-select').find('.p-button').eq(1).click()

      cy.get('[name="search"').type('record')

      cy.wait('@getGraph')

      cy.get('.p-autocomplete-item').click()

      cy.get('.graph-search-results-number').should('contain', 'Search results: 9')

      // display more card info
      cy.get('.graph-search-results-list').find('.p-card-buttons').eq(1).find('.p-card-buttons-info')
        .click()

      // check that more info have been displayed
      cy.get('.graph-search-results-list').find('.p-card').eq(1).find('.bold')
        .eq(1)
        .should('contain', 'rdfsLabel')

      // close more card info
      cy.get('.graph-search-results-list').find('.p-card-buttons').eq(1).find('.p-card-buttons-info')
        .click()

      // check that more info have been hidden
      cy.get('.graph-search-results-list').find('.p-card').eq(1).find('.bold')
        .eq(1)
        .should('not.be.exist')

      // click to show network graph
      cy.get('.graph-search-results-list').find('.p-card-buttons').eq(1).find('.p-button')
        .eq(1)
        .click()

      cy.get('.nav-left').should('contain', 'Nodes: 4')
      cy.get('.nav-left').should('contain', 'Edges: 4')
    })

    it('searching for record should work when edges results only', () => {
      cy.intercept({
        method: 'POST',
        url: '**/login',
      }, authValid).as('postLogin')

      cy.intercept({
        method: 'POST',
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

      cy.get('#email').type('valid@email.com')
      cy.get('#password').type('password')

      cy.get('.auth-button').click()

      cy.wait('@postLogin')

      // set nodes as result type
      cy.get('#filter-select').find('.p-button').eq(2).click()

      cy.get('[name="search"').type('record')

      cy.wait('@getGraph')

      cy.get('.p-autocomplete-item').click()

      cy.get('.graph-search-results-number').should('contain', 'Search results: 7')

      // display more card info
      cy.get('.graph-search-results-list').find('.p-card-buttons').eq(1).find('.p-card-buttons-info')
        .click()

      // check that more info have been displayed
      cy.get('.graph-search-results-list').find('.p-card').eq(1).find('.bold')
        .eq(1)
        .should('contain', 'role')

      // close more card info
      cy.get('.graph-search-results-list').find('.p-card-buttons').eq(1).find('.p-card-buttons-info')
        .click()

      // check that more info have been hidden
      cy.get('.graph-search-results-list').find('.p-card').eq(1).find('.bold')
        .eq(1)
        .should('not.be.exist')

      // click to show network graph
      cy.get('.graph-search-results-list').find('.p-card-buttons').eq(1).find('.p-button')
        .eq(1)
        .click()

      cy.get('.nav-left').should('contain', 'Nodes: 9')
      cy.get('.nav-left').should('contain', 'Edges: 17')
    })

    it('searching for link should work when searching only rdfsLabel', () => {
      cy.intercept({
        method: 'POST',
        url: '**/login',
      }, authValid).as('postLogin')

      cy.intercept({
        method: 'POST',
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

      cy.get('#email').type('valid@email.com')
      cy.get('#password').type('password')

      cy.get('.auth-button').click()

      cy.wait('@postLogin')

      // show advanced search and uncheck all properties but rdfsLabel
      cy.get('.entry-search-row-checkbox').find('.p-checkbox-box').click({ force: true })
      cy.get('.p-multiselect-trigger').click({ force: true })
      cy.get('.p-multiselect-header').find('.p-checkbox-box').click({ force: true })
      cy.get('.p-multiselect-filter').type('rdfs')
      cy.get('.p-multiselect-item').click({ force: true })

      cy.get('[name="search"').type('link')

      cy.wait('@getGraph')

      cy.get('.p-autocomplete-item').click()

      cy.get('.graph-search-results-number').should('contain', 'Search results: 1')

      // display more card info
      cy.get('.graph-search-results-list').find('.p-card-buttons').eq(0).find('.p-card-buttons-info')
        .click()

      // check that more info have been displayed
      cy.get('.graph-search-results-list').find('.p-card').eq(0).find('.bold')
        .eq(1)
        .should('contain', 'rdfsLabel')

      // close more card info
      cy.get('.graph-search-results-list').find('.p-card-buttons').eq(0).find('.p-card-buttons-info')
        .click()

      // check that more info have been hidden
      cy.get('.graph-search-results-list').find('.p-card').eq(0).find('.bold')
        .eq(1)
        .should('not.be.exist')

      // click to show network graph
      cy.get('.graph-search-results-list').find('.p-card-buttons').eq(0).find('.p-button')
        .eq(1)
        .click()

      cy.get('.nav-left').should('contain', 'Nodes: 13')
      cy.get('.nav-left').should('contain', 'Edges: 24')
    })
  })
})
