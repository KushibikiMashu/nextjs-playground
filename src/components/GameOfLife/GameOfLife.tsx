import React from 'react'
import Board from './Board'
import GameOfLife from '~/src/components/GameOfLife/game'

type ContainerProps = unknown

type Props = { game: GameOfLife }

export const Component: React.FC<Props> = (props) => (
  <>
    <h1 className="mb-4 text-2xl font-bold text-center">Game Of Life</h1>

    <Board game={props.game} />
  </>
)

const Container: React.FC<ContainerProps> = () => {
  const game = new GameOfLife(8, 8)
  // 8角形
  game.setCellsAlive(
    [0, 3],
    [0, 4],
    [1, 2],
    [1, 5],
    [2, 1],
    [2, 6],
    [3, 0],
    [3, 7],
    [4, 0],
    [4, 7],
    [5, 1],
    [5, 6],
    [6, 2],
    [6, 5],
    [7, 3],
    [7, 4]
  )

  return <Component game={game} />
}

Container.displayName = 'GameOfLife'

export default Container
