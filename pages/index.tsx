import Link from 'next/link'
import Greeting from 'src/components/greeting'
import { Pages } from '~/src/types'

type ContainerProps = undefined

type Props = {
  pages: Pages
}

const Component: React.FC<Props> = (props) => (
  <div>
    <div className="pb-8">
      <Greeting target={'Next.js Playground'} />
    </div>

    <div className="py-10">
      <h2 className="text-center text-2xl font-bold">Pages / APIs</h2>
      <ul className="text-center">
        {props.pages.map((page) => (
          <li className="m-6" key={page.name}>
            <Link href={`/${page.name}`}>
              <a className="text-xl text-blue-600 visited:text-purple-600">{page.name}</a>
            </Link>
            <p className="py-2 text-md">{page.description}</p>
          </li>
        ))}
      </ul>
    </div>
  </div>
)

const Container: React.FC<ContainerProps> = () => {
  const pages = [
    {
      name: 'modals',
      description: 'An Implementation of Modal, Drawer and Dialog with Material UI.',
    },
    {
      name: 'client-fetch',
      description: 'Fetch Blog Post from browser to Next.js server by SWR',
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
