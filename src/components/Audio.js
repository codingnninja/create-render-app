import { $utils, $state } from '../utils/stateAndUtilSetup';

export const Audio = ({ song }) => {
  const songId = song.id;
  const playSelectedSong = (index) => {
    $state().selected = true;
    $utils().getSong(index);
  };

  return `
    <div id="${song.id}">
      <input type="checkbox" name="select-song" id="check-${songId}"     class="selected-songs" ${song.isChecked ? 'checked' : ''}>
      <button 
        class="music-item ${song.isPlaying ? 'playing' : ''}"
        id='playing-${song.id}' 
        onclick="$trigger(${playSelectedSong}, null, ${song.id - 1})">
          <img src="${song.posterUrl}" width="800" height="800" alt="${song.title} Album Poster"
          class="img-cover">
          <div class="item-icon">
            <span class="material-symbols-rounded">equalizer</span>
          </div>
          <div class="song-details">
          <span id="title">${song.title}</span>
            <span id="date">${song.artist} (${song.year})</span>
          </div>
      </button>
    </div>
  `;
};
