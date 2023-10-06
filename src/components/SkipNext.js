export const Next = (song) => {
  //make sure a component is not calling itself.
  $state().selected = false;
  const index = song.id - 1;
  return `
    <div id="next">
      <button class="btn-icon">
        <span 
          class="material-symbols-rounded"
          onclick="$use().getSong(${index + 1})"
        >skip_next</span>
      </button>
    </div>
  `;
};