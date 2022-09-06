export function saveToken(val: string) {
  localStorage.setItem('vitis-token', val);
}

export function getToken() {
  return localStorage.getItem('vitis-token') || '';
}
