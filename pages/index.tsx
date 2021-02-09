import Greeting from 'src/components/greeting'
import CustomLink from '~/src/components/_shared/CustomLink'
import { Paths } from '~/src/constants'
import { Pages } from '~/src/types'

type ContainerProps = undefined

type Props = {
  pages: Pages
}

const Component: React.FC<Props> = (props) => (
  <div className="pb-6 main">
    <Greeting target={'Next.js Playground'} />

    <h2 className="py-2 text-center text-2xl">Pages / APIs</h2>

    <div className="_grid mx-auto">
      {props.pages.map((page) => (
        <CustomLink path={page.path} key={page.path}>
          <a className="card">
            <h3 className="mb-4 text-2xl font-bold">{page.name} &rarr;</h3>
            <p className="m-0 text-xl leading-normal">{page.description}</p>
          </a>
        </CustomLink>
      ))}
    </div>
  </div>
)

const Container: React.FC<ContainerProps> = () => {
  const pages = [
    {
      path: Paths.redux,
      description: 'State management with Redux and Redux Thunk',
    },
    {
      path: Paths['i18n-blog/first-blog'],
      description: 'A Blog post written in English and Japanese, supporting i18n',
    },
    { path: Paths.recoil, description: 'State management of blog posts with Recoil' },
    { path: Paths.gameOfLife, description: "Implementation of Conway's Game of Life" },
    {
      path: Paths.rerender,
      description: 'How to avoid needless re-rendering',
    },
    {
      path: Paths.clientFetch,
      description: 'Fetch a blog post from browser to Next.js server by SWR',
    },
    {
      path: Paths.useReducer,
      description: 'State management with useImmerReducer',
    },
    {
      path: Paths.modals,
      description: 'An Implementation of Modal, Drawer and Dialog with Material UI',
    },
    {
      path: Paths['api/posts'],
      description: 'An Endpoint that returns Post data with API Routes by Next.js feature',
    },
  ].map((page) => ({
    ...page,
    // 最初の / を削除
    name: page.path.slice(-1 * page.path.length + 1),
  }))

  return <Component pages={pages} />
}

Container.displayName = 'IndexPage'

export default Container
