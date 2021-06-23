import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Kawaii from './Kawaii'
import CustomLink from '~/src/components/_shared/CustomLink'
import { GITHUB_REPOSITORY_URL, Paths } from '~/src/constants'
import { startClock } from '~/src/store/app/timer'
import { kawaiiFire, kawaiiIdle } from '~/src/store/ui/kawaii'

type ContainerProps = { pathname: string }

type Props = {
  children?: React.ReactNode
  isTop: boolean
  gitHubUrl: string
  timerFlag: boolean
  time: string
  isKawaiiFired: boolean
  showKawaii: boolean
  onToggleClick: () => void
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
        <button className="ml-2 p-2 text-blue-800" style={{ width: 80 }} type="button" onClick={props.onToggleClick}>
          {props.showKawaii ? 'kawaii on' : 'kawaii off'}
        </button>
      </div>
    </nav>
    <main className="flex-grow pt-24">
      {props.children}
      {!props.isTop && (
        <div className="m-10 text-center">
          <CustomLink path={Paths.top} locale="en-US">
            <a className="text-blue-600 visited:text-purple-600">Top</a>
          </CustomLink>
        </div>
      )}
    </main>

    {/* timer */}
    <div
      className="timer"
      style={{
        color: props.timerFlag ? '#86EFAC' : '#FFFFFF',
      }}
    >
      <time dateTime={props.time}>{props.time}</time>
    </div>

    {/* react kawaii */}
    {props.showKawaii && <Kawaii fired={props.isKawaiiFired} />}
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
    const { tickCount, kawaiiStatus } = useSelector((state) => state.ui)
    const { lastUpdate } = useSelector((state) => state.app.timer)
    const dispatch = useDispatch()
    // timer の色を変えるフラグ
    const [timerFlag, setTimerFlag] = useState(false)

    const [showKawaii, toggle] = useState(true)
    const handleToggleClick = () => toggle((state) => !state)

    useEffect(() => {
      dispatch(startClock())
    }, [])

    // tick の回数 30 回ごとにフラグを toggle する
    useEffect(() => {
      if (!showKawaii) {
        return () => {}
      }

      const canDivideByThirty = tickCount !== 0 && tickCount % 30 === 0
      if (canDivideByThirty) {
        setTimerFlag((state) => !state)
        dispatch(kawaiiFire())
        return () => {}
      }

      dispatch(kawaiiIdle())
    }, [tickCount])

    // link
    const isTop = props.pathname === '/'
    const githubPath = isTop ? '' : `/blob/main/pages${props.pathname}.tsx`
    const gitHubUrl = GITHUB_REPOSITORY_URL + githubPath

    // タイマーに表示する時間
    const _time = (tickCount === 0 ? new Date() : new Date(lastUpdate)).toLocaleString('ja-JP').slice(-8).trim()
    const time = _time.length === 7 ? '0' + _time : _time

    // kawaii を表示するタイミング
    const isKawaiiFired = kawaiiStatus === 'fired'

    return (
      <Component
        {...props}
        timerFlag={timerFlag}
        isTop={isTop}
        gitHubUrl={gitHubUrl}
        time={time}
        isKawaiiFired={isKawaiiFired}
        showKawaii={showKawaii}
        onToggleClick={handleToggleClick}
      />
    )
  },
  (prev, next) => prev.children === next.children
)

Container.displayName = 'Layout'

export default Container
