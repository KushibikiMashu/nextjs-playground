import { useCallback, useState } from 'react'
import useSWR from 'swr'
import { posts } from '~/src/data'
import { Post } from '~/src/types'

export default function usePost() {
  const [id, setId] = useState(1)
  const handleClick = useCallback(() => {
    setId((state) => (state === posts.length ? 1 : state + 1))
  }, [])

  const path = `/api/posts/${id}`
  const { data: post } = useSWR<Post>(path, () => fetch(path).then((res) => res.json()))

  return { post, handleClick }
}
