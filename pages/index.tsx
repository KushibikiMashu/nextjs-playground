import Link from 'next/link'
import Greeting from 'src/components/Greeting'

export default function IndexPage() {
  return (
    <div>
      <div className="py-20">
        <Greeting target={'Next.js Starter Kit'} />
      </div>
      <ul className="m-6">
        <li>
          <Link href="/modals">
            <a>modals</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}
