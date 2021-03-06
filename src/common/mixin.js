import { mapActions, mapGetters } from 'vuex';
import { mode } from 'store/mode-type';

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
    round: function(val, roundTo = 0) {
      if (!val) {
        return '0';
      } else if (val >= 100000000) {
        return (val / 100000000).toFixed(roundTo) + '亿';
      } else if (val >= 10000) {
        return (val / 10000).toFixed(roundTo) + '万';
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

export const getUrlMixin = {
  computed: {
    fmtUrl: function() {
      return function(url) {
        let temp;
        if (url) {
          temp = url.replace(/^https?:/, '');
        }
        return temp;
      };
    }
  }
};

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

import Loading from 'components/common/Loading/Loading';

export const loadingMixin = {
  data() {
    return {
      loading: true
    };
  },
  components: { Loading }
};

export const playSongMixin = {
  methods: {
    ...mapActions(['setIsLoading', 'setPlayList', 'setCurrentIndex', 'setShowPlayer']),
    playSong(list, index) {
      index instanceof Event ? (index = 0) : index;
      if (!this.isLoading) {
        this.setIsLoading(true);
      }
      this.setPlayList(list);
      this.setCurrentIndex(index || 0);
      this.setShowPlayer(true);
    }
  },
  computed: {
    ...mapGetters(['isLoading'])
  }
};

export const selectionMixin = {
  data() {
    return {
      checkedList: []
    };
  },
  methods: {
    check(id) {
      let i = this.checkedList.indexOf(id);
      i === -1 ? this.checkedList.push(id) : this.checkedList.splice(i, 1);
    },
    checkAll(list) {
      this.checkedList = [];
      console.log(list);
      list.map(item => {
        this.checkedList.push(item.id);
      });
    },
    unCheckAll() {
      this.checkedList = [];
    }
  },
  watch: {
    checkedList: {
      handler(val) {
        val.length ? this.$emit('isChecked', true) : this.$emit('isChecked', false);
      }
    }
  }
};
