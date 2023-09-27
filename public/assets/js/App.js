import {Player} from './components/Player.js';
import {Playlist} from './components/Playlist.js';
import {Overlay} from './components/Overlay.js';

export const App = () => {
    return `
        <div id="app">
        <Player />
        <Playlist />
        <Overlay />
        </div>
    `;
}

$register(Player, Playlist, Overlay)