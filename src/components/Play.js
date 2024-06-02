'use strict';
import { $select, $render } from '@codingnninja/render';
import { $state, $utils } from '../utils/stateAndUtilSetup';
import { Songs } from './Songs';
export const Play = ({ song, playing, trigger }) => {
  const props = { song, trigger: true, playing: !playing };
  function pauseOrPlay (playing) {
    clearInterval($state().playingInterval);
    const audio = $select(`#audio-${song.id}`);

    if (playing) {
      audio.volume = $state().volume ? $state().volume : 1;
      audio.play();
      $render(Songs, { songs: $utils().setPlayingState(song) });
      $state().playingInterval = setInterval(function () { $utils().updateRunningTime(song); }, 500);
    } else {
      const audio = $select(`#audio-${song.id}`);
      audio.pause();
    }
  }
  trigger && pauseOrPlay(playing);

  return `
    <div id="play">
      <button class="btn-icon play ${playing ? 'play-active' : ''}">
        <span class="material-symbols-rounded default-icon"
          onclick="$render(Play, { props })">
            ${playing ? 'pause' : 'play_arrow'}
        </span>
      </button>
    </div>
   `;
};
