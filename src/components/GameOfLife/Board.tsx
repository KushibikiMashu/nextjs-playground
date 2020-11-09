import React from 'react'
import GameOfLife, { Cell } from '~/src/components/GameOfLife/game'
import useGameControl from '~/src/hooks/useGameControl'

type ContainerProps = { game: GameOfLife }

type Props = {
  display: (cell: Cell) => '■' | '□'
} & ReturnType<typeof useGameControl>

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
  const hooks = useGameControl(props)
  const display = (cell: Cell) => (cell === 1 ? '■' : '□')

  return <Component {...hooks} display={display} />
}

Container.displayName = 'Board'

export default Container
