import GameOfLife from '../game'

// TODOリスト
// [+] gameをスタートする
// [+] 3 * 3 で、縦一列のマスを作る
// [+] 次は横一列のマスが返る
// [+] 縦一列から、横一列に遷移する
//   [+] 周りの生きているマスをカウントする

test('縦・横のサイズを指定して Game を開始すると、マスが全て0のボードを返す', () => {
  const game = new GameOfLife(3, 3)
  const board = game.getBoard

  expect(board).toEqual([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ])
})

test('Game を開始して横一列のマスを指定すると、指定したマスが1になるボードを返す', () => {
  const game = new GameOfLife(3, 3)
  game.setCellsAlive([1, 0], [1, 1], [1, 2])
  const board = game.getBoard

  expect(board).toEqual([
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ])
})

test('横一列が生きているセルで、特定のセルを指定したとき、そのセルの周囲で生きているセルの数を返す', () => {
  const game = new GameOfLife(3, 3)
  game.setCellsAlive([1, 0], [1, 1], [1, 2])

  const count1 = game.countAlive(0, 0)
  expect(count1).toBe(2)

  const count2 = game.countAlive(1, 0)
  expect(count2).toBe(1)

  const count3 = game.countAlive(1, 1)
  expect(count3).toBe(2)
})

test('生きているセルが横一列のとき、生きているセルが縦一列のボードを返す', () => {
  const game = new GameOfLife(3, 3)
  game.setCellsAlive([1, 0], [1, 1], [1, 2])
  game.next()
  const board = game.getBoard

  expect(board).toEqual([
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ])
})

test('生きているセルが、横一列 → 縦一列 → 横一列の順に遷移する', () => {
  const game = new GameOfLife(3, 3)
  game.setCellsAlive([1, 0], [1, 1], [1, 2])
  const board1 = game.getBoard

  expect(board1).toEqual([
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ])

  game.next()

  const board2 = game.getBoard
  expect(board2).toEqual([
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ])

  game.next()

  const board3 = game.getBoard
  expect(board3).toEqual([
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ])
})

test('初期値のパターン1', () => {
  const game = new GameOfLife(3, 3)
  game.setCellsAlive([0, 0], [0, 1], [1, 0])

  const board1 = game.getBoard
  expect(board1).toEqual([
    [1, 1, 0],
    [1, 0, 0],
    [0, 0, 0],
  ])

  game.next()

  const board2 = game.getBoard
  expect(board2).toEqual([
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 0],
  ])

  game.next()

  const board3 = game.getBoard
  expect(board3).toEqual([
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 0],
  ])
})

test('過密で死ぬパターン', () => {
  const game = new GameOfLife(3, 3)
  game.setCellsAlive([0, 0], [0, 1], [0, 2], [1, 0], [1, 1])

  const board1 = game.getBoard
  expect(board1).toEqual([
    [1, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ])

  game.next()

  const board2 = game.getBoard
  expect(board2).toEqual([
    [1, 0, 1],
    [1, 0, 1],
    [0, 0, 0],
  ])

  game.next()

  const board3 = game.getBoard
  expect(board3).toEqual([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ])
})

test('boardをresetしたとき、最初のboardを返す', () => {
  const game = new GameOfLife(3, 3)
  game.setCellsAlive([1, 0], [1, 1], [1, 2])

  game.next()
  game.next()

  game.reset()

  const board = game.getBoard

  expect(board).toEqual([
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ])
})

test('縦4、横2のボードを返す', () => {
  const game = new GameOfLife(2, 4)
  const board = game.getBoard

  expect(board).toEqual([
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ])
})
