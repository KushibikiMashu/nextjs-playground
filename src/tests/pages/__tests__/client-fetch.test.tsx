import React from 'react'
import ClientFetch from '~/pages/client-fetch'
import { posts } from '~/src/data'
import usePost from '~/src/hooks/usePost'
import { render, screen } from '~/src/tests/utils'

jest.mock('~/src/hooks/usePost')

usePost.mockImplementation(() => ({
  post: posts[0],
  handleClick: () => {},
}))

test('コンポーネントを描画する', async () => {
  render(<ClientFetch />)

  expect(screen.getByText('Just click the button above 6 times!')).toBeInTheDocument()
})

test('IDが1の post を描画する', async () => {
  render(<ClientFetch />)

  expect(screen.getByText(posts[0].body)).toBeInTheDocument()
})
