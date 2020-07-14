import { request } from './request';

export function getBanner() {
  return request({
    url: '/dj/banner'
  });
}

// 首页显示 --> 点击可以进入该分类
export function getRecommendRadio() {
  return request({
    url: '/dj/category/recommend'
  });
}

// 分支 1
// 在主页获取 /dj/catlist 保存分类, 前 6 个是热门分类, 后为更多分类
export function getCategory() {
  return request({
    url: '/dj/catelist'
  });
}

// 分类页点击后 返回该类的热门电台
export function getHotRadioByCat(cateId, offset = 0) {
  return request({
    url: '/dj/radio/hot',
    params: {
      cateId,
      offset
    }
  });
}

// 分支 2
// 电台排行 --> 节目榜
export function getProgramToplist() {
  return request({
    url: '/dj/program/toplist'
  });
}

// 24小时节目榜
export function getDailyToplist() {
  return request({
    url: '/dj/program/toplist/hours'
  });
}

// 电台排行 --> 电台榜
export function getRadioToplist() {
  return request({
    url: '/dj/toplist?type=hot'
  });
}

// 电台详情页
// 获取 name, subCount, programCount, desc
// dj.avatarUrl, dj.nickName
// commentDatas (userProfile.avatarUrl, userProfile.nickname, content, programName)
export function getRadioDetail(rid) {
  return request({
    url: '/dj/detail',
    params: {
      rid
    }
  });
}

// 获取电台的节目列表
// 获取 id, 通过 id 调用 getTracks 来播放
// duration, createTime, listenerCount
export function getProgramList(rid, limit = 200) {
  return request({
    url: '/dj/program',
    params: {
      rid,
      limit
    }
  });
}
