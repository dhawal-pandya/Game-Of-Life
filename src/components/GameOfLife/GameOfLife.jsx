import Grid from '../Grid/Grid';

import './GameOfLife.css';

const GameOfLife = () => {
  return (
    <div className='high'>
      <header className='title'>Game of Life</header>
      <Grid />
      <footer>
        <div>
          {'Made with ❤️ by '}
          <a
            target='_blank'
            href='https://dhawal-pandya.github.io/'
            rel='noreferrer'
          >
            Dhawal Pandya
          </a>
          &nbsp;|&nbsp;
          {/* &nbsp; just gives a space, that's it. */}
          <a
            target='_blank'
            href='https://github.com/dhawal-pandya/Game-Of-Life'
            rel='noreferrer'
          >
            Source
          </a>
          &nbsp;|&nbsp;
          <a
            target='_blank'
            href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'
            rel='noreferrer'
          >
            To learn more...
          </a>
        </div>
      </footer>
    </div>
  );
};

export default GameOfLife;
