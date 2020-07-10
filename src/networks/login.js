import { request } from './request';
export function signIn(email, password) {
  return request({
    url: '/login',
    params: {
      email,
      password
    }
  });
}

export function signOut() {
  return request({
    url: '/logout'
  });
}
