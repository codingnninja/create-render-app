
export const Songs = (songs) => {
    return songs.map((song, index) => {
      return `
        <div class="music-list">
          <Audio song=${stringify(song)} key=${index} />
        </div>`;
    });
  }