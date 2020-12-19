import { useRouter } from 'next/router'
import React from 'react'
import CustomLink from '~/src/components/_shared/CustomLink'
import { GITHUB_REPOSITORY_URL, Paths } from '~/src/constants'

type ContainerProps = unknown

type Props = {
  children?: React.ReactNode
  isTop: boolean
  gitHubUrl: string
}

export const Component: React.FC<Props> = (props) => (
  <div className="flex flex-col min-h-screen">
    <nav className="w-screen flex items-center justify-between bg-white border-b border-gray-200 fixed inset-x-0 z-100 h-16">
      <p className="pl-8 text-teal-600 text-xl">
        <CustomLink path={Paths.top}>
          <a>Next.js Playground</a>
        </CustomLink>
      </p>
      <div className="mr-8 text-sm">
        <a className="link" href={props.gitHubUrl}>
          GitHub
        </a>
        <a className="ml-4 link" href="https://twitter.com/Panda_Program">
          Twitter
        </a>
      </div>
    </nav>
    <div className="flex-grow pt-24">
      {props.children}
      {!props.isTop && (
        <div className="m-10 text-center">
          <CustomLink path={Paths.top}>
            <a className="text-blue-600 visited:text-purple-600">Top</a>
          </CustomLink>
        </div>
      )}
    </div>
    <footer className="py-8 flex justify-center items-center border-t border-gray-200">
      Created By{' '}
      <a className="ml-2 text-blue-600 visited:text-purple-600" href="https://twitter.com/Panda_Program">
        @Panda_Program
      </a>
    </footer>
  </div>
)

const Container: React.FC<ContainerProps> = (props) => {
  const router = useRouter()
  const isTop = router.pathname === '/'
  const path = isTop ? '' : `/blob/main/pages/${router.pathname}.tsx`
  const gitHubUrl = GITHUB_REPOSITORY_URL + path

  return <Component {...props} isTop={isTop} gitHubUrl={gitHubUrl} />
}

Container.displayName = 'Layout'

export default Container
