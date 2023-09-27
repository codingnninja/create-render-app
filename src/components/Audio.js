import { playSelectedSong } from "../utils";
export const Audio = (song) => {
    const playOnClick = playSelectedSong;
    return `
      <div id="${song.id}">
        <button 
          class="music-item ${song.isPlaying ? 'playing' : ''}"
          id='playing-${song.id}' 
          onclick="$trigger(${playOnClick}, null, ${song.id - 1})">
            <img src="${song.posterUrl}" width="800" height="800" alt="${song.title} Album Poster"
            class="img-cover">
  
          <div class="item-icon">
            <span class="material-symbols-rounded">equalizer</span>
          </div>
        </button>
      </div>
    `;
  }