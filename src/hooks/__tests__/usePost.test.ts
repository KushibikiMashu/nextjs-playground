import { renderHook } from '@testing-library/react-hooks'
import usePost from '../usePost'

describe('usePost', () => {
  test('/api/post/1 の初期データは undefined である', async () => {
    const { result } = renderHook(() => usePost())

    expect(result.current.post).toBeUndefined()
  })
})
