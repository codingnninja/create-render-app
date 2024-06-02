function globalizeAccessors () {
  globalThis.$utils = $utils;
  globalThis.$state = $state;
  globalThis.$resetState = resetState;
  globalThis.$getPasswordScope = get;
  return true;
}

export function set (name, value) {
  const passwordScope = { ...value };
  const password = '$123police';

  if (name === '$state') {
    passwordScope.subscribe = subscribe,
    passwordScope.update = update,
    passwordScope.observers = []
  }

  if (globalThis[password] === undefined) {
    globalThis[password] = {};
  }

  if (globalThis[password][name]) {
    throw ('Already exist. To override it, use resetState() or resetUtils');
  }

  globalThis[password][name] = passwordScope;
  globalizeAccessors();
  return value;
}

export function setState (value) {
  return set('$state', value);
}

export function setUtils (value) {
  return set('$utils', value);
}

export function get (name) {
  const password = '$123police';
  if (globalThis[password] === undefined) {
    return {};
  }
  const passwordScope = globalThis[password][name];
  return passwordScope;
}

export function $state () {
  return $getPasswordScope('$state');
}

export function $utils () {
  return $getPasswordScope('$utils');
}

export function resetState (value) {
  const password = '$123police';
  const state = $state();
  const passwordScope = { ...state, ...value };
  globalThis[password].$state = passwordScope;
  return value;
}

function subscribe (components, property) {
  const state = $state();
  if (state.hasOwnProperty(property)) {
    state.observers[property] = [];
  }

  if (Array.isArray(components)) {
    components.map(component => state.observers[property].push(component))
  } else {
    state.observers[property].push(components); // component(s)
  }

  resetState(state);
}

export function update (property, value) {
  const state = $state();
  if (state[property] !== value) {
    state[property] = value;
    resetState(state);
    notifyObservers(property);
  }
  return true;
}

export function notifyObservers (property) {
  const state = $state();
  if (state.observers[property]) {
    state.observers[property].forEach((component) => {
      component(state[property]);
    });
  }
}

export function createContext (parentComponent, value) {
  const component = parentComponent.name;
  const contextName = component.charAt(0).toLowerCase() + component.slice(1);
  const state = $state();
  state[`${contextName}Context`] = value;
  resetState(state);
}

export function useContext (parentComponent) {
  const component = parentComponent.name;
  const contextName = component.charAt(0).toLowerCase() + component.slice(1);
  return $state()[`${contextName}Context`];
}
