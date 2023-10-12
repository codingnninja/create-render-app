import {APIs} from './apis';
export function htmx(baseUrl, headers){
  if(typeof baseUrl !== 'string' && isObject(headers)) {
    throw('baseUrl must be a string and headers an object');
  }
  const __baseUrl = baseUrl || 'https://your-default-domain.com';
  const __headers = headers || {
    'Content-Type': 'text/html'};

  const apis = APIs(__baseUrl, __headers);

  async function view(route, data) {
    if(typeof baseUrl !== 'string') {
      throw('baseUrl must be a string');
    }

    const response = !data ? await apis.getComponent(route) : await apis.updateComponent(url, payload=data);
    const htmlString = await response.text();

    if(typeof htmlString !== 'string'){
      throw('A string of html is expected');
    }

    $render(htmlString); 
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