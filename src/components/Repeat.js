export const Repeat = (status=false) => {
  $state.repeat = status;
  return `
    <div id="repeat">
      <button class="btn-icon toggle">
        <span 
          class="material-symbols-rounded ${status ? 'active' : ''}"
          onclick="$render(Repeat, ${!status})"
        >
        ${status ? 'repeat_one' : 'repeat'}
        </span>
      </button>
    </div>
  `;
}