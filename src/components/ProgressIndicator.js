import { seek } from "../utils/appUtils";

export const ProgressIndicator = (song) => {
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
            id="seek-${song.id}"
            oninput="$trigger(${seek}, '#audio-${song.id},#running-time, #seek-${song.id}, #range-fill')"
          />
  
          <div class="range-fill" id="range-fill"></div>
        </div>
  
        <div class="duration-label wrapper">
          <span class="label-md" id="running-time">0:00</span>
          <span class="label-md" id="duration">1:00</span>
        </div>
      </div>
    `;
  }