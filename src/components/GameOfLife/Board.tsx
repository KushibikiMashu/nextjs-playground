import React, { useEffect, useState } from 'react'
import GameOfLife, { Board, Cell } from '~/src/components/GameOfLife/game'

type ContainerProps = { game: GameOfLife }

type Props = {
  board: Board
  display: (cell: Cell) => '■' | '□'
}

export const Component: React.FC<Props> = (props) => (
  <div className="text-center">
    {props.board.map((row, i) => (
      <div key={i}>
        {row.map((cell, j) => (
          <span key={j}>{props.display(cell)}</span>
        ))}
      </div>
    ))}
  </div>
)

const Container: React.FC<ContainerProps> = (props) => {
  const [board, update] = useState(() => props.game.getBoard)

  useEffect(() => {
    const id = setInterval(() => {
      props.game.next()
      update(props.game.getBoard)
    }, 500)

    return () => clearInterval(id)
  }, [])

  const display = (cell: Cell) => (cell === 1 ? '■' : '□')

  return <Component board={board} display={display} />
}

Container.displayName = 'Board'

export default Container
