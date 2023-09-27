import {CurrentSongInformation} from './CurrentSongInformation';
import { $register, stringify } from '../../render';
import { songs } from '../playlist';

export const CurrentSong = (currentSong) => {
  const song = currentSong ? currentSong : songs[0];
  return `
    <div class="container" id="playing-song">
      <CurrentSongInformation song=${stringify(song)}/>
    </div>
  `;
}

$register(CurrentSongInformation)