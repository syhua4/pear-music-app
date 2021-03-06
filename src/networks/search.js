import { request } from './request';

export function getKeywords() {
  return request({
    url: '/search/hot/detail'
  });
}

export function getSuggest(keywords) {
  return request({
    url: '/search/suggest?type=mobile',
    params: {
      keywords
    }
  });
}

export function getSearchResult(keywords, type, offset = 0) {
  return request({
    url: '/search',
    params: {
      keywords,
      type,
      offset
    }
  });
}
