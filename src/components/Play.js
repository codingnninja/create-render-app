'use strict'

import {stringify} from '@codingnninja/render';

 export const Play = (song) => {
   const [audio] = $select(`#audio-${song.id}`);   
   clearInterval($state().playingInterval)

    if(audio){
      audio.volume = $state().volume ? $state().volume : 1;
      audio.paused ? audio.play() : audio.pause();
      song.isPlaying = audio.paused ? false : true; 
      $render(Songs, $use().setPlayingState(song));
      if(song.isPlaying){
        $state().playingInterval = setInterval(function(){ $use().updateRunningTime(song)}, 900)
      }
    }

    return `
      <div id="play">
        <button class="btn-icon play ${song.isPlaying ? 'play-active': ''}">
          <span class="material-symbols-rounded default-icon"
            onclick="$render(Play, '${stringify(song)}')">
              ${song.isPlaying ? 'pause' : 'play_arrow'}
          </span>
        </button>
      </div>
    `;
  }