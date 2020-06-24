export default {
  isPlaying(state) {
    return state.isPlaying
  },
  currentPlaying(state) {
    if (state.songlist) {
      return state.songlist[state.currentIndex]
    }
  },
  showPlayer(state) {
    return state.showPlayer
  },
  songlist(state) {
    return state.songlist
  },
  currentIndex(state) {
    return state.currentIndex
  },
  playMode(state) {
    return state.playMode
  }
}
