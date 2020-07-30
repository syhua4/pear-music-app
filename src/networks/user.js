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

export function getUserInfo(uid, cookie) {
  return request({
    method: 'post',
    url: '/user/detail',
    params: { uid, cookie }
  });
}

export function share(id, cookie) {
  return request({
    method: 'post',
    url: `/share/resource`,
    params: {
      id,
      cookie
    }
  });
}

export function getPlaylist(uid, cookie) {
  return request({
    method: 'post',
    url: `/user/playlist?timestamps=${Date.now()}`,
    params: { uid, cookie }
  });
}

export function getLikelist(uid, cookie) {
  return request({
    method: 'post',
    url: `/likelist?timestamps=${Date.now()}`,
    params: {
      uid,
      cookie
    }
  });
}

export function setLikelist(id, like = true, cookie) {
  return request({
    method: 'post',
    url: `/like?timestamps=${Date.now()}`,
    params: { id, like, cookie }
  });
}

export function getFM(cookie) {
  return request({
    method: 'post',
    url: '/personal_fm',
    params: { cookie }
  });
}

export function createPlaylist(name, cookie) {
  return request({
    method: 'post',
    url: '/playlist/create',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    params: { name, cookie }
  });
}

export function changeSongInPlaylist(op, pid, tracks, cookie) {
  return request({
    method: 'post',
    url: `/playlist/tracks?timestamps=${Date.now()}`,
    params: {
      op,
      pid,
      tracks,
      cookie
    }
  });
}

export function subscribePlaylist(t, id, cookie) {
  return request({
    method: 'post',
    url: `/playlist/subscribe?timestamps=${Date.now()}`,
    params: {
      t,
      id,
      cookie
    }
  });
}
