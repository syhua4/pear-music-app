import { request } from './request';
export function signIn(email, password) {
  return request({
    method: 'post',
    url: `/login?timestamps=${Date.now()}`,
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
