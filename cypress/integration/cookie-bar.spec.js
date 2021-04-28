/// <reference types="cypress" />

context('CookieBar', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  describe('CookieBar', () => {
    it('All cookies should be accepted', () => {
      cy.get('#accept-all-btn').click()

      cy.get('.cookiebar').should('not.exist')
    })

    it('Only selected cookies should be accepted', () => {
      cy.get('#save-preferences-btn').click()

      cy.get('.p-error').should('have.length', 2)

      cy.get('.p-error').eq(0).should('contain', 'Choose your preference')

      cy.get('#cookies-marketing').find('.p-button').eq(0).click()
      cy.get('#cookies-preferences').find('.p-button').eq(0).click()

      cy.get('#save-preferences-btn').click()
      cy.get('.cookiebar').should('not.exist')
    })
  })
})
