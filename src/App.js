import {Player} from './components/Player';
import {Playlist} from './components/Playlist';
import {Overlay} from './components/Overlay';
import { $register, stringify } from '../render';
import { getState, setState, setUtils } from './utils/state';
import { utils } from './utils';
import {songs} from './playlist';

let state = {
  songs,
  playingSongIndex: 0,
  shuffle: false,
  repeat: false,
  selected: false,
  volume: 0,
  playingInterval: null,
}

setState(state);
setUtils(utils);
export const App = () => {
    return `
      <div id="main">
        <article>
            <Player />
            <Playlist />
            <Overlay />
        </article>
      </div>
    `;
  }

$register(Player, Playlist, Overlay, getState);
$render(App);