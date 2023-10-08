import {APIs} from './apis';
export function htmx(baseUrl, headers){
  if(typeof baseUrl !== 'string' && isObject(headers)) {
    throw('baseUrl must be a string and headers an object');
  }
  const __baseUrl = baseUrl || 'https://youtoocancode.com';
  const __headers = headers || {
    'Content-Type': 'text/html'};

  const apis = APIs(__baseUrl, __headers);

  async function view(route, data) {
    if(typeof baseUrl !== 'string') {
      throw('baseUrl must be a string');
    }
    const response = !data ? await apis.get(route) : await apis.post(url, payload=data);

    if(typeof response !== 'string'){
      throw('A string of html is expected');
    }
    $render(response => response); 
  }

  return {
    view
  };
}

function isObject(value){
  return (
    typeof value === "object" && value !== null && !Array.isArray(value)
  );
};