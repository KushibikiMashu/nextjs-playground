import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

type ContainerProps = unknown

type Props = {
  children?: React.ReactNode
  isTop: boolean
}

export const Component: React.FC<Props> = (props) => (
  <div className="flex flex-col min-h-screen">
    <nav className="w-screen flex items-center justify-between bg-white border-b border-gray-200 fixed inset-x-0 z-100 h-16">
      <p className="pl-8 text-teal-600 text-xl">
        <Link href="/">
          <a>Next.js Playground</a>
        </Link>
      </p>
      <a
        className="mr-8 text-sm text-blue-600 visited:text-purple-600"
        href="https://github.com/KushibikiMashu/nextjs-playground"
      >
        GitHub
      </a>
    </nav>
    <div className="flex-grow pt-24">
      {props.children}
      {!props.isTop && (
        <div className="m-10 text-center">
          <Link href="/">
            <a className="text-blue-600 visited:text-purple-600">Top</a>
          </Link>
        </div>
      )}
    </div>
    <footer className="py-8 flex justify-center items-center border-t border-gray-200">
      Created By{' '}
      <a className="pl-2 text-blue-600 visited:text-purple-600" href="https://">
        @Panda_Program
      </a>
    </footer>
  </div>
)

const Container: React.FC<ContainerProps> = (props) => {
  const router = useRouter()
  const isTop = router.pathname === '/'

  return <Component {...props} isTop={isTop} />
}

Container.displayName = 'Layout'

export default Container
