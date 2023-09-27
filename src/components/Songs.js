import {Audio} from './Audio';
import { $register, stringify } from '../../render';

export const Songs = (mySongs) => {
  const songList = mySongs.map((song) =>`<Audio song=${stringify(song)} />`);
  return `
    <div class="music-list" id="music-list">
      ${songList}
    </div>`;
}

$register(Audio);