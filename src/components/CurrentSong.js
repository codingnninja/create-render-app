import { CurrentSongInformation } from './CurrentSongInformation';
import { $register, stringify } from '@codingnninja/render';

export const CurrentSong = ({ song }) => {
  return `
    <div class="container" id="playing-song">
      <CurrentSongInformation song=${stringify(song)}/>
    </div>
  `;
};
$register(CurrentSongInformation);
