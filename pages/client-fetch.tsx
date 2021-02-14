import React, { useEffect, useState } from 'react'

const url = 'https://jsonplaceholder.typicode.com'
const postsUrl = `${url}/posts`
const getPostUrl = (id: number) => `${postsUrl}/${id}`

type Todo = {
  id: number
  title: number
  completed: boolean
  userId: number
}

const TodoItem: React.FC<Todo> = (props) => (
  <div className="flex justify-between">
    <div>
      <input type="checkbox" checked={props.completed} readOnly />
    </div>
    <div className="space-x-2">
      <span>id: {props.id}</span>
      <span>title: {props.title}</span>
      <span>by user id: {props.userId}</span>
    </div>
  </div>
)

const Loading: React.FC = () => <div>loading</div>

const FetchOnRender = () => {
  const [post, setPost] = useState<Todo | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    fetch(getPostUrl(1))
      .then((res) => res.json())
      .then(setPost)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (post === null || loading) {
    return <Loading />
  }

  return <TodoItem {...post} />
}

const Swr = () => {}

const ReduxThunk = () => {}

const ContextAndReducer = () => {}

// suspense

type Props = unknown

const Component: React.FC<Props> = (props) => (
  <div>
    <div className="my-2 text-center">
      <h1 className="mb-2">Client fetch</h1>
      <p>Fetching todo data by various approaches</p>
    </div>
    <div>
      <section>
        <h2 className="my-2">Fetch on render</h2>
        <p>todo: 1</p>
        <FetchOnRender />
      </section>

      {/*<section>*/}
      {/*<h2 className="my-2">SWR</h2>*/}
      {/*  <p>todo: 2</p>*/}
      {/*  </section>*/}

      {/*<section>*/}
      {/*<h2 className="my-2">Redux Thunk</h2>*/}
      {/*  <p>todo: 3</p>*/}
      {/*    </section>*/}
    </div>
  </div>
)

export default Component
