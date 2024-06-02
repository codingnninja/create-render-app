export const Overlay = ({ toggle }) => {
  return `
    <div class="overlay" onclick="$trigger(${toggle})">
      <span class="close">x</span>
    </div>
  `;
};
