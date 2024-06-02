import { $state, $utils } from '../utils/stateAndUtilSetup';

export const ProgressIndicator = ({ song }) => {
  const seek = (elements) => {
    const [audio, runningTime, seekRange, rangFill] = elements;
    audio.currentTime = seekRange.value;
    runningTime.textContent = $utils().getTimecode(seekRange.value);

    const rangeValue = (seekRange.value / seekRange.max) * 100;
    rangFill.style.width = `${rangeValue}%`;
  };

  const seekRight = (elements) => {
    const [duration, seekRangeRight, fillRight] = elements;
    const rangeValue = (seekRangeRight.value / seekRangeRight.max) * 100;

    $state().range.end = Number(seekRangeRight.value);
    $state().range.elements = elements;
    duration.textContent = $utils().getTimecode($state().range.end);

    const rangeRightValue = 100 - rangeValue;
    fillRight.style.width = `${rangeRightValue}%`;
  };

  return `
  <div class="progress-indicator" id="progress-indicator">
    <div class="range-wrapper">
      <input
        type="range"
        class="duel-range right-range"
        min="0"
        max="60"
        value="60"
        step="1"
        id="seek-right-${song.id}"
        onchange="$trigger(${seekRight}, '#duration, #seek-right-${song.id}, #fill-right')"
      />
      <input
        type="range"
        step="1"
        max="60"
        value="0"
        class="range"
        id="seek-${song.id}"
        onchange="$trigger(${seek}, '#audio-${song.id},#running-time, #seek-${song.id}, #range-fill')"
      />
      <div class="range-fill" id="range-fill"></div>
      <div class="fill-right" id="fill-right"></div>
    </div>

    <div class="duration-label wrapper">
      <span class="label-md" id="running-time">0:00</span>
      <span class="label-md" id="duration">3:00</span>
    </div>
  </div>
  `;
};
