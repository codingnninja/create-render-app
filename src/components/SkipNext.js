import { $state } from '../utils/stateAndUtilSetup';
export const Next = ({ song }) => {
  // make sure a component is not calling itself.
  $state().selected = false;
  return `
    <div id="next">
      <button class="btn-icon">
        <span 
          class="material-symbols-rounded"
          onclick="$utils().getSong(${song.id})"
        >skip_next</span>
      </button>
    </div>
  `;
};
