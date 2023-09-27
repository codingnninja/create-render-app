const CurrentSongInformation = (song) => {
    return `
      <figure class="music-banner">
      <img
        src="./assets/images/poster-1.jpg"
        width="800"
        height="800"
        alt="Wotakoi: Love is Hard for an Otaku Album Poster"
        class="img-cover"
        data-player-banner
      />
    </figure>
  
    <div class="music-content">
      <h2 class="headline-sm" data-title>
        Wotakoi: Love is Hard for an Otaku
      </h2>
  
      <p class="label-lg label-wrapper wrapper">
        <span data-album>Sumika</span>
        <span data-year>2018</span>
      </p>
  
      <p class="label-md artist" data-artist>Sumika</p>
    `;
  }
  