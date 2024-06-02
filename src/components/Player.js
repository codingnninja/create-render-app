import { CurrentSong } from './CurrentSong';
import { $register } from '@codingnninja/render';

export const Player = ({ songs }) => {
  return `
    <div class="player" id="player">
      <CurrentSong song={songs[0]} />
    </div>
  `;
};

$register(CurrentSong);
