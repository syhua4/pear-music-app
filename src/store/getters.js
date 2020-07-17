export default {
  cookie(state) {
    return state.cookie;
  },

  currentIndex(state) {
    return state.currentIndex;
  },

  currentPlaying(state) {
    if (!state.isLoading) {
      if (state.songlist && state.playMode !== 'random') {
        return state.songlist[state.currentIndex];
      } else if (state.playMode === 'random' && state.shuffledList) {
        console.log('----- shuffle song -----');
        return state.shuffledList[state.currentIndex];
      }
    }
  },

  favouriteList(state) {
    return state.favouriteList;
  },

  isLoading(state) {
    return state.isLoading;
  },

  isLogin(state) {
    return state.isLogin;
  },

  isPlaying(state) {
    return state.isPlaying;
  },

  playMode(state) {
    return state.playMode;
  },

  showPlayer(state) {
    return state.showPlayer;
  },

  shuffledList(state) {
    return state.shuffledList;
  },

  songlist(state) {
    return state.songlist;
  },

  profile(state) {
    return state.profile;
  }
};
