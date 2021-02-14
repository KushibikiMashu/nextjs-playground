import { CircularProgress } from '@material-ui/core'
import React from 'react'
import usePost from '~/src/hooks/usePost'
import { Post } from '~/src/types'

type ContainerProps = unknown

type Props = {
  post: Post | undefined
  onClick: () => void
}

export const Component: React.FC<Props> = (props) => (
  <div className="py-12 text-center">
    {!props.post ? (
      <div className="py-8">
        <CircularProgress data-qa="loading" />
      </div>
    ) : (
      <>
        <h1 className="text-2xl font-bold">
          {props.post.id}: {props.post.title}
        </h1>
        <p className="py-4">{props.post.body}</p>

        <p className="text-sm">
          Request to /api/posts/{props.post.id} by{' '}
          <a className="text-blue-600 visited:text-purple-600" href="https://swr.vercel.app/">
            SWR
          </a>
        </p>
      </>
    )}

    <button className="mx-4 my-8 text-white rounded-md px-4 py-2 bg-teal-500" type="button" onClick={props.onClick}>
      rotate
    </button>

    <p className="text-sm">Just click the button above 6 times!</p>
    <p className="text-sm">You will find loading will be faster at 4th, 5th and 6th click.</p>
    <p className="text-sm">It is because SWR loads post data from client cache at the second rotation.</p>
  </div>
)

const Container: React.FC<ContainerProps> = () => {
  const { post, handleClick } = usePost()

  return <Component post={post} onClick={handleClick} />
}

Container.displayName = 'SwrPage'

export default Container
