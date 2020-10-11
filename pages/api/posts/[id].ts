import { NextApiRequest, NextApiResponse } from 'next'
import { posts } from '~/src/data'

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const id = parseInt(req.query.id as string, 10)
    const len = posts.length

    if (id > len || id < 1) {
      res.status(404).end(`Invalid ID: ${id}. ID must be one of 1 to ${len}.`)
    }

    const index = id - 1
    const post = posts[index]

    res.status(200).json({ post })
    res.end()
  } else {
    res.end(`Invalid method ${req.method}. Only GET is allowed.`)
  }
}
