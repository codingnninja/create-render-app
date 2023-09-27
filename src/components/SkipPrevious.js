export const Previous = (song) => {
  const index = song.id - 1;
  return `
    <button class="btn-icon">
      <span class="material-symbols-rounded"
        onclick="$utils.getSong(${index - 1})"
      >skip_previous</span>
    </button>
  `;
};