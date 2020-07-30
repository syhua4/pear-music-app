<template>
  <div class="playlist-list">
    <loading :isShow="loading" v-if="!newList" />
    <span class="add-btn" @click="addSong" v-if="newList">添加歌曲</span>
    <div class="track-wrapper" v-for="(track, index) in item" :key="track.id">
      <song-view>
        <span class="index" slot="left" v-if="!multiSelect">{{ index + 1 }}</span>
        <i
          class="iconfont "
          slot="left"
          v-else
          @click="check(track.id)"
          :class="checkedList.includes(track.id) ? 'icon-select-fill' : 'icon-select-unfill'"
        />

        <div class="track-info" slot="center" @click="trackClick(index)">
          <div class="track-title">{{ track.name }}</div>
          <span class="track-artist">{{ artists(track.ar) }}</span>
          <span class="track-album">{{ track.al.name }}</span>
        </div>
        <i class="iconfont icon-more--line" slot="right" @click.stop="showMore(track)" />
      </song-view>
    </div>
  </div>
</template>

<script>
import { roundCountMixin, getArtistsMixin, loadingMixin } from 'common/mixin';
import SongView from '../../../components/content/SongView.vue';
export default {
  name: 'PlaylistList',
  components: { SongView },
  mixins: [roundCountMixin, getArtistsMixin, loadingMixin],
  data() {
    return {
      checkedList: []
    };
  },
  props: {
    item: {
      type: Array,
      default: () => [],
      required: true
    },
    multiSelect: {
      type: Boolean,
      default: false
    },
    newList: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    addSong() {
      this.$emit('addSong');
    },
    check(id) {
      let i = this.checkedList.indexOf(id);
      i === -1 ? this.checkedList.push(id) : this.checkedList.splice(i, 1);
    },
    checkAll() {
      this.checkedList = [];
      this.item.map(item => {
        this.checkedList.push(item.id);
      });
    },
    showMore(item) {
      this.$emit('trackMoreClick', item);
    },
    trackClick(index) {
      this.$emit('trackClick', index);
    },
    unCheckAll() {
      this.checkedList = [];
    }
  },
  watch: {
    item() {
      this.$nextTick(function() {
        this.loading = false;
        this.$emit('dataLoaded');
      });
    },
    checkedList: {
      handler(val) {
        val.length ? this.$emit('isChecked', true) : this.$emit('isChecked', false);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin';

.playlist-list {
  position: relative;
  width: 100%;
  .track-wrapper {
    display: flex;
    .index,
    .icon-select-fill,
    .icon-select-unfill {
      min-width: 50px;
    }

    .icon-select-fill,
    .icon-select-unfill {
      @include font_size($icon_m);
    }
    .icon-select-fill {
      @include font_active_color();
    }

    .track-artist::after {
      display: inline-block;
      content: '-';
      padding-left: 10px;
      height: 14px;
      line-height: 14px;
    }
  }
}
</style>
