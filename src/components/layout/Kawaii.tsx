import React, { MutableRefObject, PropsWithChildren, useEffect, useRef, useState } from 'react'
import { Backpack, Ghost, IceCream } from 'react-kawaii'

type Ref = {
  isFirstTime: boolean
  index: number
}

type ContainerProps = { fired: boolean }

type Props = PropsWithChildren<{
  canDisplay: boolean
  customRef: MutableRefObject<Ref>
}>

// eslint-disable-next-line react/display-name
const Component = (props: Props) => (
  <div
    className="kawaii"
    style={{
      // 初回アクセス時は表示しない
      display: !props.customRef.current.isFirstTime && props.canDisplay ? 'block' : 'none',
    }}
  >
    <a href="https://react-kawaii.now.sh/" target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  </div>
)

const Container: React.FC<ContainerProps> = (props) => {
  const ref = useRef<Ref>({
    isFirstTime: true,
    index: 0,
  })
  const [canDisplay, display] = useState(false)

  const common = { size: 160 }
  const components = [
    <Backpack {...common} mood="excited" color="#FFD882" key={0} />,
    <Ghost {...common} mood="blissful" color="#E0E4E8" key={1} />,
    <IceCream {...common} mood="blissful" color="#FDA7DC" key={2} />,
  ]

  useEffect(() => {
    display(true)
  }, [props.fired])

  useEffect(() => {
    setTimeout(() => {
      display(false)
      // shuffle
      const index = Math.floor(Math.random() * Math.floor(components.length))
      ref.current = {
        isFirstTime: false,
        index,
      }
    }, 4900)
  }, [props.fired])

  return (
    <Component canDisplay={canDisplay} customRef={ref}>
      {components[ref.current.index]}
    </Component>
  )
}

export default Container
