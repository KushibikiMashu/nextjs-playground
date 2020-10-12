import { rest } from 'msw'
import { posts } from '~/src/data'

export const handlers = [
  rest.get('https://example.com/api/post/1', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(posts[0]))
  }),
  rest.get('https://example.com/api/posts', (req, res, ctx) => res(ctx.status(200), ctx.json(posts))),
]
