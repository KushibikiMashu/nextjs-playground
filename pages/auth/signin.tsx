import { ClientSafeProvider, getProviders, signIn } from 'next-auth/client'

type Props = {
  providers: Record<string, ClientSafeProvider>
}

const SignInPage: React.VFC<Props> = (props) => {
  return (
    <div>
      <ul className="text-center">
        {Object.values(props.providers).map((provider) => (
          <li key={provider.name}>
            <button className="p-4 rounded-md text-white bg-teal-400" type="button" onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const getServerSideProps = async () => {
  const providers = await getProviders()

  return {
    props: { providers },
  }
}

export default SignInPage
