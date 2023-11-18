import {APIs} from './apis';
export function htmx(baseUrl, headers){
  if(typeof baseUrl !== 'string' && isObject(headers)) {
    throw('baseUrl must be a string and headers must be an object');
  }
  const __baseUrl = baseUrl || 'https://your-default-domain.com';
  const __headers = headers || {
    'Content-Type': 'text/html'};

  const apis = APIs(__baseUrl, __headers);

  async function $view(route, data) {
    const response = !data ? await apis.get(route) : await apis.post(url, data);
    const htmlString = await response.text();

    if(typeof htmlString !== 'string'){
      throw('A string of html is expected');
    }
    const HtmxView = htmlString => `${htmlString}`;

    $render(HtmxView); 
  }

  return {
    $view
  };
}

function isObject(value){
  return (
    typeof value === "object" && value !== null && !Array.isArray(value)
  );
};