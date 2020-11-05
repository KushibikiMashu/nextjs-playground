import { createContext } from 'react'
import { createSelector } from 'reselect'

type State = {
  shop: {
    taxPercent: number
    items: { name: string; value: number }[]
  }
}

export const shopState: State = {
  shop: {
    taxPercent: 8,
    items: [
      { name: 'apple', value: 1.2 },
      { name: 'orange', value: 0.95 },
    ],
  },
}

export const ShopContext = createContext(shopState)

const shopItemsSelector = (state: State) => state.shop.items
const taxPercentSelector = (state: State) => state.shop.taxPercent

export const subtotalSelector = createSelector(shopItemsSelector, (items) =>
  items.reduce((acc, item) => acc + item.value, 0)
)

export const taxSelector = createSelector(
  subtotalSelector,
  taxPercentSelector,
  (subtotal, taxPercent) => subtotal * (taxPercent / 100)
)

export const totalSelector = createSelector(subtotalSelector, taxSelector, (subtotal, tax) => ({
  total: subtotal + tax,
}))
