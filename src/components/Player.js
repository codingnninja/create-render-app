import {CurrentSong} from './CurrentSong';
import { $register } from '../../render';


export const Player = () => {
    return `
        <div class="player" id="player">
            <CurrentSong />
        </div>
    `;
}

$register(CurrentSong);