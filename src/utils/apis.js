export function APIs(baseUrl, headers){
  const __baseUrl = baseUrl || 'https://your-default-domain.com';
  const __headers = headers || {
    'Content-Type': 'application/json'};

  async function makeRequest(url, data) {
    const __method = data ? 'POST' : 'GET';
    const requestOptions = {
      __method,
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
    const response = await makeRequest(url);
    return response;
  }

  async function post(route, data) {
    const url = `${__baseUrl}/${route}`;
    const response = await makeRequest(url, data);
    return response;
  }

  return {
    get,
    post
  }
}