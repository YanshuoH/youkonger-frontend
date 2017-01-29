export function fetchGet(path) {
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

export function fetchPost(path, body) {
  return fetch(path, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    credentials: 'same-origin',
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
