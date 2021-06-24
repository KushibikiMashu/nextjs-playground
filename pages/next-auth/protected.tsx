import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

const NextAuthProtectedPage = () => {
  const [session] = useSession()
  const router = useRouter()
  const handleClick = () => router.back()

  return (
    <div className="mx-8">
      <div>
        {session ? (
          'Now you are logged in!'
        ) : (
          <p>
            You have to{' '}
            <button className="link" type="button" onClick={() => signIn()}>
              Sign in
            </button>
          </p>
        )}
      </div>
      <div>
        <button type="button" onClick={handleClick}>
          <span className="link">back</span>
        </button>
      </div>
    </div>
  )
}

export default NextAuthProtectedPage
