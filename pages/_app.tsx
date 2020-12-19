import './style.scss'
import { useRouter } from 'next/router'
import Layout from '~/src/components/layout'

const App = ({ Component, pageProps }) => {
  const router = useRouter()
  const pathname = router.pathname

  return (
    <Layout pathname={pathname}>
      <Component {...pageProps} />
    </Layout>
  )
}

export default App
