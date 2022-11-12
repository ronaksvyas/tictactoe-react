import React, { useState } from 'react';
import Box from './components/Box';
import './App.css';

function App() {
  let [grid, setGrid] = useState(EMPTY_GRID);
  let [isGameOver, setIsGameOver] = useState(false);
  let [winner, setWinner] = useState(undefined);
  let [currentPlayer, setCurrentPlayer] = useState('X');
  if (winner && isGameOver) {
    // setGrid(EMPTY_GRID);
    // setIsGameOver(true);
    // setWinner(undefined);
    // window.location.reload();
  }

  const onBoxClick = (x, y) => () => {
    if (grid[x][y]) {
      return;
    }
    const newGrid = structuredClone(grid);
    newGrid[x][y] = currentPlayer;
    setGrid(newGrid);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');

    //check row
    for (let i = 0; i < 3; i++) {
      if (
        newGrid[i][0] &&
        newGrid[i][0] === newGrid[i][1] &&
        newGrid[i][1] === newGrid[i][2]
      ) {
        setIsGameOver(true);
        setWinner(newGrid[i][0]);
      }
    }
    //check column
    for (let i = 0; i < 3; i++) {
      if (
        newGrid[0][i] &&
        newGrid[0][i] === newGrid[1][i] &&
        newGrid[1][i] === newGrid[2][i]
      ) {
        setIsGameOver(true);
        setWinner(newGrid[0][i]);
      }
    }
    //check diagonal
    if (
      (newGrid[0][0] &&
        newGrid[0][0] === newGrid[1][1] &&
        newGrid[1][1] === newGrid[2][2]) ||
      (newGrid[0][2] &&
        newGrid[0][2] === newGrid[1][1] &&
        newGrid[1][1] === newGrid[2][0])
    ) {
      setIsGameOver(true);
      setWinner(newGrid[1][1]);
    }

    //check if all newGrids are done
    let isOneCellEmpty = false;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!newGrid[i][j]) {
          isOneCellEmpty = true;
        }
      }
    }

    if (!isOneCellEmpty) {
      setIsGameOver(true);
      setWinner('NO WINNER');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Tic Tac Toe</h2>
        {winner && isGameOver && (
          <h3>
            Game over. Winner is {winner}. <br /><a href="/">START OVER</a>
          </h3>
        )}
        <div>
          {grid.map((row, rowInd) => {
            return (
              <div key={rowInd} className="row">
                {row.map((value, colInd) => {
                  return (
                    <Box
                      x={rowInd}
                      y={colInd}
                      value={value}
                      onBoxClick={onBoxClick(rowInd, colInd)}
                      key={`${rowInd}${colInd}`}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </header>
    </div>
  );
}
const EMPTY_GRID = [
  [undefined, undefined, undefined],
  [undefined, undefined, undefined],
  [undefined, undefined, undefined],
];

export default App;
