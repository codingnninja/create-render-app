  
export const Shuffle = (status=false) => {
  $state.shuffle = status;
  return `
    <div id="shuffle">
      <button class="btn-icon toggle">
        <span 
          class="material-symbols-rounded ${status ? 'active': ''}"
          onclick="$render(Shuffle, ${!status})"
        >shuffle</span>
      </button>
    </div>
  `;
}