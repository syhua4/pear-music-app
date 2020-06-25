export const getTracksMixin = {
  data() {
    return {
      tracks: []
    };
  },
  methods: {
    getTrackIds(list, num) {
      let tempTrackIds = '';
      if (num !== undefined) {
        list = list.slice(0, num);
      }
      for (const track of list) {
        tempTrackIds += track.id + ',';
      }
      return tempTrackIds.slice(0, -1);
    }
  }
};

export const roundCountMixin = {
  filters: {
    round: function(val) {
      if (!val) {
        return '';
      } else if (val >= 10000000) {
        return Math.ceil(val / 10000000) + '亿';
      } else if (val >= 10000) {
        return Math.ceil(val / 10000) + '万';
      } else {
        return val;
      }
    }
  }
};

export const getArtistsMixin = {
  computed: {
    artists: function() {
      return function(artistList) {
        let temp = '';
        if (artistList.length > 1) {
          artistList.forEach(artist => {
            temp += artist.name + '/';
          });
          return temp.slice(0, -1);
        } else {
          return artistList[0].name;
        }
      };
    }
  }
};

import { mapActions, mapGetters } from 'vuex';
import { mode } from 'store/mode-type';

export const changeModeMixin = {
  methods: {
    ...mapActions(['setPlayMode', 'setCurrentIndex']),
    changeMode() {
      let songId, originalIndex;
      switch (this.playMode) {
        case mode[0]:
          this.setPlayMode(1);
          break;
        case mode[1]:
          this.setPlayMode(2);
          break;
        case mode[2]:
          songId = this.currentPlaying.id;
          originalIndex = this.songlist.findIndex(song => song.id === songId);
          this.setCurrentIndex(originalIndex);
          this.setPlayMode(0);

          break;
      }
    }
  },
  computed: {
    ...mapGetters(['playMode', 'songlist', 'currentPlaying']),
    mode() {
      return `icon-${this.playMode}`;
    }
  }
};
