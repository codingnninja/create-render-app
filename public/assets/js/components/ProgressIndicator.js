const ProgressIndicator = () => {
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