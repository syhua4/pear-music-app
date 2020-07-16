import { request } from './request';

export function getAlbum(id) {
  return request({
    url: '/album',
    params: { id }
  });
}
