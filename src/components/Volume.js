import { $state } from '../utils/stateAndUtilSetup';
export const Volume = ({ song }) => {
  const changeVolume = function (elements) {
    const [audio, volume, volumeIcon] = elements;
    audio.volume = volume.value;
    $state().volume = volume.value;

    if (audio.volume <= 0.1) {
      volumeIcon.textContent = 'volume_mute';
    } else if (audio.volume <= 0.5) {
      volumeIcon.textContent = 'volume_down';
    } else {
      volumeIcon.textContent = 'volume_up';
    }
  };

  const volume = $state().volume ? $state().volume : 1;
  return `
      <div class="volume" id="volume">
        <button class="btn-icon volume-btn">
          <span class="material-symbols-rounded" id="volume-icon">volume_up</span>
        </button>
  
        <div class="range-wrapper">
          <input
            type="range"
            step="0.05"
            max="1"
            value="${volume}"
            class="range"
            id="volume-${song.id}"
            onchange="$trigger(${changeVolume}, '#audio-${song.id}, #volume-${song.id}, #volume-icon')"
          />
          <div class="range-fill"></div>
        </div>
      </div>
    `;
};
