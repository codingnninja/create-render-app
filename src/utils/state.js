function globalizeAccessors(){
  if(window.$use || window.$state){
    return;
  }
  window.$use = $use;
  window.$state = $state;
  window.$resetState = resetState;
  window.$getPasswordScope = get;
}

export function set(name, value){
    const passwordScope = {...value} 
    const password = '$123police';

    if(name === '$state') {
      passwordScope.subscribe = subscribe,
      passwordScope.update = update,
      passwordScope.observers = []
    }

    if(window[password] === undefined){       
        window[password] = {};
    }

    if(window[password][name]){
        throw('Already exist. To override it, use resetState() or resetUtils');
    }

    window[password][name] = passwordScope;
    globalizeAccessors();
    return value;
}

export function setState(value) {
  return set('$state', value);
}

export function setUtils(value) {
    return set('$use', value);
}

export function get(name){
  const password = '$123police';
  if(window[password] === undefined){
      return {};
  }
  const passwordScope = window[password][name];
  return passwordScope;
}
export function $state(){
  return $getPasswordScope('$state');
}
export function $use(){
  return $getPasswordScope('$use');
}

function resetState(value){
  const password = '$123police';
  const state = $state();
  let passwordScope = {...state, ...value};
  window[password]['$state'] = passwordScope;
  return value;
}

function subscribe(component, property) {
  const state = $state()
  if (state.hasOwnProperty(property)) {
    state.observers[property] = [];
  }
  state.observers[property].push(component);
  $resetState(state);
}
export function update(property, value) {
  const state = $state();
  if (state[property] !== value) {
    state[property] = value;
    $resetState(state);
    notifyObservers(property);
  }
}
export function notifyObservers(property) {
  const state = $state();
  if (state.observers[property]) {
    state.observers[property].forEach((component) => {
      component(state[property]);
    });
  }
}
export function createContext(parentComponent, value){
  const component = parentComponent.name;
  const contextName = component.charAt(0).toLowerCase() + component.slice(1)
  const state = $state();
  state[`${contextName}Context`] = value;
  $resetState(state);
}
export function useContext(parentComponent) {
  const component = parentComponent.name;
  const contextName = component.charAt(0).toLowerCase() + component.slice(1)
  return $state()[`${contextName}Context`] ;
}

