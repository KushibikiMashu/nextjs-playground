import { render, screen } from '@testing-library/react'
import React from 'react'
import Swr from '~/pages/swr'
import { posts } from '~/src/data'
import usePost from '~/src/hooks/usePost'

jest.mock('~/src/hooks/usePost')

usePost.mockImplementation(() => ({
  post: posts[0],
  handleClick: () => {},
}))

test('コンポーネントを描画する', async () => {
  render(<Swr />)

  expect(screen.getByText('Just click the button above 6 times!')).toBeInTheDocument()
})

test('IDが1の post を描画する', async () => {
  render(<Swr />)

  expect(screen.getByText(posts[0].body)).toBeInTheDocument()
})
