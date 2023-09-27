const getSong = (index, elements) => {

    const isShuffled = elements[0] && elements[0].dataset.isshuffled;
    const isRepeated = elements[1] && elements[1].dataset.isrepeated;
  
    if(isShuffled === 'true'){
      const nextSong = songs[Math.floor(Math.random() * songs.length)]
      $render(CurrentSong, nextSong);
      $render(Shuffle, false);
  
    } else if(isRepeated === 'true') {
      const nextSong = songs[index - 1];
      $render(CurrentSong, nextSong);
      $render(Repeat, false);
  
    } else if(!songs[index]){
      return songs[0];
    }
  
    return $render(CurrentSong, songs[index]);
  }



  'use strict'

/**All music information */
const songs = [
  {
    id:1,
    backgroundImage: "./assets/images/poster-1.jpg",
    posterUrl: "./assets/images/poster-1.jpg",
    title: "Wotakoi: Love is Hard for an Otaku",
    album: "Anime",
    year: 2018,
    artist: "Sumika",
    musicPath: "./assets/music/music-1.mp3",
  },
  {
    id:2,
    backgroundImage: "./assets/images/poster-2.jpg",
    posterUrl: "./assets/images/poster-2.jpg",
    title: "AOT: My War",
    album: "Anime",
    year: 2020,
    artist: "Shinsei Kamattechan",
    musicPath: "./assets/music/music-2.mp3",
  },
  {
    id:3,
    backgroundImage: "./assets/images/poster-3.jpg",
    posterUrl: "./assets/images/poster-3.jpg",
    title: "Fukashigi no Karte",
    album: "Anime",
    year: 2018,
    artist: "Hidehiro Kawai",
    musicPath: "./assets/music/music-3.mp3",
  },
  {
    id:4,
    backgroundImage: "./assets/images/poster-4.jpg",
    posterUrl: "./assets/images/poster-4.jpg",
    title: "Shake & Shake",
    album: "Anime",
    year: 2022,
    artist: "Sumika",
    musicPath: "./assets/music/music-4.mp3",
  },
  {
    id:5,
    backgroundImage: "./assets/images/poster-5.jpg",
    posterUrl: "./assets/images/poster-5.jpg",
    title: "Kick Back",
    album: "Anime",
    year: 2022,
    artist: "Kenshi Yonezu",
    musicPath: "./assets/music/music-5.mp3",
  },
  {
    id:6,
    backgroundImage: "./assets/images/poster-6.jpg",
    posterUrl: "./assets/images/poster-6.jpg",
    title: "Mixed Nuts",
    album: "Anime",
    year: 2022,
    artist: "Hige Dandism",
    musicPath: "./assets/music/music-6.mp3",
  },
  {
    id:7,
    backgroundImage: "./assets/images/poster-7.jpg",
    posterUrl: "./assets/images/poster-7.jpg",
    title: "Idol",
    album: "Anime",
    year: 2023,
    artist: "YOASOBI",
    musicPath: "./assets/music/music-7.mp3",
  },
];

const Player = () => {
  return `
      <div class="player" id="player">
        <CurrentSong />
      </div>
  `;
}
const Playlist = () => {
  return `
      <div class="playlist" data-playlist id="playlist">
        <Songs />
      </div>
  `;
}
const Overlay = () => {
  return `
      <div class="overlay" data-playlist-toggler data-overlay></div>
  `;
}
const CurrentSong = (currentSong) => {
  console.log('why', currentSong)
  const song = currentSong ? currentSong : songs[0];

  return `
    <div class="container" id="playing-song">
      <CurrentSongInformation song=${stringify(song)}/>
    </div>
  `;
}

const CurrentSongInformation = (song) => {
  return `
    <audio src=${song.musicPath} id="audio-${song.id}" data-id="${song.id}"></audio>
    <figure class="music-banner">
    <img
      src="${song.posterUrl}"
      width="800"
      height="800"
      alt="Wotakoi: Love is Hard for an Otaku Album Poster"
      class="img-cover"
      data-player-banner
    />
  </figure>

  <div class="music-content">
    <h2 class="headline-sm" data-title>
      ${song.title}
    </h2>

    <p class="label-lg label-wrapper wrapper">
      <span data-album>${song.album}</span>
      <span data-year>${song.year}</span>
    </p>

    <p class="label-md artist" data-artist>${song.artist}</p>
    <SeekControl song=${stringify(song)} />
    <Controller song=${stringify(song)} />
  </div>
  `;
}

const SeekControl = (song) => {
  console.log(song)
  return `
    <div class="seek-control">
      <Volume song=${stringify(song)}/>
      <ProgressIndicator song=${stringify(song)} />
    </div>
  `;
}

const Volume = (song) => {
  return `
    <div class="volume">
      <button class="btn-icon" data-volume-btn>
        <span class="material-symbols-rounded">volume_up</span>
      </button>

      <div class="range-wrapper">
        <input
          type="range"
          step="0.05"
          max="1"
          value="1"
          class="range"
          data-range
          data-volume
          id="audio${song.id}"
        />

        <div class="range-fill" data-range-fill></div>
      </div>
    </div>
  `;
}

const ProgressIndicator = (song) => {
  return `
    <div class="progress-indicator" id="progress-indicator">
      <div class="range-wrapper">
        <input
          type="range"
          step="1"
          max="60"
          value="0"
          class="range"
          data-range
          data-seek
          id="audio${song.id}"
        />

        <div class="range-fill" data-range-fill></div>
      </div>

      <div class="duration-label wrapper">
        <span class="label-md" data-running-time>0:00</span>
        <span class="label-md" data-duration>1:00</span>
      </div>
    </div>
  `;
}
const getSong = (index, elements) => {

  const isShuffled = elements[0] && elements[0].dataset.isshuffled;
  const isRepeated = elements[1] && elements[1].dataset.isrepeated;

  if(isShuffled === 'true'){
    return songs[Math.floor(Math.random() * songs.length)];
  }

  if(!songs[index]){
    return songs[0];
  }

  if(isRepeated === 'true') {
    return songs[index - 1];
  }

  return songs[index];
}
const setToPlaying = (song) => {
  if(!song) {
    return
  }
  song.isPlaying = true;
  $trigger(play, `#audio-${song.id}`, song);
}

const previous = (elements, previousIndex) => {
  const previousSong = getSong(previousIndex, elements);
  $render(CurrentSong, previousSong);
  if(isShuffled){
    $render(
      Shuffle,
      false
    )
  }
  setToPlaying(previousSong);
}

const Previous = (song) => {
  const index = song.id - 1;
  return `
    <button class="btn-icon" data-skip-prev>
      <span class="material-symbols-rounded"
        onclick="$trigger(${previous}, '.isShuffled, .isRepeated', ${index - 1})"
      >skip_previous</span>
    </button>
  `;
}

//play controller
const play = (audio, song) => {
  song.isPlaying = true;
  audio.play();
  $render(Play, song)
}

const pause = (audio, song) => {
  song.isPlaying = false;
  audio.pause();
  $render(Play, song)
}

//play view 
const Play = (song) => {
  return `
    <div id="play">
      <button class="btn-icon play" data-play-btn>
        <span class="material-symbols-rounded default-icon"
          onclick="$trigger(${song.isPlaying ? pause : play}, '#audio-${song.id}', '${stringify(song)}')">
            ${song.isPlaying ? 'pause' : 'play_arrow'}
        </span>
      </button>
    </div>
  `;
}

//next controller
const next = (elements, nextIndex) => {
  const nextSong =  getSong(nextIndex, elements);
  $render(CurrentSong, nextSong);
  if(isShuffled){
    $render(
      Shuffle,
      false
    )
  }
  setToPlaying(nextSong);
}
//next view

const Next = (song) => {
  const index = song.id - 1;
  return `
    <div id="next">
      <button class="btn-icon" data-skip-next>
        <span 
          class="material-symbols-rounded"
          onclick="$trigger(next, '.isShuffled, .isRepeated', ${index + 1})"
        >skip_next</span>
      </button>
    </div>
  `;
}
const Shuffle = (on) => {
  const toggler = on ? false : true;
  return `
    <div id="shuffle">
      <button class="btn-icon toggle" data-shuffle>
        <span 
          class="material-symbols-rounded ${toggler ? 'isShuffled active': ''}"
          onclick="$render(Shuffle, ${toggler})"
          data-isShuffled="${toggler}"
        >shuffle</span>
      </button>
    </div>
  `;
}
const Repeat = (on) => {
  const toggler = on ? false : true;
  return `
    <div id="repeat">
      <button class="btn-icon toggle" data-repeat>
        <span 
          class="material-symbols-rounded default-icon"
          onclick="$render(Repeat, ${toggler})"
          data-isRepeated="${toggler}"
        > ${toggler ? 'repeat_one' : 'repeat'} </span>
      </button>
    </div>
  `;
}
const Controller = (song) => {
    return `
      <div class="player-control wrapper">
        <Repeat song=${stringify(song)} />
        <Previous song=${stringify(song)} />
        <Play song=${stringify(song)} />
        <Next song="false" />
        <Shuffle song="false" />                 
      </div>
    `;
}

const Audio = ({song}) => {
  return `
    <div id="${song.id}">
      <button 
        class="music-item ${song.id === 0 ? 'playing' : ''}" 
        data-playlist-toggler 
        data-audio-id="${song.id}">
        <img src="${song.posterUrl}" width="800" height="800" alt="${song.title} Album Poster"
          class="img-cover">

        <div class="item-icon">
          <span class="material-symbols-rounded">equalizer</span>
        </div>
      </button>
    </div>
  `;
}
const Songs = () => {
  const songList = songs.map((song) =>`<Audio song=${stringify(song)} />`);
  return `
    <div class="music-list" data-music-list id="music-list">
      ${songList}
    </div>`;
}
const App = () => {
  return `
    <div id="main">
      <article>
          <Player />
          <Playlist />
          <Overlay />
      </article>
    </div>
  `;
}

$render(App);

//TODO: update $trigger, add purify to single render prop