import { createContext } from 'react'
import { createSelector } from 'reselect'

export type State = {
  shop: {
    taxPercent: number
    items: { name: string; value: number }[]
  }
}

export const shopState: State = {
  shop: {
    taxPercent: 10,
    items: [
      { name: 'apple', value: 120 },
      { name: 'orange', value: 95 },
    ],
  },
}

type Context = { state: State; addItem?: (item: State['shop']['items'][number]) => void }

export const ShopContext = createContext<Context>({
  state: shopState,
})

const shopItemsSelector = (state: State) => state.shop.items
const taxPercentSelector = (state: State) => state.shop.taxPercent

export const appleSelector = createSelector(shopItemsSelector, (items): { name: 'apple'; value: number } =>
  items.find((item) => item.name === 'apple')
)

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
