import {
  SET_PLAYING_STATUS,
  SET_SHOW_PLAYER,
  SET_PLAY_LIST,
  SET_CURRENT_SONG,
  SET_CURRENT_INDEX,
  SET_CHANGE_INDEX,
  SET_REMOVE_SONG,
  SET_PLAY_MODE
} from './mutation-types'

import { mode } from './mode-type'
export default {
  [SET_SHOW_PLAYER](state, payload) {
    state.showPlayer = payload
  },
  [SET_PLAYING_STATUS](state, payload) {
    state.isPlaying = payload
  },
  [SET_PLAY_LIST](state, payload) {
    state.songlist = payload
  },
  [SET_CURRENT_SONG](state, payload) {
    state.currentPlaying = payload
  },
  [SET_CURRENT_INDEX](state, payload) {
    state.currentIndex = payload
  },
  [SET_CHANGE_INDEX](state, payload) {
    state.currentIndex = payload
  },
  [SET_REMOVE_SONG](state, payload) {
    typeof payload === 'number'
      ? state.songlist.splice(payload, 1)
      : state.songlist.splice(0, state.songlist.length)
  },
  [SET_PLAY_MODE](state, payload) {
    state.playMode = mode[payload]
  }
}
