import React, { useEffect, useRef, useState } from 'react'
import { Backpack, Ghost, IceCream } from 'react-kawaii'

// 本当は setTimeout で 30秒ごとに表示/非表示の制御をするのが一番簡単に実現できる
// ただ、今回は Redux の store の値の変化をトリガーにするため、下記のような実装にしている

type Ref = {
  isFirstTime: boolean
  index: number
}

type ContainerProps = { fired: boolean }

type Props = { display: 'block' | 'none' }

// eslint-disable-next-line react/display-name
const Component: React.FC<Props> = (props) => (
  <div
    className="kawaii"
    style={{
      // 初回アクセス時は表示しない
      display: props.display,
    }}
    data-qa="kawaii"
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
  const [canDisplay, setDisplay] = useState(false)

  const common = { size: 160 }
  const components = [
    <Backpack {...common} mood="excited" color="#FFD882" key={0} />,
    <Ghost {...common} mood="blissful" color="#E0E4E8" key={1} />,
    <IceCream {...common} mood="blissful" color="#FDA7DC" key={2} />,
  ]

  useEffect(() => {
    setDisplay(true)
  }, [props.fired])

  useEffect(() => {
    setTimeout(() => {
      setDisplay(false)
      // shuffle
      const index = Math.floor(Math.random() * Math.floor(components.length))
      ref.current = {
        isFirstTime: false,
        index,
      }
      // 5000ms ではうまくいかないので、4900ms にしている。
    }, 4900)
  }, [props.fired])

  // 初回アクセス時は表示しない
  // 以降は、変数 canDisplay で判定する
  const display = ref.current.isFirstTime ? 'none' : canDisplay ? 'block' : 'none'

  return <Component display={display}>{components[ref.current.index]}</Component>
}

export default Container
