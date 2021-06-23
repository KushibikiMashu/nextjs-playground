import { useRouter } from 'next/router'

const NextAuthProtectedPage = () => {
  const router = useRouter()
  const handleClick = () => router.back()

  return (
    <div className="mx-8">
      <button type="button" onClick={handleClick}>
        <span className="link">back</span>
      </button>
    </div>
  )
}

export default NextAuthProtectedPage