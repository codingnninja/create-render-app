export const Audio = ({song, key}) => {
    return `
      <div id="${key}">
        <button 
          class="music-item ${key === 0 ? 'playing' : ''}" 
          data-playlist-toggler 
          data-playlist-item="${key}">
          <img src="${song.posterUrl}" width="800" height="800" alt="${song.title} Album Poster"
            class="img-cover">
  
          <div class="item-icon">
            <span class="material-symbols-rounded">equalizer</span>
          </div>
        </button>
      </div>
    `;
  }