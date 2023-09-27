const Header = () => {
    return `
      <!--TOP APP BAR-->
      <div class="top-bar wrapper">
        <!--Crunchyroll navbar-->
        <div class="logo wrapper">
          <span class="material-symbols-rounded">play_circle</span>
          <h1 class="title-lg">renderPlay</h1>
        </div>
        <!--Que music list-->
        <div class="top-bar-actions">
          <button class="btn-icon" data-playlist-toggler>
            <span class="material-symbols-rounded">filter_list</span>
          </button>
        </div>
      </div>
    `;
  }