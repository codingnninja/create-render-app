import { stringify } from '@codingnninja/render';
export function Defer ({ id, component, song }) {
  const props = { song };

  return `
    <div id="${id}" data-render="defer">loading...
      <iframe src="/" onload="$render(${component}, '${stringify(props)}')" height="0" width="0"></iframe>
    </div>
  `;
}
