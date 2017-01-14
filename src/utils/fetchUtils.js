export function fetchGet(path, options = {}) {
  return fetch(path, {
    headers: {
      Accept: 'application/json',
    },
    method: 'GET'
  })
    .then(resp => resp.json())
    .then((data) => {
      if (data.resultCode !== undefined && data.resultCode !== 'OK') {
        throw data;
      }
      return data.data;
    });
}

export function fetchPost(path, body, options = {}) {
  return fetch(path, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body,
  })
    .then(resp => resp.json())
    .then((data) => {
      if (data.resultCode !== undefined && data.resultCode !== 'OK') {
        throw data;
      }
      return data.data;
    });
}