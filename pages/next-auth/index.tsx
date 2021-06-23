import CustomLink from '~/src/components/_shared/CustomLink'
import { Paths } from '~/src/constants'

const Page = () => {
  return (
    <div className="mx-8 text-center">
      <nav>
        <CustomLink path={Paths['next-auth/protected']}>
          <a className="link">protected page</a>
        </CustomLink>
      </nav>

      <main className="my-4">
        <span>Login</span>
      </main>
    </div>
  )
}

export default Page
