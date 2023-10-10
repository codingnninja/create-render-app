export function APIs(baseUrl, headers){
  const __baseUrl = baseUrl || 'https://youtoocancode.com';
  const __headers = headers || {
    'Content-Type': 'application/json'};

  async function makeRequest(url, method, data) {
    const requestOptions = {
      method,
      __headers,
      body: JSON.stringify(data),
    };
  
    try {
      const response = !data ? await fetch(url) : await fetch(url, requestOptions);
  
      if (!response.ok) {
        const error = await response.json();
        return error;
      }
  
      return response;
    } catch (error) {
      return error;
    }
  }

  async function get(route) {
    const url = `${__baseUrl}/${route}`;
    const response = await makeRequest(url, 'GET');
    return response.json();
  }

  async function post(route, data) {
    const url = `${__baseUrl}/${route}`;
    const response = await makeRequest(url, 'POST', payload=data);
    return response.json();
  }

  async function getComponent(route) {
    const url = `${__baseUrl}/${route}`;
    const response = await makeRequest(url, 'GET');
    return response;
  }

  async function updateComponent(route, data) {
    const url = `${__baseUrl}/${route}`;
    const response = await makeRequest(url, 'POST', payload=data);
    return response;
  }

  function put(route, data) {
    const url = `${__baseUrl}/${route}`;
    const response = makeRequest(url, 'PUT', payload=data);
    return response.json();
  }

  function del(route, id) {
    const url = `${__baseUrl}/${route}/${id}`;
    const response = makeRequest(url, 'DELETE');
    return response.json();
  }

  return {
    get,
    post,
    put,
    del,
    getComponent,
    updateComponent
  }
}
  