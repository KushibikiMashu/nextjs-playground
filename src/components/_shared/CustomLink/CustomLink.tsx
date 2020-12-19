import Link, { LinkProps } from 'next/link'
import React from 'react'
import { CustomLinkArgs, createPath } from '~/src/constants'

type ContainerProps = CustomLinkArgs & Omit<LinkProps, 'href'>

type Props = { href: string } & Omit<LinkProps, 'href'>

export const Component: React.FC<Props> = (props) => (
  <Link href={props.href} {...props}>
    {props.children}
  </Link>
)

const Container: React.FC<ContainerProps> = (props) => {
  const href = createPath({ path: props.path, params: props.params })

  return (
    <Component {...props} href={href}>
      {props.children}
    </Component>
  )
}

export default Container
