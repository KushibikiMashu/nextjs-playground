import { CircularProgress } from '@material-ui/core'
import Link from 'next/link'
import React, { useCallback, useState } from 'react'
import useSWR from 'swr'
import { posts } from '~/src/data'
import { Post } from '~/src/types'

type ContainerProps = unknown

type Props = {
  post: Post | undefined
  onClick: () => void
  path: string
}

export const Component: React.FC<Props> = (props) => (
  <div className="py-12 text-center">
    {!props.post ? (
      <CircularProgress />
    ) : (
      <>
        <h1 className="text-2xl font-bold">
          {props.post.id}: {props.post.title}
        </h1>
        <p className="py-4">{props.post.body}</p>

        <p className="text-sm">
          Request to {props.path} by{' '}
          <a className="text-blue-600 visited:text-purple-600" href="https://swr.vercel.app/">
            SWR
          </a>
        </p>

        <button className="mx-4 mt-8 text-white rounded-md px-4 py-2 bg-teal-500" type="button" onClick={props.onClick}>
          rotate
        </button>

        <div className="m-10">
          <Link href="/">
            <a className="text-blue-600 visited:text-purple-600">Top</a>
          </Link>
        </div>
      </>
    )}
  </div>
)

const Container: React.FC<ContainerProps> = () => {
  const [id, setId] = useState(1)
  const handleClick = useCallback(() => {
    setId((state) => (state === posts.length ? 1 : state + 1))
  }, [])

  const path = `/api/posts/${id}`
  const { data: post } = useSWR<Post>(path, () => fetch(path).then((res) => res.json()))

  return <Component post={post} onClick={handleClick} path={path} />
}

Container.displayName = 'ClientFetchPage'

export default Container
