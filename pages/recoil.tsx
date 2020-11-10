import { NextPage } from 'next'
import React, { useCallback } from 'react'
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil'
import { posts as defaultPosts } from '~/src/data'
import { Post, Posts } from '~/src/types'

type ContainerProps = unknown

type Props = {
  posts: Posts
  newPost: Post
  onClick: () => void
  onResetClick: () => void
}

// atom
const postsState = atom({
  key: 'posts::all',
  default: defaultPosts,
})

// selector
const newPostState = selector({
  key: 'posts::new',
  get: ({ get }) => get(postsState).slice(-1)[0],
})

export const Component: React.FC<Props> = (props) => (
  <div className="mx-auto text-center">
    <h1 className="text-2xl font-bold">Recoil</h1>
    <p className="text-sm text-center">Recoil manages the component state.</p>

    <div className="my-8">
      <button className="btn-blue mx-4" type="button" onClick={props.onClick}>
        Add post
      </button>
      <button className="btn-red mx-4" type="button" onClick={props.onResetClick}>
        Reset
      </button>
    </div>

    <p>Latest Post ID: {props.newPost.id}</p>

    <ul>
      {props.posts.map((post, i) => (
        <li key={i}>
          <h1 className="text-2xl font-bold">
            {post.id}: {post.title}
          </h1>
          <p className="py-4">{post.body}</p>
        </li>
      ))}
    </ul>
  </div>
)

const Container: React.FC<ContainerProps> = () => {
  const [posts, setPosts] = useRecoilState(postsState)
  const newPost = useRecoilValue(newPostState)

  const handleClick = useCallback(() => {
    const dummyPost: Post = {
      id: posts.length + 1,
      title: 'dummy title',
      body: 'dummy body',
      date: '2021-01-01',
    }
    setPosts((state) => [...state, dummyPost])
  }, [posts.length])
  const handleResetClick = useCallback(() => setPosts(defaultPosts), [])

  return <Component posts={posts} newPost={newPost} onClick={handleClick} onResetClick={handleResetClick} />
}

const Page: NextPage = () => (
  <RecoilRoot>
    <Container />
  </RecoilRoot>
)

Page.displayName = 'RecoilPage'

export default Page
