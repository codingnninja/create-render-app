import {Player} from './components/Player';
import {Playlist} from './components/Playlist';
import {Overlay} from './components/Overlay';
import {$register} from '@codingnninja/render';
import { setState, setUtils } from './utils/state';
import { utils } from './utils';
import {songs} from './playlist';

let state = {
  songs,
  shuffle: false,
  repeat: false,
  selected: false,
  volume: 0,
  playingInterval: null,
}

setUtils(utils);
setState(state);
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

$register(Player, Playlist, Overlay);
$render(App);