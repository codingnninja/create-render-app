import { $state } from '../utils/stateAndUtilSetup';
export const Shuffle = (status = false) => {
  const state = $state();
  state.update('shuffle', status);

  return `
    <div id="shuffle">
      <button class="btn-icon toggle">
        <span 
          class="material-symbols-rounded ${status ? 'active' : ''}"
          onclick="$render(Shuffle, ${!status})"
        >shuffle</span>
      </button>
    </div>
  `;
};
