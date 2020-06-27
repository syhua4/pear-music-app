import { request } from './request';

export function getBanners(type) {
  return request({
    url: '/banner',
    params: {
      type
    }
  });
}
export function getPlaylists(limit, cat) {
  return request({
    url: '/top/playlist/highquality',
    params: {
      limit,
      cat
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
