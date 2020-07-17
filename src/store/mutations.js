import {
  SET_PLAYING_STATUS,
  SET_SHOW_PLAYER,
  SET_PLAY_LIST,
  SET_CURRENT_INDEX,
  SET_REMOVE_SONG,
  SET_PLAY_MODE,
  SET_SHUFFLED_LIST,
  SET_LOADING,
  SET_FAVOURITE,
  SET_UNFAVOURITE,
  SET_LOGIN,
  SET_COOKIE,
  SET_USER_PROFILE
} from './mutation-types';

import { mode } from './mode-type';
export default {
  [SET_COOKIE](state, payload) {
    state.cookie = payload;
  },

  [SET_CURRENT_INDEX](state, payload) {
    if (state.songlist && payload === state.songlist.length) {
      payload = 0;
    } else if (payload < 0) {
      payload = state.songlist.length - 1;
    }
    state.currentIndex = payload;
  },

  [SET_FAVOURITE](state, payload) {
    let temp = [...state.favouriteList];
    temp.push(payload);
    state.favouriteList = temp;
  },

  [SET_LOADING](state, payload) {
    state.isLoading = payload;
  },

  [SET_LOGIN](state, payload) {
    state.isLogin = payload;
  },

  [SET_PLAY_LIST](state, payload) {
    state.songlist = payload;
  },

  [SET_PLAY_MODE](state, payload) {
    state.playMode = mode[payload];
  },

  [SET_PLAYING_STATUS](state, payload) {
    state.isPlaying = payload;
  },

  [SET_REMOVE_SONG](state, payload) {
    typeof payload === 'number'
      ? state.songlist.splice(payload, 1)
      : state.songlist.splice(0, state.songlist.length);
  },

  [SET_SHOW_PLAYER](state, payload) {
    state.showPlayer = payload;
  },

  [SET_SHUFFLED_LIST](state, payload) {
    state.shuffledList = payload;
  },

  [SET_USER_PROFILE](state, payload) {
    state.profile['uid'] = payload.userId;
    state.profile['nickname'] = payload.nickname;
    state.profile['avatar'] = payload.avatarUrl;
  },

  [SET_UNFAVOURITE](state, payload) {
    let temp = state.favouriteList.filter(item => item !== payload);
    state.favouriteList = temp;
  }
};
