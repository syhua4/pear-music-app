<template>
  <div class="edit-playlist">
    <nav-bar class="nav" :isDisabled="true">
      <span slot="left" @click.stop="toggleCheckAll">{{
        checkedList.length ? '取消全选' : '全选'
      }}</span>
      <div class="title" slot="center">管理歌单</div>
      <span slot="right" @click.stop="goBack">完成</span>
    </nav-bar>
    <scroll>
      <div
        class="playlist-wrapper"
        v-for="playlist in playlists"
        :key="playlist.id"
        @click="check(playlist.id)"
      >
        <song-view>
          <i
            class="iconfont "
            slot="left"
            :class="checkedList.includes(playlist.id) ? 'icon-select-fill' : 'icon-select-unfill'"
          />
          <div class="playlist-info" slot="center">
            <img v-lazy="playlist.coverImgUrl" />
            <div class="playlist-desc">
              <div class="playlist-title">{{ playlist.name }}</div>
              <span class="playlist-count">{{ playlist.trackCount + '首' }}</span>
            </div>
          </div>
        </song-view>
      </div>
    </scroll>
    <div class="delete" @click.stop="deletePlaylist">
      <i class="iconfont icon-trash" />
      <span>删除</span>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/NavBar/NavBar';
import Scroll from 'components/common/Scroll/Scroll';

import SongView from 'components/content/SongView.vue';

import { selectionMixin } from 'common/mixin';
import { deletePlaylists, subscribePlaylist } from 'networks/user';
import { mapGetters } from 'vuex';
export default {
  name: 'MineEditPlaylist',
  mixins: [selectionMixin],
  components: { NavBar, Scroll, SongView },
  props: {
    playlists: {
      type: Array,
      default: () => []
    },
    type: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters(['cookie'])
  },
  methods: {
    goBack() {
      this.$parent.toggleEditPlaylist();
    },
    async deletePlaylist() {
      let ids = this.checkedList.join(',');
      if (!this.type) {
        await deletePlaylists(ids, this.cookie).then(res => {
          if (res.code === 200) {
            this.$toast.show('歌单已删除', 1000);
            this.$parent.getMyLists();
          } else {
            this.$toast.show('歌单删除失败,请重试', 1000);
          }
        });
      } else {
        let counter = 0;
        await Promise.all(
          this.checkedList.map(async i => {
            await subscribePlaylist(2, i, this.cookie).then(res => {
              if (res.code === 200) {
                counter++;
                console.log(counter);
              }
            });
          })
        );
        if (counter === this.checkedList.length) {
          this.$toast.show('歌单已删除', 1000);
          this.$parent.getMyLists();
        } else {
          this.$toast.show('歌单删除失败,请重试', 1000);
        }
      }
    },
    toggleCheckAll() {
      if (this.checkedList.length) {
        this.unCheckAll();
      } else {
        this.checkAll(this.playlists);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.edit-playlist {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 2;
  .nav {
    position: relative;
    z-index: 2;
    color: #fff;
    span {
      @include font_size($ms);
    }
    .iconfont {
      @include font_size($icon_ms);
    }
  }
  .scroll-wrapper {
    position: absolute;
    top: 100px;
    bottom: 100px;
    left: 0;
    right: 0;
    z-index: 1;
    .playlist-wrapper {
      display: flex;
      .icon-select-fill,
      .icon-select-unfill {
        min-width: 50px;
        @include font_size($icon_m);
      }
      .icon-select-fill {
        @include font_active_color();
      }
      .playlist-info {
        display: flex;
        img {
          width: 80px;
          height: 80px;
          border-radius: 15px;
          margin-right: 16px;
        }
        .playlist-desc {
          width: 100%;
          @include clamp(1);
          span {
            color: #999;
          }
        }
      }
    }
  }
  .delete {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-top: 1px solid #eee;
    .iconfont {
      @include font_size($icon_ms);
    }
    span {
      padding: 0 20px;
    }
  }
}
</style>
