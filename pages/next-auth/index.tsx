import { signIn, signOut, useSession } from 'next-auth/client'
import CustomLink from '~/src/components/_shared/CustomLink'
import { Paths } from '~/src/constants'

const NextAuthPage = () => {
  const [session, loading] = useSession()

  if (loading) {
    return (
      <div style={{ height: 375 }}>
        <h1 className="pb-4 text-xl font-bold text-center">loading</h1>
      </div>
    )
  }

  const canLogin = !session
  const canLogout = !!session

  return (
    <div className="mx-8">
      <nav className=" text-center">
        <CustomLink path={Paths['next-auth/protected']}>
          <a className="link">protected page</a>
        </CustomLink>
      </nav>

      <main className="my-4">
        <div className="flex justify-center space-x-4 text-center">
          <button
            className={`px-4 py-2 rounded-md text-white ${
              canLogin ? 'bg-orange-400' : 'bg-gray-400 cursor-not-allowed'
            }`}
            type="button"
            onClick={() => signIn()}
            disabled={!canLogin}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 rounded-md text-white ${
              canLogout ? 'bg-teal-400' : 'bg-gray-400 cursor-not-allowed'
            }`}
            type="button"
            onClick={() => signOut()}
            disabled={!canLogout}
          >
            Logout
          </button>
        </div>

        <div className="pt-16 pb-4">
          {session ? (
            <>
              <h1 className="pb-4 text-xl font-bold text-center">User Info</h1>
              <ul className="space-y-2">
                {Object.keys(session.user).map((key) => (
                  <li key={key}>
                    {key}: {session.user[key]}
                  </li>
                ))}
              </ul>
              <div className="py-4 flex justify-center">
                <div>
                  <img className="rounded-full" src={session.user.image} alt="profile" />
                  <p className="pt-4 text-center">user icon</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-xl font-bold text-center">You are not logged in.</h1>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default NextAuthPage
