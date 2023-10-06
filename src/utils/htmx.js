// httpWrapper.js

//Todo: still in development
const apiUrl = 'youtoocancode.com'
const headers = {
  'Content-Type': 'application/json',
  // You can add any additional headers here if needed
}
async function makeRequest(url, method, data) {
  const requestOptions = {
    method,
    headers,
    body: JSON.stringify(data),
  };

  const response = await fetch(url, requestOptions);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Network response was not ok.');
  }

  return response.json();
}
  function $view(route, data) {
    const url = `${apiUrl}/${route}`;
    return get(url, payload=data);
  }
  function get(route, data) {
    const url = `${apiUrl}/${route}`;
    return makeRequest(url, 'GET', payload=data);
  }
  function post(route, data) {
    const url = `${apiUrl}/${route}`;
    return makeRequest(url, 'POST', payload=data);
  }
  function put(route, data) {
    const url = `${apiUrl}/${route}`;
    return makeRequest(url, 'PUT', payload=data);
  }
  function del(route, id) {
    const url = `${apiUrl}/${route}/${id}`;
    return makeRequest(url, 'DELETE');
  }

