import { useState, useRef, useCallback, useEffect } from 'react';

import useInterval from '../../hooks/useInterval';

import Cell from '../Cell/Cell';
import { random, clear } from '../BoardSetter';

import './Grid.css';

const Grid = () => {
  const [cols, setCols] = useState(0);
  const [rows, setRows] = useState(0);
  // the initial 0 doesn't matter as the num of cols and rows is calculated on loading.
  const [grid, setGrid] = useState([]);
  const [running, setRunning] = useState(false);
  const [dragged, setDragged] = useState(false);
  const [genCount, setGenCount] = useState(0);

  const runningRef = useRef(running);
  runningRef.current = running;

  const updateBoardDimensions = () => {
    setCols(Math.floor((window.innerWidth * 0.85) / 20));
    setRows(Math.floor((window.innerHeight * 0.65) / 20));
  };

  useEffect(() => {
    updateBoardDimensions();
    window.addEventListener('resize', updateBoardDimensions, false);
  }, []);
  // calculates the boardsize on load.

  useEffect(() => setGrid(random(rows, cols)), [cols, rows]);
  // if someone resizes mid-simluation, the simulation resets.

  const simulate = useCallback((grid) => {
    if (!runningRef.current) {
      return;
    }

    const checkPositions = [
      [0, 1],
      [0, -1],
      [1, -1],
      [-1, 1],
      [1, 1],
      [-1, -1],
      [1, 0],
      [-1, 0],
    ]; // the cordinates of the neighbors of [i][j]

    let numRows = grid.length;
    let numCols = grid[0].length;

    let gridClone = JSON.parse(JSON.stringify(grid));
    // this combo is used to clone an object.
    // it is cloned so that the checking is done for the entire board, and then changes are reflected rather than reflecting it line by line, which is wrong.

    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        let neighbors = 0;

        checkPositions.forEach(([x, y]) => {
          const newI = i + x;
          const newJ = j + y;

          if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
            neighbors += grid[newI][newJ];
          }
        }); //counts the neighbors.

        //Conway's Rules***********
        if (neighbors < 2 || neighbors > 3) gridClone[i][j] = 0;
        // underpopulation and overpopulation is death.
        else if (grid[i][j] === 0 && neighbors === 3) gridClone[i][j] = 1;
        // 3 neighbours is life.
      }
    }

    setGrid(gridClone);

    setGenCount((prevState) => prevState + 1);
    // counts the number of generations passed.
  }, []);

  const handleCellClick = (i, j) => {
    let newGrid = JSON.parse(JSON.stringify(grid));
    // cloned grid for the same reason as above.

    newGrid[i][j] = grid[i][j] ? 0 : 1;
    setGrid(newGrid);
  };

  useInterval(() => {
    simulate(grid);
  }, 100); // the speed of the simulation can be changed here.******

  return (
    <>
      <div
        onMouseDown={(e) => setDragged(true)}
        onMouseUp={(e) => setDragged(false)}
        onMouseLeave={(e) => setDragged(false)}
        className='board'
        style={{
          gridTemplateColumns: `repeat(${cols}, 20px)`,
        }}
        // this style(CSS) is written like this because the cols are recalculated for each screensize.
      >
        {grid.map((rows, i) =>
          rows.map((col, j) => (
            <Cell
              key={`${i}-${j}`}
              // it needs a unique key, the position of the cells is always distinct, hence unique, hence used.
              {...{
                i,
                j,
                isAlive: grid[i][j],
                dragged,
                handleCellClick,
              }}
            />
          ))
        )}
      </div>

      {genCount > 0 && (
        <div>
          Generation: <span className='genCount'>{`${genCount}`}</span>
        </div>
      )}

      <div
        className='btonSpace'
        style={{ paddingTop: `${genCount ? '2.2vh' : '5vh'}` }}
        // this style(CSS) is written because of dynamic content.
      >
        <div className='bton' onClick={() => setRunning(!running)}>
          {running ? 'Stop' : 'Start'}
        </div>

        <div
          className='bton'
          onClick={() => {
            setGrid(clear(rows, cols));
            setRunning(false);
            setGenCount(0);
          }}
        >
          Clear
        </div>

        <div
          className='bton'
          onClick={() => {
            setGrid(random(rows, cols));
            setRunning(false);
            setGenCount(0);
          }}
        >
          Random
        </div>
      </div>
    </>
  );
};

export default Grid;
