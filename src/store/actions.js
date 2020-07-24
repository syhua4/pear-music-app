import {
  SET_PLAYING_STATUS,
  SET_SHOW_PLAYER,
  SET_PLAY_LIST,
  SET_CURRENT_INDEX,
  SET_REMOVE_SONG,
  SET_PLAY_MODE,
  SET_SHUFFLED_LIST,
  SET_LOADING,
  SET_LOGIN,
  SET_COOKIE,
  SET_USER_PROFILE,
  SET_HISTORY_SONG,
  SET_HISTORY_LIST
} from './mutation-types';

import { getSongUrl } from 'networks/recommend';
import { signIn } from 'networks/user';

function getIds(list) {
  let ids = list
    .map(track => {
      return track.id;
    })
    .join(',');
  return ids;
}

export default {
  setCurrentIndex({ commit }, index) {
    commit(SET_CURRENT_INDEX, index);
  },

  setHistoryList({ commit }, list) {
    commit(SET_HISTORY_LIST, list);
  },

  setHistorySong({ commit }, song) {
    commit(SET_HISTORY_SONG, song);
  },

  setIsLoading({ commit }, status) {
    commit(SET_LOADING, status);
  },

  setPlayMode({ commit }, modeType) {
    commit(SET_PLAY_MODE, modeType);
  },

  setPlayStatus({ commit }, flag) {
    commit(SET_PLAYING_STATUS, flag);
  },

  setRemoveSong({ commit }, index) {
    commit(SET_REMOVE_SONG, index);
  },

  setShowPlayer({ commit }, flag) {
    commit(SET_SHOW_PLAYER, flag);
  },

  setShuffledList({ commit }, list) {
    commit(SET_SHUFFLED_LIST, list);
  },

  setUserProfile({ commit }, profile) {
    commit(SET_USER_PROFILE, profile);
  },

  async setLogin({ commit }, loginInfo) {
    let msg, status;
    await signIn(loginInfo.email, loginInfo.password).then(res => {
      console.log(res);
      if (res.code === 502) {
        msg = res.msg;
        status = false;
      } else if (res.code === 501) {
        msg = '您输入的邮箱未验证';
        status = false;
      } else if (res.code === 200) {
        msg = '登录成功';
        commit(SET_COOKIE, res.cookie);
        commit(SET_USER_PROFILE, res.profile);
        status = true;
      }
    });
    commit(SET_LOGIN, status);

    return msg;
  },
  async setPlayList({ commit, state }, list) {
    let songUrl;
    let cookie = state.isLogin ? state.cookie : '';
    await getSongUrl(getIds(list), cookie).then(res => {
      songUrl = res.data;
    });
    let temp = list.map(track => ({
      ...songUrl.find(song => song.id === track.id && song),
      ...track
    }));
    commit(SET_PLAY_LIST, temp);
    commit(SET_LOADING, false);
  }
};
