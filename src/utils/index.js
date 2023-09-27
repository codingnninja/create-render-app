import { $render } from "../../render";

export const debounce = (func, timeout=300) => {
  let timer;
  return (...args) => {
    clearTimeout(timeout);
    const deferred = () => {
      timer = null;
      func(...args);
    };
    timer && clearTimeout(timer);
    timer = setTimeout(deferred, timeout);
  }
}
export const getTimecode = function (duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.ceil(duration - (minutes * 60));
  const timecode = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  return timecode;
}
export const seek = (elements) => {
  const [audio, runningTime, seekRange, rangFill] = elements;
  audio.currentTime = seekRange.value;
  runningTime.textContent = $utils.getTimecode(seekRange.value);

  const rangeValue = (seekRange.value / seekRange.max) * 100;
  rangFill.style.width = `${rangeValue}%`;
}

export const updateRunningTime = (song) => {
  const [playingAudio, playerSeekRange, playerRunningTime] = $select( `#audio-${song.id}, #running-time, #seek-${song.id}`);
  playerSeekRange.value = playingAudio.currentTime;
  playerRunningTime.textContent = $utils.getTimecode(playingAudio.currentTime);
}

export const updateDuration = (elements) => {
  const [audio, playerSeekRange, playerDuration] = elements;
  playerSeekRange.max = Math.ceil(audio.duration);
  playerDuration.textContent = $utils.getTimecode(Number(playerSeekRange.max));
}

export const getRandomSong = () => $state.songs[Math.floor(Math.random() * $state.songs.length)];
export const playSelectedSong = (index) => {
  $state.selected = true;
  $utils.getSong(index);
}
export const getSong = (index) => {
  let song;
  if($state.shuffle && $state.selected === false){
    song = getRandomSong();
    $render(CurrentSong, song);
  } else if(!$state.songs[index]){
    song = $state.songs[0];
    $render(CurrentSong, song);
  } else {
    song = $state.songs[index];
    $render(CurrentSong, song);
  }
  $render(Play, song);
}

export const autopilotMode = (audio) => {
  const [nextBtn] = $select("#next>button>span");
  if($state.repeat) {
    audio.currentTime = 0;
    audio.play(); 
    return; 
  }
  nextBtn.click();
}
export const setPlayingState = (song) => {
  return $state.songs.map(mySong => {
    if(mySong.id === song.id){
      mySong.isPlaying = true;
    } else {
      mySong.isPlaying = false;
    }
    return mySong;
  });
}

export const utils = {
  updateRunningTime,
  setPlayingState,
  autopilotMode,
  getTimecode,
  getSong
}

