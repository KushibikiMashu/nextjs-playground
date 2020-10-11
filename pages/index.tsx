import Link from 'next/link'
import Greeting from 'src/components/Greeting'

export default function IndexPage() {
  return (
    <div>
      <div className="py-20">
        <Greeting target={'Next.js Playground'} />
      </div>

      <div className="py-10">
        <h2 className="text-center text-2xl font-bold">Pages</h2>
        <ul className="text-xl text-center">
          <li className="m-6">
            <Link href="/modals">
              <a className="text-blue-600 visited:text-purple-600">modals</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
