import Link from 'next/link'
import Greeting from 'src/components/greeting'
import { Pages } from '~/src/types'

type ContainerProps = undefined

type Props = {
  pages: Pages
}

const Component: React.FC<Props> = (props) => (
  <div>
    <main className="pb-6 main">
      <Greeting target={'Next.js Playground'} />

      <h2 className="py-2 text-center text-2xl">Pages / APIs</h2>

      <div className="_grid mx-auto">
        {props.pages.map((page) => (
          <Link href={`/${page.name}`} key={page.name}>
            <a href="https://nextjs.org/docs" className="card">
              <h3 className="mb-4 text-2xl font-bold">{page.name} &rarr;</h3>
              <p className="m-0 text-xl leading-normal">{page.description}</p>
            </a>
          </Link>
        ))}
      </div>
    </main>
  </div>
)

const Container: React.FC<ContainerProps> = () => {
  const pages = [
    {
      name: 're-render',
      description: 'How to avoid needless re-rendering.',
    },
    {
      name: 'client-fetch',
      description: 'Fetch Blog Post from browser to Next.js server by SWR.',
    },
    { name: 'game-of-life', description: "Implementation of Conway's Game of Life." },
    {
      name: 'use-reducer',
      description: 'State management with useReducer and useImmerReducer.',
    },
    {
      name: 'modals',
      description: 'An Implementation of Modal, Drawer and Dialog with Material UI.',
    },
    {
      name: 'api/posts',
      description: 'An Endpoint that returns Post data with API Routes by Next.js feature.',
    },
  ]

  return <Component pages={pages} />
}

Container.displayName = 'IndexPage'

export default Container
