/// <reference types="cypress" />

const github = 'https://github.com/KushibikiMashu/nextjs-playground'
const twitter = 'https://twitter.com/Panda_Program'

context('トップページ', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  context('header', () => {
    it('サイト名が表示されている', () => {
      cy.get('nav').contains('Next.js Playground')
    })

    it('GitHub のリンクが表示されている', () => {
      cy.get('nav').contains('GitHub').should('have.attr', 'href', github)
    })

    it('Twitter のリンクが表示されている', () => {
      cy.get('nav').contains('Twitter').should('have.attr', 'href', twitter)
    })
  })

  context('main', () => {
    it('各ページへのリンクが壊れていない', () => {
      cy.get('main')
        .find('a')
        .each(($a) => {
          const msg = $a.text()
          expect($a, msg).to.have.attr('href').not.contain('undefined')
        })
    })
  })

  context('footer', () => {
    it('footer に Twitter名が表示されている', () => {
      cy.get('footer').contains('@Panda_Program').should('have.attr', 'href', twitter)
    })
  })
})
