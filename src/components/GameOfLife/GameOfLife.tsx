import React from 'react'

type ContainerProps = unknown

type Props = unknown

export const Component: React.FC<Props> = () => <></>

const Container: React.FC<ContainerProps> = () => {
  return <Component />
}

Container.displayName = 'GameOfLife'

export default Container
