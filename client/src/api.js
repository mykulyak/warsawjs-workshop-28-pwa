const API_ROOT = 'http://localhost:3000';

export function readProjectList() {
  return global.fetch(`${API_ROOT}/projects`, {
    method: 'GET',
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Request failed');
    }
    return response.json();
  });
}
