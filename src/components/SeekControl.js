import { ProgressIndicator } from './ProgressIndicator';
import { Volume } from './Volume';
import { $register, stringify } from '@codingnninja/render';

export const SeekControl = ({ song }) => {
  return `
      <div class="seek-control">
        <ProgressIndicator song="${stringify(song)}" />
        <Volume song="${stringify(song)} "/>
      </div>
    `;
};

$register(ProgressIndicator, Volume);
