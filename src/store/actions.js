import {
  SET_PLAYING_STATUS,
  SET_SHOW_PLAYER,
  SET_PLAY_LIST,
  SET_CURRENT_INDEX,
  SET_REMOVE_SONG
} from './mutation-types'

import { getSongUrl } from 'networks/recommend'

function getIds(list) {
  let ids = list
    .map(track => {
      return track.id
    })
    .join(',')
  return ids
}
export default {
  setShowPlayer({ commit }, flag) {
    commit(SET_SHOW_PLAYER, flag)
  },
  setPlayStatus({ commit }, flag) {
    commit(SET_PLAYING_STATUS, flag)
  },
  async setPlayList({ commit }, list) {
    let songUrl
    await getSongUrl(getIds(list)).then(res => {
      songUrl = res.data
    })
    let temp = list.map(track => ({
      ...songUrl.find(song => song.id === track.id && song),
      ...track
    }))
    commit(SET_PLAY_LIST, temp)
  },
  setCurrentIndex({ commit }, index) {
    commit(SET_CURRENT_INDEX, index)
  },
  setRemoveSong({ commit }, index) {
    commit(SET_REMOVE_SONG, index)
  }
}
