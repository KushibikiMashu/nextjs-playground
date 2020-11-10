import React from 'react'
import Board from './Board'
import GameOfLife from '~/src/components/gameOfLife/game'

type ContainerProps = unknown

type Props = { game: GameOfLife; gliderGunGame: GameOfLife }

export const Component: React.FC<Props> = (props) => (
  <>
    <h1 className="mb-4 text-2xl font-bold text-center">Game Of Life</h1>

    <h2 className="mb-4 text-xl text-center">Octagon</h2>
    <Board game={props.game} />
    <hr />

    <h2 className="mb-4 text-xl text-center">Glider Gun</h2>
    <Board game={props.gliderGunGame} />
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

  const gliderGunGame = new GameOfLife(38, 38)
  gliderGunGame.setCellsAlive(
    [1, 25],
    [2, 23],
    [2, 25],
    [3, 13],
    [3, 14],
    [3, 21],
    [3, 22],
    [3, 35],
    [3, 36],
    [4, 12],
    [4, 16],
    [4, 21],
    [4, 22],
    [4, 35],
    [4, 36],
    [5, 1],
    [5, 2],
    [5, 11],
    [5, 17],
    [5, 21],
    [5, 22],
    [6, 1],
    [6, 2],
    [6, 11],
    [6, 15],
    [6, 17],
    [6, 18],
    [6, 23],
    [6, 25],
    [7, 11],
    [7, 17],
    [7, 25],
    [8, 12],
    [8, 16],
    [9, 13],
    [9, 14]
  )

  return <Component game={game} gliderGunGame={gliderGunGame} />
}

Container.displayName = 'GameOfLife'

export default Container
