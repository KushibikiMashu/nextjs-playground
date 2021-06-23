import { signIn } from 'next-auth/client'
import CustomLink from '~/src/components/_shared/CustomLink'
import { Paths } from '~/src/constants'

const NextAuthPage = () => {
  return (
    <div className="mx-8 text-center">
      <nav>
        <CustomLink path={Paths['next-auth/protected']}>
          <a className="link">protected page</a>
        </CustomLink>
      </nav>

      <main className="my-4">
        <button className="px-4 py-2 rounded-md text-white bg-teal-400" type="button" onClick={() => signIn()}>
          Login
        </button>
      </main>
    </div>
  )
}

export default NextAuthPage
