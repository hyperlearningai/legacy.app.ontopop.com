/// <reference types="cypress" />
import authValid from '../fixtures/authValid'
import emptyNotes from '../fixtures/emptyNotes'
import graphResponse from '../fixtures/graphResponse'
import addNode from '../fixtures/addNode'
import addEdge from '../fixtures/addEdge'
import getStyling from '../fixtures/getStyling'
import saveStyling from '../fixtures/saveStyling'
import linkAutocomplete from '../fixtures/linkAutocomplete'
import linkSearch from '../fixtures/linkSearch'
import { ROUTE_STYLING } from '../../src/constants/routes'

context('Network styling', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#accept-all-btn').click()
  })

  describe('Network styling nodes', () => {
    it('Global node styling', () => {
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

      cy.get('.auth-button').click({ force: true })

      cy.wait('@postLogin')

      cy.get('.p-datatable-tbody').find('tr').should('have.length', 1)

      cy.get('.pi-chevron-down').click()

      cy.get('.p-menuitem-link').eq(0).click()

      cy.wait(1000)

      cy.get('#main-search').type('link')

      cy.wait('@linkAutocomplete')

      cy.get('.p-autocomplete-item').eq(0).click({ force: true })

      cy.wait('@linkSearch')

      cy.get('#card-visualise-btn-0').click({ force: true })

      cy.wait(1000)

      // click the network styling icon
      cy.get('#sidebar-button-styling').click({ force: true })

      cy.location('pathname').should('be.equal', ROUTE_STYLING)

      // open node styling
      cy.get('.p-accordion-header').eq(0).find('a').click({ force: true })

      // open global node styling
      cy.get('#pr_id_7_header_0').click({ force: true })

      // // open global node shape
      cy.get('#pr_id_8_header_0').click({ force: true })

      cy.get('#global-node-shape')
        .find('.p-dropdown-trigger')
        .click({ force: true })

      cy.get('#global-node-shape')
        .find('.p-dropdown-trigger')
        .click({ force: true })

      cy.get('.p-dropdown-items-wrapper').find('.p-dropdown-item').eq(7).click({ force: true })

      // open global node size
      cy.get('#pr_id_8_header_1').click({ force: true })

      cy.get('#global-node-size')
        .find('input')
        .clear().type(100)

      // open global node font size
      cy.get('#pr_id_8_header_2').click({ force: true })

      cy.get('#global-node-font-size')
        .find('input')
        .clear().type(18)

      // open global node font alignment
      cy.get('#pr_id_8_header_3').click({ force: true })

      cy.get('#global-node-font-alignment')
        .find('.p-button').eq(0).click({ force: true })

      // open global node font size
      cy.get('#pr_id_8_header_4').click({ force: true })

      cy.get('#global-node-border-width')
        .find('input')
        .clear().type(5)

      cy.get('#global-node-border-width-highlighted')
        .find('input')
        .clear().type(7)

      // open global node colors
      cy.get('#pr_id_8_header_5').click({ force: true })

      cy.get('#global-node-color-text')
        .find('.p-inputtext').then((elem) => elem.val('ff1212').trigger('change'))

      cy.get('#global-node-color-border')
        .find('.p-inputtext').then((elem) => elem.val('ff1212').trigger('change'))

      cy.get('#global-node-color-border-highlight')
        .find('.p-inputtext').then((elem) => elem.val('ff1212').trigger('change'))

      cy.get('#global-node-color-background')
        .find('.p-inputtext').then((elem) => elem.val('ff1212').trigger('change'))

      cy.get('#global-node-color-background-dataset')
        .find('.p-inputtext').then((elem) => elem.val('ff1212').trigger('change'))

      cy.get('#global-node-color-background-highlight')
        .find('.p-inputtext').then((elem) => elem.val('ff1212').trigger('change'))

      cy.get('#global-node-color-background-hover')
        .find('.p-inputtext').then((elem) => elem.val('ff1212').trigger('change'))

      cy.get('#global-node-color-border-hover')
        .find('.p-inputtext').then((elem) => elem.val('ff1212').trigger('change'))

      // open global node caption property
      cy.get('#pr_id_8_header_6').click({ force: true })

      cy.get('#global-node-caption-property')
        .find('.p-dropdown-trigger')
        .click({ force: true })

      cy.get('.p-dropdown-items-wrapper').find('.p-dropdown-item').eq(3).click({ force: true })

      cy.get('#global-node-caption-property-dataset')
        .find('.p-dropdown-trigger')
        .click({ force: true })

      cy.get('.p-dropdown-items-wrapper').find('.p-dropdown-item').eq(3).click({ force: true })
    })

    it('User-defined node styling', () => {
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

      cy.get('.auth-button').click({ force: true })

      cy.wait('@postLogin')

      cy.get('.p-datatable-tbody').find('tr').should('have.length', 1)

      cy.get('.pi-chevron-down').click()

      cy.get('.p-menuitem-link').eq(0).click()

      cy.wait(1000)

      cy.get('#main-search').type('link')

      cy.wait('@linkAutocomplete')

      cy.get('.p-autocomplete-item').eq(0).click({ force: true })

      cy.wait('@linkSearch')

      cy.get('#card-visualise-btn-0').click({ force: true })

      cy.wait(1000)

      // click the edit ontology sidebar icon
      cy.get('#sidebar-button-edit-ontology').click({ force: true })

      // add node
      cy.get('.p-inputtextarea').should('have.length', 12)

      cy.get('.p-inputtextarea').eq(2).type('http://test/node')
      cy.get('.p-inputtextarea').eq(3).type('Test node')

      cy.get('.go-button').click({ force: true })

      cy.wait('@addNode')

      cy.get('.nav-left').should('contain', 'Nodes: 25')
      cy.get('.nav-left').should('contain', 'Edges: 52')

      cy.get('.vis-zoomExtends').click({ force: true })

      // click the network styling icon
      cy.get('#sidebar-button-styling').click({ force: true })

      // open node styling
      cy.get('.p-accordion-header').eq(0).find('a').click({ force: true })

      // open node styling by property
      cy.get('#pr_id_7_header_1').click({ force: true })

      // open user-defined (ud) node shape
      cy.get('#pr_id_8_header_0').click({ force: true })

      cy.get('#ud-node-shape')
        .find('.p-dropdown-trigger')
        .click({ force: true })

      cy.get('.p-dropdown-items-wrapper').find('.p-dropdown-item').eq(7).click({ force: true })

      // open user-defined (ud) node size
      cy.get('#pr_id_8_header_1').click({ force: true })

      cy.get('#ud-node-size')
        .find('input')
        .clear().type(100)

      // open global node font size
      cy.get('#pr_id_8_header_2').click({ force: true })

      cy.get('#ud-node-font-size')
        .find('input')
        .clear().type(18)

      // open global node font alignment
      cy.get('#pr_id_8_header_3').click({ force: true })

      cy.get('#ud-node-font-alignment')
        .find('.p-button').eq(0).click({ force: true })

      // open global node font size
      cy.get('#pr_id_8_header_4').click({ force: true })

      cy.get('#ud-node-border-width')
        .find('input')
        .clear().type(5)

      cy.get('#ud-node-border-width-highlighted')
        .find('input')
        .clear().type(7)

      // open global node colors
      cy.get('#pr_id_8_header_5').click({ force: true })

      cy.get('#ud-node-color-text')
        .find('.p-inputtext').then((elem) => elem.val('ff1212').trigger('change'))

      cy.get('#ud-node-color-border')
        .find('.p-inputtext').then((elem) => elem.val('ff1212').trigger('change'))

      cy.get('#ud-node-color-border-highlight')
        .find('.p-inputtext').then((elem) => elem.val('ff1212').trigger('change'))

      cy.get('#ud-node-color-background')
        .find('.p-inputtext').then((elem) => elem.val('ff1212').trigger('change'))

      cy.get('#ud-node-color-background-dataset')
        .find('.p-inputtext').then((elem) => elem.val('ff1212').trigger('change'))

      cy.get('#ud-node-color-background-highlight')
        .find('.p-inputtext').then((elem) => elem.val('ff1212').trigger('change'))

      cy.get('#ud-node-color-background-hover')
        .find('.p-inputtext').then((elem) => elem.val('ff1212').trigger('change'))

      cy.get('#ud-node-color-border-hover')
        .find('.p-inputtext').then((elem) => elem.val('ff1212').trigger('change'))

      // open global node caption property
      cy.get('#pr_id_8_header_6').click({ force: true })

      cy.get('#ud-node-caption-property')
        .find('.p-dropdown-trigger')
        .click({ force: true })

      cy.get('.p-dropdown-items-wrapper').find('.p-dropdown-item').eq(3).click({ force: true })

      cy.get('#ud-node-caption-property-dataset')
        .find('.p-dropdown-trigger')
        .click({ force: true })

      cy.get('.p-dropdown-items-wrapper').find('.p-dropdown-item').eq(3).click({ force: true })
    })

    it('Node styling by caption', () => {
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

      cy.get('.auth-button').click({ force: true })

      cy.wait('@postLogin')

      cy.get('.p-datatable-tbody').find('tr').should('have.length', 1)

      cy.get('.pi-chevron-down').click()

      cy.get('.p-menuitem-link').eq(0).click()

      cy.wait(1000)

      cy.get('#main-search').type('link')

      cy.wait('@linkAutocomplete')

      cy.get('.p-autocomplete-item').eq(0).click({ force: true })

      cy.wait('@linkSearch')

      cy.get('#card-visualise-btn-0').click({ force: true })

      cy.wait(1000)

      // click the network styling icon
      cy.get('#sidebar-button-styling').click({ force: true })

      // open node styling
      cy.get('.p-accordion-header').eq(0).find('a').click({ force: true })

      // open node styling by property
      cy.get('#pr_id_7_header_2').click({ force: true })

      // open first node property tab
      cy.get('#pr_id_8_header_0').click({ force: true })

      cy.get('.p-accordion').eq(0).find('.p-accordion-content')
        .find('.p-accordion-tab')
        .eq(2)
        .find('.p-accordion-content')
        .find('.p-accordion-tab')
        .eq(0)
        .find('.p-dropdown-trigger')
        .click({ force: true })

      cy.get('.p-dropdown-items-wrapper').find('.p-dropdown-item')
        .eq(6)
        .click({ force: true })

      cy.get('.p-accordion').eq(0).find('.p-accordion-content')
        .find('.p-accordion-tab')
        .eq(2)
        .find('.p-accordion-content')
        .find('.p-accordion-tab')
        .eq(0)
        .find('.p-selectbutton')
        .find('.p-button')
        .eq(0)
        .click({ force: true })

      cy.get('.p-accordion').eq(0).find('.p-accordion-content')
        .find('.p-accordion-tab')
        .eq(2)
        .find('.p-accordion-content')
        .find('.p-accordion-tab')
        .eq(0)
        .find('.property-text-input')
        .type('mat')

      cy.get('.p-accordion').eq(0).find('.p-accordion-content')
        .find('.p-accordion-tab')
        .eq(2)
        .find('.p-accordion-content')
        .find('.p-accordion-tab')
        .eq(0)
        .find('.p-dropdown-trigger')
        .eq(1)
        .click({ force: true })

      cy.get('.p-dropdown-items-wrapper').find('.p-dropdown-item')
        .eq(6)
        .click({ force: true })

      // TODO: color picker not picking up changes - see if there's a better way
      cy.get('.p-colorpicker-preview').then((elem) => elem.val('ff1212').trigger('change'))

      cy.get('.save-property-style').click({ force: true })
    })
  })

  describe('Network styling edges', () => {
    it('Global edge styling', () => {
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

      cy.get('.auth-button').click({ force: true })

      cy.wait('@postLogin')

      cy.get('.p-datatable-tbody').find('tr').should('have.length', 1)

      cy.get('.pi-chevron-down').click()

      cy.get('.p-menuitem-link').eq(0).click()

      cy.wait(1000)

      cy.get('#main-search').type('link')

      cy.wait('@linkAutocomplete')

      cy.get('.p-autocomplete-item').eq(0).click({ force: true })

      cy.wait('@linkSearch')

      cy.get('#card-visualise-btn-0').click({ force: true })

      cy.wait(1000)

      // click the network styling icon
      cy.get('#sidebar-button-styling').click({ force: true })

      // open edge styling
      cy.get('.p-accordion-header').eq(1).find('a').click({ force: true })

      // open global edge styling
      cy.get('#pr_id_7_header_0').click({ force: true })

      // open global edge length
      cy.get('#pr_id_8_header_0').click({ force: true })

      cy.get('#global-edge-length')
        .find('input')
        .clear().type(100)

      // open global edge width
      cy.get('#pr_id_8_header_1').click({ force: true })

      cy.get('#global-edge-width')
        .find('input')
        .clear().type(10)

      // open global edge colors
      cy.get('#pr_id_8_header_2').click({ force: true })

      cy.get('#global-edge-color-line')
        .find('.p-inputtext').then((elem) => elem.val('ff1212').trigger('change'))

      cy.get('#global-edge-color-line-highlight')
        .find('.p-inputtext').then((elem) => elem.val('ff1212').trigger('change'))

      cy.get('#global-edge-color-line-hover')
        .find('.p-inputtext').then((elem) => elem.val('ff1212').trigger('change'))

      // open global edge line style
      cy.get('#pr_id_8_header_3').click({ force: true })

      cy.get('#global-edge-line-style')
        .find('.p-button').eq(0).click({ force: true })

      // open global edge text size
      cy.get('#pr_id_8_header_4').click({ force: true })

      cy.get('#global-edge-text-size')
        .find('input')
        .clear().type(20)

      // open global edge text color
      cy.get('#pr_id_8_header_5').click({ force: true })

      cy.get('#global-edge-text-color')
        .find('.p-inputtext').then((elem) => elem.val('ff1212').trigger('change'))

      // open global edge text align
      cy.get('#pr_id_8_header_6').click({ force: true })

      cy.get('#global-edge-text-align')
        .find('.p-button').eq(0).click({ force: true })

      // open global node caption property
      cy.get('#pr_id_8_header_7').click({ force: true })

      cy.get('#global-edge-caption-property')
        .find('.p-dropdown-trigger')
        .click({ force: true })

      cy.get('.p-dropdown-items-wrapper').find('.p-dropdown-item').eq(0).click({ force: true })
    })

    it('User-defined edge styling', () => {
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
        url: '**/graph/edges/create?model=1',
      }, addEdge).as('addEdge')

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

      cy.get('.auth-button').click({ force: true })

      cy.wait('@postLogin')

      cy.get('.p-datatable-tbody').find('tr').should('have.length', 1)

      cy.get('.pi-chevron-down').click()

      cy.get('.p-menuitem-link').eq(0).click()

      cy.wait(1000)

      cy.get('#main-search').type('link')

      cy.wait('@linkAutocomplete')

      cy.get('.p-autocomplete-item').eq(0).click({ force: true })

      cy.wait('@linkSearch')

      cy.get('#card-visualise-btn-0').click({ force: true })

      cy.wait(1000)

      // click the edit ontology sidebar icon
      cy.get('#sidebar-button-edit-ontology').click({ force: true })

      // add edge
      cy.get('#type-select').find('.p-button').eq(1).click({ force: true })

      cy.get('#graph-select-from').find('.p-dropdown-trigger').click({ force: true })
      cy.get('.p-dropdown-items-wrapper').find('.p-dropdown-item').eq(0).click({ force: true })

      cy.get('#graph-select-edge').find('.p-dropdown-trigger').click({ force: true })
      cy.get('.p-dropdown-items-wrapper').find('.p-dropdown-item').eq(0).click({ force: true })

      cy.get('#graph-select-to').find('.p-dropdown-trigger').click({ force: true })
      cy.get('.p-dropdown-items-wrapper').find('.p-dropdown-item').eq(2).click({ force: true })

      cy.get('.go-button').click({ force: true })

      cy.wait('@addEdge')

      cy.get('.nav-left').should('contain', 'Nodes: 24')
      cy.get('.nav-left').should('contain', 'Edges: 53')

      // click the network styling icon
      cy.get('#sidebar-button-styling').click({ force: true })

      // open edge styling
      cy.get('.p-accordion-header').eq(1).find('a').click({ force: true })

      // open user-defined (ud) edge styling
      cy.get('#pr_id_7_header_1').click({ force: true })

      // open ud edge width
      cy.get('#pr_id_8_header_0').click({ force: true })

      cy.get('#ud-edge-width')
        .find('input')
        .clear().type(10)

      // open ud edge colors
      cy.get('#pr_id_8_header_1').click({ force: true })

      cy.get('#ud-edge-color-line')
        .find('.p-inputtext').then((elem) => elem.val('ff1212').trigger('change'))

      cy.get('#ud-edge-color-line-highlight')
        .find('.p-inputtext').then((elem) => elem.val('ff1212').trigger('change'))

      cy.get('#ud-edge-color-line-hover')
        .find('.p-inputtext').then((elem) => elem.val('ff1212').trigger('change'))

      // open ud edge line style
      cy.get('#pr_id_8_header_2').click({ force: true })

      cy.get('#ud-edge-line-style')
        .find('.p-button').eq(0).click({ force: true })

      // open ud edge text size
      cy.get('#pr_id_8_header_3').click({ force: true })

      cy.get('#ud-edge-text-size')
        .find('input')
        .clear().type(20)

      // open ud edge text color
      cy.get('#pr_id_8_header_4').click({ force: true })

      cy.get('#ud-edge-text-color')
        .find('.p-inputtext').then((elem) => elem.val('ff1212').trigger('change'))

      // open ud edge text align
      cy.get('#pr_id_8_header_5').click({ force: true })

      cy.get('#ud-edge-text-align')
        .find('.p-button').eq(0).click({ force: true })

      // open ud node caption property
      cy.get('#pr_id_8_header_6').click({ force: true })

      cy.get('#ud-edge-caption-property')
        .find('.p-dropdown-trigger')
        .click({ force: true })

      cy.get('.p-dropdown-items-wrapper').find('.p-dropdown-item').eq(0).click({ force: true })
    })

    it('Edge styling by caption', () => {
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
        method: 'POST',
        url: '**/api/ui/styling',
      }, saveStyling).as('saveStyling')

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

      cy.get('.auth-button').click({ force: true })

      cy.wait('@postLogin')

      cy.get('.p-datatable-tbody').find('tr').should('have.length', 1)

      cy.get('.pi-chevron-down').click()

      cy.get('.p-menuitem-link').eq(0).click()

      cy.wait(1000)

      cy.get('#main-search').type('link')

      cy.wait('@linkAutocomplete')

      cy.get('.p-autocomplete-item').eq(0).click({ force: true })

      cy.wait('@linkSearch')

      cy.get('#card-visualise-btn-0').click({ force: true })

      cy.wait(1000)

      // click the network styling icon
      cy.get('#sidebar-button-styling').click({ force: true })

      // open edge styling
      cy.get('.p-accordion-header').eq(1).find('a').click({ force: true })

      // open edge styling by property
      cy.get('#pr_id_7_header_2').click({ force: true })

      // open first edge property tab
      cy.get('#pr_id_8_header_0').click({ force: true })

      // remove first edge property
      cy.get('.delete-property-style').click({ force: true })

      // open first edge property tab
      cy.get('.p-accordion').eq(1).find('.p-accordion-content')
        .find('.p-accordion-tab')
        .eq(2)
        .find('.p-accordion-content')
        .find('.p-accordion-tab')
        .eq(0)
        .click({ force: true })

      cy.get('.p-accordion').eq(1).find('.p-accordion-content')
        .find('.p-accordion-tab')
        .eq(2)
        .find('.p-accordion-content')
        .find('.p-accordion-tab')
        .eq(0)
        .find('.p-dropdown-trigger')
        .click({ force: true })

      cy.get('.p-dropdown-items-wrapper').find('.p-dropdown-item')
        .eq(1)
        .click({ force: true })

      cy.get('.p-accordion').eq(1).find('.p-accordion-content')
        .find('.p-accordion-tab')
        .eq(2)
        .find('.p-accordion-content')
        .find('.p-accordion-tab')
        .eq(0)
        .find('.p-selectbutton')
        .find('.p-button')
        .eq(0)
        .click({ force: true })

      cy.get('.p-accordion').eq(1).find('.p-accordion-content')
        .find('.p-accordion-tab')
        .eq(2)
        .find('.p-accordion-content')
        .find('.p-accordion-tab')
        .eq(0)
        .find('.property-text-input')
        .type('rec')

      cy.get('.p-accordion').eq(1).find('.p-accordion-content')
        .find('.p-accordion-tab')
        .eq(2)
        .find('.p-accordion-content')
        .find('.p-accordion-tab')
        .eq(0)
        .find('.p-dropdown-trigger')
        .eq(1)
        .click({ force: true })

      cy.get('.p-dropdown-items-wrapper').find('.p-dropdown-item')
        .eq(1)
        .click({ force: true })

      cy.get('.p-inputtext').eq(0).invoke('val', '10').trigger('change')

      cy.get('.save-property-style').click({ force: true })

      cy.get('#save-styling-button').click({ force: true })

      cy.wait('@saveStyling')
      cy.get('#save-styling-button').should('have.text', 'Saved!')
    })
  })
})
