const Repeat = () => {
  return `
    <button class="btn-icon toggle" data-repeat>
      <span class="material-symbols-rounded default-icon">repeat</span>
      <span class="material-symbols-rounded active-icon">repeat_one</span>
    </button>
  `;
}
const Previous = () => {
  return `
    <button class="btn-icon" data-skip-prev>
      <span class="material-symbols-rounded">skip_previous</span>
    </button>
  `;
}
const Play = () => {
  return `
    <button class="btn-icon play" data-play-btn>
      <span class="material-symbols-rounded default-icon">play_arrow</span>
      <span class="material-symbols-rounded active-icon">pause</span>
    </button>
  `;
}
const Next = () => {
  return `
    <button class="btn-icon" data-skip-next>
      <span class="material-symbols-rounded">skip_next</span>
    </button>
  `;
}
const shuffle = () => {
  return `
    <button class="btn-icon toggle" data-shuffle>
      <span class="material-symbols-rounded">shuffle</span>
    </button>
  `;
}
const Controller = () => {
    return `
      <div class="player-control wrapper">
        <Repeat />
        <Previous />
        <Play />
        <Next />
        <shuffle />                 
      </div>
    `;
  }

  export {
    Repeat,
    Play,
    Next,
    Previous,
    shuffle,
    Controller
  }