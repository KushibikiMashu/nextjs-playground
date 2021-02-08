/// <reference types="cypress" />

context('/redux', () => {
  beforeEach(() => {
    // setInterval を止める
    cy.visit('/')
    cy.contains('redux').click()
  })

  context('app', () => {
    describe('counter', () => {
      const getText = (count) => `"count": ${count}`
      const plus = '+'
      const minus = '-'
      const reset = 'reset'

      it('+ を押すと、カウントを1ずつ増やす', () => {
        cy.contains(getText(0))

        cy.contains(plus).click()
        cy.contains(getText(1))

        cy.contains(plus).click()
        cy.contains(plus).click()
        cy.contains(getText(3))
      })

      it('- を押すと、カウントを1ずつ減らす', () => {
        cy.contains(getText(0))

        cy.get('button').contains(minus).click()
        cy.contains(getText(-1))

        cy.get('button').contains(minus).click()
        cy.get('button').contains(minus).click()
        cy.contains(getText(-3))
      })

      it('reset を押すと、カウントを0にする', () => {
        cy.contains(getText(0))

        // plus
        cy.contains(plus).click()
        cy.contains(getText(1))

        cy.contains(reset).click()
        cy.contains(getText(0))

        // minus
        cy.contains(minus).click()
        cy.contains(getText(-1))

        cy.contains(reset).click()
        cy.contains(getText(0))
      })
    })

    describe('timer', () => {
      it('lastUpdate は現在のタイムスタンプである', () => {
        const timestamp = new Date(2020, 1, 1, 12, 0, 0).getTime()
        const getText = (ts) => `"lastUpdate": ${ts}`

        cy.clock(timestamp)
        cy.contains(getText(timestamp))
        cy.contains('12:00:00')

        // 1秒進める
        cy.tick(1000)
        cy.contains(getText(timestamp + 1000))
        cy.contains('12:00:01')
      })
    })
  })

  context('ui', () => {
    xit('tickCount の値をテストする', () => {})
  })
})
