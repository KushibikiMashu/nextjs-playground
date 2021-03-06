import '~/src/assets/style.scss'
import { ApolloProvider } from '@apollo/client'
import { Provider as SessionProvider } from 'next-auth/client'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Provider as StoreProvider } from 'react-redux'
import Layout from '~/src/components/layout'
import client from '~/src/lib/apollo-client'
import { useStore } from '~/src/store/store'

const App = ({ Component, pageProps }: AppProps) => {
  const store = useStore(pageProps.initialReduxState)
  const router = useRouter()
  const pathname = router.pathname

  return (
    <ApolloProvider client={client}>
      <StoreProvider store={store}>
        <SessionProvider session={pageProps.session}>
          <Layout pathname={pathname}>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </StoreProvider>
    </ApolloProvider>
  )
}

export default App
