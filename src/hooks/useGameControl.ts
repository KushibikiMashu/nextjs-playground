import { useCallback, useEffect, useState } from 'react'
import GameOfLife, { Board } from '~/src/components/GameOfLife/game'

type Args = {
  game: GameOfLife
  duration?: number
  min?: number
  max?: number
}

const useGameControl = ({ duration = 50, min = 50, max = 1000, ...args }: Args) => {
  const [board, update] = useState<Board>(() => args.game.getBoard)
  const [interval, updateInterval] = useState(500)

  useEffect(() => {
    if (interval === 0) {
      return
    }
    const id = setInterval(() => {
      args.game.next()
      const board = args.game.getBoard
      update(board)
    }, interval)

    return () => clearInterval(id)
  }, [interval])

  const handleNextClick = useCallback(() => {
    args.game.next()
    const board = args.game.getBoard
    update(board)
  }, [])
  const handleStopClick = useCallback(() => updateInterval(0), [])
  const handleSlowClick = useCallback(() => updateInterval((state) => Math.min(max, state + duration)), [])
  const handleFastClick = useCallback(() => updateInterval((state) => Math.max(min, state - duration)), [])
  const handleResetClick = useCallback(() => {
    args.game.reset()
    updateInterval(500)
  }, [])

  return {
    board,
    interval,
    onNextClick: handleNextClick,
    onStopClick: handleStopClick,
    onSlowClick: handleSlowClick,
    onFastClick: handleFastClick,
    onResetClick: handleResetClick,
  }
}

export default useGameControl
