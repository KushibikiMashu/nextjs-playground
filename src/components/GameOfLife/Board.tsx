import React, { useCallback, useEffect, useState } from 'react'
import GameOfLife, { Board, Cell } from '~/src/components/GameOfLife/game'

type ContainerProps = { game: GameOfLife }

type Props = {
  board: Board
  display: (cell: Cell) => '■' | '□'
  interval: number
  onNextClick: () => void
  onStopClick: () => void
  onSlowClick: () => void
  onFastClick: () => void
  onResetClick: () => void
}

export const Component: React.FC<Props> = (props) => (
  <>
    <div className="text-center">
      <div className="py-6">
        {props.board.map((row, i) => (
          <div key={i}>
            {row.map((cell, j) => (
              <span key={j}>{props.display(cell)}</span>
            ))}
          </div>
        ))}
      </div>

      <p className="my-4">
        {props.interval} ms（{`0 < interval < 1000`})
      </p>

      <div className="my-4">
        <button className="btn-blue mx-4" type="button" onClick={props.onNextClick}>
          Next
        </button>
      </div>

      <div className="my-4">
        <button className="btn-blue mx-4" type="button" onClick={props.onSlowClick}>
          Slow
        </button>
        <button className="btn-blue mx-4" type="button" onClick={props.onStopClick}>
          Stop
        </button>
        <button className="btn-blue mx-4" type="button" onClick={props.onFastClick}>
          Fast
        </button>
      </div>

      <div>
        <button className="btn-red" type="button" onClick={props.onResetClick}>
          Reset
        </button>
      </div>
    </div>
  </>
)

const Container: React.FC<ContainerProps> = (props) => {
  const [board, update] = useState(() => props.game.getBoard)
  const [interval, updateInterval] = useState(500)

  useEffect(() => {
    if (interval === 0) {
      return
    }
    const id = setInterval(() => {
      props.game.next()
      update(props.game.getBoard)
    }, interval)

    return () => clearInterval(id)
  }, [interval])

  const duration = 50
  const max = 1000
  const min = 50
  const handleNextClick = useCallback(() => {
    props.game.next()
    const board = props.game.getBoard
    update(board)
  }, [])
  const handleStopClick = useCallback(() => updateInterval(0), [])
  const handleSlowClick = useCallback(() => updateInterval((state) => (state >= max ? max : state + duration)), [])
  const handleFastClick = useCallback(() => updateInterval((state) => (state <= min ? min : state - duration)), [])
  const handleResetClick = useCallback(() => {
    props.game.reset()
    updateInterval(500)
  }, [])

  const display = (cell: Cell) => (cell === 1 ? '■' : '□')

  return (
    <Component
      board={board}
      display={display}
      interval={interval}
      onNextClick={handleNextClick}
      onStopClick={handleStopClick}
      onSlowClick={handleSlowClick}
      onFastClick={handleFastClick}
      onResetClick={handleResetClick}
    />
  )
}

Container.displayName = 'Board'

export default Container
