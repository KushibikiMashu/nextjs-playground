import * as R from 'ramda'

// 1 で alive、0で dead を表す
type Alive = 1
type Dead = 0
export type Cell = Alive | Dead
export type Board = Cell[][]

export default class GameOfLife {
  private board: Board
  private initialBoard: Board

  constructor(private cols: number, private rows: number) {
    this.board = this.setSize()
  }

  get getBoard(): Board {
    return this.board
  }

  reset = () => {
    this.board = this.initialBoard
  }

  setCellsAlive = (...args: [number, number][]) => {
    const newBoard = R.clone(this.board)
    args.map((arg) => {
      const [col, row] = arg
      newBoard[col][row] = 1
    })

    this.board = newBoard
    this.initialBoard = newBoard
  }

  next = () => {
    const prevBoard = R.clone(this.board)
    // ボードを初期化
    const nextBoard = this.setSize()

    for (const col of R.range(0, this.cols)) {
      for (const row of R.range(0, this.rows)) {
        const isAlive = prevBoard[col][row] === 1
        const count = this.countAlive(col, row)

        if (isAlive && (count === 2 || count === 3)) {
          nextBoard[col][row] = 1
        } else if (!isAlive && count === 3) {
          nextBoard[col][row] = 1
        }
      }
    }

    this.board = nextBoard
  }

  countAlive = (col: number, row: number) => {
    const max = Math.max
    const min = Math.min

    const verticals = R.range(max(0, col - 1), min(this.cols, col + 2))
    const horizontals = R.range(max(0, row - 1), min(this.rows, row + 2))

    let count = 0
    for (const v of verticals) {
      for (const h of horizontals) {
        if (col === v && row === h) {
          continue
        }
        if (this.board[v][h] === 1) {
          count += 1
        }
      }
    }

    return count
  }

  private setSize = (): Board => {
    const cols = R.repeat([], this.rows)
    return cols.map(() => R.repeat(0, this.cols))
  }
}
