import React, { memo, useEffect, useRef, useState } from 'react'
import { Backpack, Ghost, IceCream } from 'react-kawaii'
import { useDispatch, useSelector } from 'react-redux'
import CustomLink from '~/src/components/_shared/CustomLink'
import { GITHUB_REPOSITORY_URL, Paths } from '~/src/constants'
import { startClock } from '~/src/store/app/timer'

type ContainerProps = { pathname: string }

type Props = {
  children?: React.ReactNode
  isTop: boolean
  gitHubUrl: string
  timerFlag: boolean
  time: string
}

// react kawaii
const Kawaii = (props) => {
  const ref = useRef({
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
  }, [props.shown])

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
  }, [props.shown])

  return (
    <div
      className="kawaii"
      style={{
        // 初回アクセス時は表示しない
        display: !ref.current.isFirstTime && canDisplay ? 'block' : 'none',
      }}
    >
      <a href="https://react-kawaii.now.sh/" target="_blank" rel="noopener noreferrer">
        {components[ref.current.index]}
      </a>
    </div>
  )
}

// eslint-disable-next-line react/display-name
export const Component: React.FC<Props> = memo((props) => (
  <div className="flex flex-col min-h-screen">
    <nav className="w-screen flex items-center justify-between bg-white border-b border-gray-200 fixed inset-x-0 z-100 h-16">
      <p className="pl-8 text-teal-600 text-xl">
        <CustomLink path={Paths.top} locale="en-US">
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
          <CustomLink path={Paths.top} locale="en-US">
            <a className="text-blue-600 visited:text-purple-600">Top</a>
          </CustomLink>
        </div>
      )}

      {/* timer */}
      <div
        className={`fixed bg-black px-4 py-2 rounded-t-md`}
        style={{
          bottom: 0,
          right: 24,
          fontFamily: 'menlo, monaco, monospace',
          color: props.timerFlag ? '#FFFFFF' : '#86EFAC',
        }}
      >
        <time dateTime={props.time}>{props.time}</time>
      </div>

      {/* react kawaii */}
      <Kawaii shown={props.timerFlag} />
    </div>
    <footer className="py-8 flex justify-center items-center border-t border-gray-200">
      Created By{' '}
      <a className="ml-2 text-blue-600 visited:text-purple-600" href="https://twitter.com/Panda_Program">
        @Panda_Program
      </a>
    </footer>
  </div>
))

const Container: React.FC<ContainerProps> = memo(
  (props) => {
    const { tickCount } = useSelector((state) => state.ui)
    const { lastUpdate } = useSelector((state) => state.app.timer)
    const dispatch = useDispatch()
    // timer の色を変えるフラグ
    const [timerFlag, setTimerFlag] = useState(false)

    useEffect(() => {
      dispatch(startClock())
    }, [])

    // tick の回数 30 回ごとにフラグを toggle する
    useEffect(() => {
      const canDivideBySixty = tickCount !== 0 && tickCount % 30 === 0
      if (canDivideBySixty) {
        setTimerFlag((state) => !state)
      }
    }, [tickCount])

    // link
    const isTop = props.pathname === '/'
    const githubPath = isTop ? '' : `/blob/main/pages${props.pathname}.tsx`
    const gitHubUrl = GITHUB_REPOSITORY_URL + githubPath

    // タイマーに表示する時間
    const _time = (tickCount === 0 ? new Date() : new Date(lastUpdate)).toLocaleString('ja-JP').slice(9)
    const time = _time.length === 7 ? '0' + _time : _time

    return <Component {...props} timerFlag={timerFlag} isTop={isTop} gitHubUrl={gitHubUrl} time={time} />
  },
  (prev, next) => prev.children === next.children
)

Container.displayName = 'Layout'

export default Container
