/// <reference types="cypress" />

const link = 'Internationalized Routing'
const url = 'https://nextjs.org/docs/advanced-features/i18n-routing'

context('/i18n-blog', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.contains('i18n-blog').click()
  })

  context('英語の記事', () => {
    it('英語版の記事タイトルは、「My Blog」である', () => {
      cy.contains('My Blog')
    })

    it('URLは「/i18n-blog/first-blog」である', () => {
      cy.url().should('eq', Cypress.config().baseUrl + '/i18n-blog/first-blog')
    })

    it('日本語の記事に遷移できる', () => {
      cy.contains('日本語').click()
      cy.contains('ブログ記事')
    })

    it('Next.js の公式ドキュメントへのリンクが存在する', () => {
      cy.contains(link).should('have.attr', 'href', url)
    })
  })

  context('日本語の記事', () => {
    beforeEach(() => {
      cy.contains('日本語').click()
    })

    it('日本語の記事タイトルは、「ブログ記事」である', () => {
      cy.contains('ブログ記事')
    })

    it('URLは「/ja-JP/i18n-blog/first-blog」である', () => {
      cy.url().should('eq', Cypress.config().baseUrl + '/ja-JP/i18n-blog/first-blog')
    })

    it('英語の記事に遷移できる', () => {
      cy.contains('English').click()
      cy.contains('My Blog')
    })

    it('Next.js の公式ドキュメントへのリンクが存在する', () => {
      cy.contains(link).should('have.attr', 'href', url)
    })
  })
})
