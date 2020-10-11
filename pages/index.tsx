import Link from 'next/link'
import Greeting from 'src/components/Greeting'

type ContainerProps = undefined

type Props = {
  pages: string[]
}

const Component: React.FC<Props> = (props) => (
  <div>
    <div className="py-20">
      <Greeting target={'Next.js Playground'} />
    </div>

    <div className="py-10">
      <h2 className="text-center text-2xl font-bold">Pages</h2>
      <ul className="text-xl text-center">
        {props.pages.map((page) => (
          <li className="m-6" key={page}>
            <Link href={`/${page}`}>
              <a className="text-blue-600 visited:text-purple-600">{page}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
)

const Container: React.FC<ContainerProps> = () => {
  const pages = ['modals']

  return <Component pages={pages} />
}

Container.displayName = 'IndexPage'

export default Container
