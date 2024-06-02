import { Audio } from './Audio';
import { $register, $select } from '@codingnninja/render';

export const Songs = ({ songs }) => {
  const downloadAll = () => {
    const errorMsg = $select('#selection-error');

    if (selectedSongs.length === 0) {
      errorMsg.classList.add('show');
      return;
    } else {
      errorMsg.classList.remove('show');
    }

    let depth = 0;
    while (selectedSongs.length > depth) {
      const selectedSong = selectedSongs[depth];
      if (!selectedSong.isChecked) {
        continue;
      }
      const link = document.createElement('a');
      link.href = selectedSong.musicPath;
      link.download = `${selectedSong.musicPath}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      depth++;
    }
  };

  const songList = songs.map((song) => `<Audio song={song} />`);
  return `
    <div class="music-list" id="music-list">
      <div 
        onclick="$trigger(${downloadAll})"
      >
        <span class="material-symbols-rounded active">download</span> all
      </div>
        <span id="selection-error">No song selected</span>
      ${songList}
    </div>
  `;
};

$register(Audio);
