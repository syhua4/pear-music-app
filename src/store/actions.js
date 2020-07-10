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
  SET_LOGIN
} from './mutation-types';

import { getSongUrl } from 'networks/recommend';
import { signIn } from 'networks/login';

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

  async setFavourite({ commit }, id) {
    await commit(SET_FAVOURITE, id);
    return '已添加到我喜欢的音乐';
  },

  setIsLoading({ commit }, status) {
    commit(SET_LOADING, status);
  },

  setRemoveSong({ commit }, index) {
    commit(SET_REMOVE_SONG, index);
  },

  setPlayMode({ commit }, modeType) {
    commit(SET_PLAY_MODE, modeType);
  },

  setPlayStatus({ commit }, flag) {
    commit(SET_PLAYING_STATUS, flag);
  },

  setShowPlayer({ commit }, flag) {
    commit(SET_SHOW_PLAYER, flag);
  },

  setShuffledList({ commit }, list) {
    commit(SET_SHUFFLED_LIST, list);
  },

  async setLogin({ commit }, loginInfo) {
    let msg, status;
    await signIn(loginInfo.email, loginInfo.password).then(res => {
      if (res.code === 502) {
        msg = res.msg;
        status = false;
      } else if (res.code === 501) {
        msg = '您输入的邮箱未验证';
        status = false;
      } else if (res.code === 200) {
        msg = '登录成功';
        status = true;
      }
    });
    commit(SET_LOGIN, status);
    return msg;
  },
  async setPlayList({ commit }, list) {
    let songUrl;
    await getSongUrl(getIds(list)).then(res => {
      songUrl = res.data;
    });
    let temp = list.map(track => ({
      ...songUrl.find(song => song.id === track.id && song),
      ...track
    }));
    commit(SET_PLAY_LIST, temp);
    commit(SET_LOADING, false);
  },

  async setUnfavourite({ commit }, id) {
    await commit(SET_UNFAVOURITE, id);
    return '已取消喜欢';
  }
};
