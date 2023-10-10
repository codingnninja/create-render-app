import {Player} from './components/Player';
import {Playlist} from './components/Playlist';
import {Overlay} from './components/Overlay';
import {$register} from '@codingnninja/render';
import { setState, setUtils } from './utils/state';
import { utils } from './utils';
import {songs} from './playlist';
import {htmx} from './utils/htmx';

// const view = htmx('https://jsonplaceholder.typicode.com').view;
// let a = view('posts/1');

let state = {
  songs,
  shuffle: false,
  repeat: false,
  selected: false,
  volume: 0,
  playingInterval: null,
}

setUtils(utils);
setState(state);

export const App = () => {
    return `
      <div id="main">
        <article>
            <Player />
            <Playlist />
            <Overlay />
        </article>
      </div>
    `;
  }

$register(Player, Playlist, Overlay);
$render(App);

/* import React from 'react';
function App() {
  const [data, setData] = useState('data');

  return (
    <div>
      <Header> 
        <Nav props={data} />
      </Header>
      <main>
        <Hero props={data} />
        <AdoptionProve props={data} />
        <Testimonials props={data} />
        <HowItWorks props={data} />
        <Features props={data} />
        <SocialProve props={data} />
        <Pricing props={data} />
        <Contacts props={data} />
        <TrustSignals props={data} />
        <Faqs props={data} />
        <IntentPopup props={data} />
      </main>
      <Footer />
    </div>
  )
} */