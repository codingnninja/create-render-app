const CurrentSong = (song) => {
    return `
      <div class="container" id="playing-song">
        <CurrentSongInformation />
        <SeekControl />
        <Controller />
      </div>
    `;
  }