/// <reference types="cypress" />

context('/client-fetch', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.contains('client-fetch').click()
  })

  context('fetch', () => {
    const loader = '[data-qa=loading]'

    xit('ローダーが表示された後、記事1を表示する', () => {
      cy.intercept('/api/posts/1', { delay: 500, fixture: 'post.json' })
      cy.get(loader, { timeout: 800 }).should('be.visible')
      // 要素が存在しないことを確認
      cy.get(loader).should('not.exist')
      cy.contains('1: Javascript')
    })

    xit('rotate を1度押すと、記事2を表示する', () => {
      cy.contains('rotate').click()
      cy.contains('2: React')
    })

    xit('rotate を3度押すと、記事1を表示する', () => {
      cy.contains('rotate').click()
      cy.contains('rotate').click()
      cy.contains('rotate').click()

      cy.contains('1: Javascript')
    })

    // Post 1 は SWR のキャッシュを利用して表示するため、ローダーを表示せずに済む
    it('トップページへ行き、/client-fetch に戻ると、loader を表示せず記事1を表示する', () => {
      cy.intercept('/api/posts/1', { delay: 500, fixture: 'post.json' })

      cy.contains('Top').click()
      cy.contains('client-fetch').click()

      cy.get(loader).should('not.exist')
      cy.contains('1: Javascript')
    })
  })
})
