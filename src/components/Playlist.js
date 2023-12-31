import {Songs} from './Songs';
import { $register, stringify } from '@codingnninja/render';
import { songs } from '../playlist';

export const Playlist = () => {
    return `
        <div class="playlist" id="playlist">
            <Songs mySongs=${stringify(songs)}/>
        </div>
    `;
}

$register(Songs);

