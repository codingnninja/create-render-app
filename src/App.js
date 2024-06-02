import { Player } from './components/Player';
import { Playlist } from './components/Playlist';
import { Overlay } from './components/Overlay';
import { $register, $select } from '@codingnninja/render';
import { setState, setUtils } from './utils/stateAndUtilSetup';
import { utils } from './utils/appUtils';
import { songs } from './playlist';

const state = {
  played: false,
  songs,
  selected: false,
  repeat: false,
  shuffle: null,
  volume: null,
  range: {
    start: 0,
    end: 300
  },
  playingInterval: null
};

setUtils(utils);
setState(state);

const Header = ({ toggle }) => {
  return `
    <div class="top-bar wrapper">
      <!--navbar-->
      <div class="logo wrapper">
        <h1 class="title-lg">LovePlay</h1>
      </div>
      <!--music list-->
      <div class="top-bar-actions">
        <button class="btn-icon" onclick="$trigger(${toggle})">
          <span class="material-symbols-rounded">filter_list</span>
        </button>
      </div>
    </div>
  `;
};
export const App = ({ songs }) => {
  const toggle = (event) => {
    event && event.preventDefault();
    const [playlist, overlay] = $select('#playlist, .overlay');
    if (playlist.classList.contains('active')) {
      playlist.classList.remove('active');
      overlay.classList.remove('active');
    } else {
      playlist.classList.add('active');
      overlay.classList.add('active');
    }
  };

  return `
    <div id="main">
      <Header toggle="${toggle}" />
        <article>
          <Playlist songs={songs} />
          <Player songs={songs} />
          <Overlay toggle=${toggle} />
        </article>
    </div>
  `;
};

$register(Player, Playlist, Overlay, Header);
// make sure render remove comments from html and js functions;