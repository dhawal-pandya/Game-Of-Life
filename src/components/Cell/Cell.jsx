import './Cell.css';

const colorAlive = '#692DAC';
const colorDead = '#000000';

const Cell = (props) => {
  const { i, j, isAlive, dragged, handleCellClick } = props;
  return (
    <div
      className='cell'
      onClick={(e) => handleCellClick(i, j)}
      onMouseEnter={(e) => dragged && handleCellClick(i, j)}
      style={{
        backgroundColor: isAlive ? colorAlive : colorDead,
      }}
    />
  );
};

export default Cell;
