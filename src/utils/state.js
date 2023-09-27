//set
function makeSetGlobal(_set, _get){
  if(window['set_$123police']){
    return;
  }
  window.set_$123police = _set;
  window.get_$123police = _get;
  console.log(window);
}
export function set(name, value){  
    makeSetGlobal(set, get);
    const password = '$123police';
    if(window[password] === undefined){
        window[password] = {};
    }    
    if(window[password][name]){
        throw('Already exist. To override it, use resetState() or resetUtils');
    }
    window[password][name] = value;
    window[name] = value;
    return value;
}
export function setState(value) {
    return set('$state', value);
}
export function setUtils(value) {
    return set('$utils', value);
}

function setObserver(Component, property){
  
}
//get
export function get(name){
    const password = '$123police';
    if(window[password] === undefined){
        return {};
    }
    return window[password][name];
}

export function getState(){
    return get('$state');
}
export function $utils(){
    return get('$utils');
}

//reset
export function reset(name, value){
    const password = '$123police';
    const passwordScope = {};
    passwordScope[name] = value;
    window[password] = passwordScope;
    return value;
}

export function resetState(value){
    return reset('state', value);
}

export function resetUtils(value){
    return reset('utils')
}

// State object
const state = {
  data: getState(),
  observers: {},
};
  
function subscribeToState(component, property) {
  if (!state.observers[property]) {
    state.observers[property] = [];
  }

  state.observers[property].push(component);
}
  
  // Function to update a property and notify subscribed components
  function updateProperty(property, value) {
    if (state.data[property] !== value) {
      state.data[property] = value;
      notifyObservers(property);
    }
  }
  
  // Function to notify observers when a property changes
  function notifyObservers(property) {
    if (state.observers[property]) {
      state.observers[property].forEach((component) => {
        component.update(state.data[property]);
      });
    }
  }
  export function useContext(property) {
    return window.$state[property];
  }

  function useCallback(value) {
     if(typeof value != 'function'){return};
     return window.$utils[value.name];
  }
