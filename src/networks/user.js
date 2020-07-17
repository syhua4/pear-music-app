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
    url: '/user/detail',
    params: { uid, cookie }
  });
}

export function getPlayerHistory(uid, cookie) {
  return request({
    url: '/user/record',
    params: {
      uid,
      cookie
    }
  });
}

export function share(id, msg, cookie) {
  return request({
    url: '/share/resource',
    params: {
      id,
      msg,
      cookie
    }
  });
}

export function getPlaylist(uid, cookie) {
  return request({
    url: '/user/playlist',
    params: { uid, cookie }
  });
}

export function setFavList(id, like = true, cookie) {
  return request({
    url: '/like',
    params: { id, like, cookie }
  });
}

export function getFM(cookie) {
  return request({
    url: '/personal_fm',
    params: { cookie }
  });
}

export function createPlaylist(name, cookie) {
  return request({
    url: '/playlist/create',
    params: { name, cookie }
  });
}

export function changeSongInPlaylist(op, pid, tracks) {
  return request({
    url: '/playlist/tracks',
    params: {
      op,
      pid,
      tracks
    }
  });
}
