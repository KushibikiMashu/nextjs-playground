/// <reference types="cypress" />

context('/api/posts', () => {
  context('/api/posts は、記事の JSON を返す', () => {
    it('記事1が含まれている', () => {
      cy.fixture('post').then((post) => {
        cy.request('api/posts').then((res) => {
          // オブジェクト同士を比較する
          expect(JSON.stringify(res.body[0])).eq(JSON.stringify(post))
        })
      })
    })
  })
})
