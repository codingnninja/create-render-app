import { Songs } from './Songs';
import { $register } from '@codingnninja/render';
export const Playlist = ({ songs }) => {
  return `
        <div class="playlist" id="playlist">
            <Songs songs={songs}/>
        </div>
    `;
}

$register(Songs);
