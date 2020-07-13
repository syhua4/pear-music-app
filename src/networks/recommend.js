import { request } from './request';

export function getBanners(type) {
  return request({
    url: '/banner',
    params: {
      type
    }
  });
}
export function getPlaylists(cat, limit = 30, offset = 0) {
  return request({
    url: '/top/playlist',
    params: {
      cat: decodeURIComponent(cat),
      limit,
      offset
    }
  });
}

export function getPlaylistTrackId(id) {
  return request({
    url: '/playlist/detail',
    params: {
      id
    }
  });
}

export function getTrack(ids) {
  return request({
    url: '/song/detail',
    params: {
      ids
    }
  });
}

export function getSongUrl(id) {
  return request({
    url: '/song/url',
    params: {
      id
    }
  });
}

export function getDailySong(cookie) {
  return request({
    url: `/recommend/songs?timestamps=${Date.now()}`,
    method: 'post',
    params: {
      cookie
    }
  });
}

export function getPlaylistCategory() {
  return request({
    url: '/playlist/catlist'
  });
}

export function getToplist() {
  return request({
    url: '/toplist/detail'
  });
}
