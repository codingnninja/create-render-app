import { SeekControl } from './SeekControl';
import { Controllers } from './Controllers';
import { $register, stringify } from '@codingnninja/render';

export const CurrentSongInformation = ({ song }) => {
  return `
      <audio src="${song.musicPath}" id="audio-${song.id}" data-id="${song.id}" onEnded="$utils().autopilotMode(this, '${stringify(song)}')" onloadeddata="const showLoadedData = () => {
        if(document.readyState === 'complete'){
          
        } else {
          document.addEventListener('DOMContentLoaded', () => {
            $trigger($utils().updateDuration, '#audio-${song.id},#seek-${song.id}, #seek-right-${song.id}, #duration')
          })
        }
      }; showLoadedData()"></audio>
      <figure class="music-banner">
        <img
          src="${song.posterUrl}"
          width="800"
          height="800"
          alt="Wotakoi: Love is Hard for an Otaku Album Poster"
          class="img-cover"
        />
      </figure>
  
      <div class="music-content">
        <h2 class="headline-sm">
          ${song.title}
        </h2>
    
        <p class="label-lg label-wrapper wrapper">
          <span>${song.album}</span>
          <span>${song.year}</span>
        </p>
    
        <p class="label-md artist">${song.artist}</p>
        <SeekControl song=${stringify(song)} />
        <Controllers song=${stringify(song)} />
      </div>
    `;
};
$register(SeekControl, Controllers);
