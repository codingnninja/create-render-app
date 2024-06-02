'use strict';

import { $render, $select } from '@codingnninja/render';
import { Shuffle } from '../components/Shuffle';
import { $state, $utils, resetState } from '../utils/stateAndUtilSetup';
import { CurrentSong } from '../components/CurrentSong';
import { Play } from '../components/Play';
const debounce = (func, timeout = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timeout);
    const deferred = () => {
      timer = null;
      func(...args);
    };
    timer && clearTimeout(timer);
    timer = setTimeout(deferred, timeout);
  };
};

export const updateDuration = (elements) => {
  const state = $state();
  const [audio, playerSeekRange, endRange, playerDuration] = elements;
  playerSeekRange.max = Math.ceil(audio.duration);
  endRange.max = playerSeekRange.max;
  endRange.value = playerSeekRange.max;
  state.range.end = Number(playerSeekRange.max);
  resetState(state);
  playerDuration.textContent = $utils().getTimecode(Number(playerSeekRange.max));
};

export const toggle = (event) => {
  event && event.preventDefault();
  const [playlist, overlay] = $select('#playlist, .overlay');
  if (playlist.classList.contains('active')) {
    playlist.classList.remove('active');
    overlay.classList.remove('active');
  } else {
    playlist.classList.add('active');
    overlay.classList.add('active');
  }
};
/**
 * memoizes functions
 * @param fn
 * @returns {function}
 */
export function memoize (fn) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache[key]) {
      return cache[key];
    }

    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

export const getTimecode = function (duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.ceil(duration - (minutes * 60));
  const timecode = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  return timecode;
};

export const updateRunningTime = (song) => {
  const [playingAudio, playerSeekRange, playerRunningTime, rangeFill] = $select(`#audio-${song.id}, #seek-${song.id}, #running-time, #range-fill`);

  if (Math.floor(playingAudio.currentTime) >= $state().range.end) {
    if (!$state().repeat) {
      $state().range.end = playingAudio.duration;
    }
    $utils().autopilotMode(playingAudio, song);
  }

  playerSeekRange.value = playingAudio.currentTime;
  playerRunningTime.textContent = $utils().getTimecode(playingAudio.currentTime);
  const rangeValue = (playerSeekRange.value / playerSeekRange.max) * 100;
  rangeFill.style.width = `${rangeValue}%`;
};

export const getRandomSong = () => $state().songs[Math.floor(Math.random() * $state().songs.length)];

export const playSelectedSong = (index) => {
  $state().selected = true;
  $utils().getSong(index);
};

export const getSong = async (index) => {
  let song;
  let completed;
  if ($state().shuffle && $state().selected === false) {
    song = getRandomSong();
    completed = await $render(CurrentSong, { song });
    completed ? $render(Shuffle, true) : null;
  } else if (!$state().songs[index]) {
    song = $state().songs[0];
    completed = await $render(CurrentSong, { song });
  } else {
    song = $state().songs[index];
    completed = await $render(CurrentSong, { song });
  }
  if (completed) {
    const playing = true;
    const trigger = true;
    $render(Play, { song, playing, trigger });
  }
};

const autopilotMode = (audio) => {
  const nextBtn = $select('#next>button>span');
  if ($state().repeat) {
    audio.currentTime = $state().range.start;
    audio.play();
    return true;
  }
  nextBtn.click();
};

export const setPlayingState = (song) => {
  $utils().getSelectedSongsForDownload();
  return $state().songs.map(mySong => {
    if (mySong.id === song.id) {
      mySong.isPlaying = true;
    } else {
      mySong.isPlaying = false;
    }
    return mySong;
  });
};

export const getSelectedSongsForDownload = () => {
  const selectedSongsIDs = $select('.selected-songs');
  const selectedSongs = $state().songs.map((song, index) => {
    if (selectedSongsIDs[index].checked === true) {
      song.isChecked = true;
      return song;
    }
    song.isChecked = false;
    return song;
  });
  return selectedSongs;
};

export const utils = {
  getSelectedSongsForDownload,
  updateRunningTime,
  setPlayingState,
  updateDuration,
  autopilotMode,
  getTimecode,
  getSong,
  toggle
};
