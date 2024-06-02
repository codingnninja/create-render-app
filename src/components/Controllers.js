import { Repeat } from './Repeat';
import { Shuffle } from './Shuffle';
import { Next } from './SkipNext';
import { Play } from './Play';
import { Previous } from './SkipPrevious';
import { $register, stringify } from '@codingnninja/render';

export const Controllers = ({ song }) => {
  return `
    <div class="player-control wrapper">
      <Repeat />
      <Previous song="${stringify(song)}" />     
      <Play song="{ song }" />
      <Next song="${stringify(song)}" />
      <Shuffle /> 
    </div>
  `;
};

$register(Repeat, Shuffle, Play, Previous, Next);
