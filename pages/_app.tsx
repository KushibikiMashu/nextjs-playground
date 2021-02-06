import './style.scss'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import Layout from '~/src/components/layout'
import { useStore } from '~/src/store/store'

const App = ({ Component, pageProps }: AppProps) => {
  const store = useStore(pageProps.initialReduxState)
  const router = useRouter()
  const pathname = router.pathname

  return (
    <Provider store={store}>
      <Layout pathname={pathname}>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default App
