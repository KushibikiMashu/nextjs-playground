import { NextApiRequest, NextApiResponse } from 'next'
import { posts } from '~/src/data'

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    res.status(200).json({ posts })
    res.end()
  } else {
    res.end(`Invalid method ${req.method}. Only GET is allowed.`)
  }
}
