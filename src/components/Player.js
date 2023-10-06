import {CurrentSong} from './CurrentSong';
import { $register } from '@codingnninja/render';


export const Player = () => {
    return `
        <div class="player" id="player">
            <CurrentSong />
        </div>
    `;
}

$register(CurrentSong);