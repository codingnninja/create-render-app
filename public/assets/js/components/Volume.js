const Volume = () => {
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
          />
  
          <div class="range-fill" data-range-fill></div>
        </div>
      </div>
    `;
  }