import { request } from './request';

export function getArtist(id) {
  return request({
    url: '/artists/',
    params: {
      id
    }
  });
}

export function getArtistList(type = -1, area = -1, offset = 0) {
  return request({
    url: '/artist/list',
    params: {
      type,
      area,
      offset
    }
  });
}

export function getArtistTopSong(id) {
  return request({
    url: '/artist/top/song',
    params: { id }
  });
}

export function getArtistInfo(id) {
  return request({
    url: '/artist/desc',
    params: { id }
  });
}
export function getArtistAlbum(id, limit = 20) {
  return request({
    url: '/artist/album',
    params: { id, limit }
  });
}
