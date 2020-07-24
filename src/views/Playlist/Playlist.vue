<template>
  <div id="playlist-view">
    <nav-bar class="playlist-nav">
      <i class="iconfont icon-back" slot="left" @click="goBack"></i>
      <div slot="center" class="header">歌单</div>
      <i class="iconfont icon-more--line" slot="right" @click.stop="moreOption" v-if="myPlaylist" />
    </nav-bar>
    <scroll-view ref="scrollView">
      <playlist-display :item="playlistInfo" slot="cover" @multiSelect="multiSelect" />
      <div class="play-all" @click.stop="playAll" slot="left" v-if="!selectMode">
        <i class="iconfont icon-play" />
        <span class="tool-header">播放全部</span>
      </div>

      <div class="select-all" @click.stop="selectAll" slot="left" v-if="selectMode">
        <i class="iconfont" :class="checkAll ? 'icon-select-fill' : 'icon-select-unfill'" />
        <span class="tool-header">全部</span>
      </div>
      <span slot="right" v-if="selectMode" class="select-all-text" @click="multiSelect">完成</span>
      <div class="add-col" slot="right" v-else>
        <i class="iconfont icon-plus" />
        <span>收藏</span>
        <span v-if="playlistInfo.subscribedCount"
          >({{ playlistInfo.subscribedCount | round(1) }})</span
        >
      </div>
      <playlist-list
        slot="component"
        :newList="newList"
        :item="tracks"
        :multiSelect="selectMode"
        ref="list"
        @addSong="addSong"
        @trackClick="trackClick"
        @isChecked="checked"
      />
    </scroll-view>
    <add-song v-show="toggleAddMenu" />
    <div class="select-toolbar" v-show="selectMode" :class="{ active: isChecked }">
      <div class="play-next" @click="addToPlayer">
        <i class="iconfont icon-add-next" />
        <p>下一首播放</p>
      </div>
      <div class="add-to-playlist" @click="selectPlaylist">
        <i class="iconfont icon-add" />
        <p>收藏到歌单</p>
      </div>
      <div class="remove-from-playlist" @click="removeSong" v-if="isLogin && myPlaylist">
        <i class="iconfont icon-trash" />
        <p>删除</p>
      </div>
    </div>
    <transition name="slide">
      <popup ref="popup" v-show="showUserPlaylist" @togglePopUp="togglePopUp">
        <div class="header">
          <span>收藏到歌单</span>
          <div class="btn">
            <i class="iconfont icon-plus" />
            <span @click="createPlaylist">新建歌单</span>
          </div>
        </div>
        <scroll :style="{ '--height': offsetTop + 'px' }" ref="scroll">
          <div
            class="playlist-wrapper"
            v-for="playlist in userPlaylists"
            :key="playlist.id"
            @click.stop="addToPlaylist(playlist.id)"
          >
            <song-view>
              <img :src="fmtUrl(playlist.coverImgUrl)" slot="left" />
              <div class="song" slot="center">
                <div class="title">{{ playlist.name }}</div>
                <span class="artist">{{ playlist.trackCount + '首' }}</span>
              </div>
            </song-view>
          </div>
        </scroll>
      </popup>
    </transition>
    <transition name="slide">
      <popup v-show="showCreatePlaylist" @togglePopUp="togglePopUp" :popUpHeight="-1">
        <div class="input-header">
          <span @click="togglePopUp">取消</span>
          <span class="title">新建歌单</span>
          <span @click="submit">完成</span>
        </div>
        <input type="text" placeholder="歌单标题" v-model="playlistName" />
      </popup>
    </transition>
    <transition name="slide">
      <popup v-show="showMoreOption" @togglePopUp="togglePopUp" :popUpHeight="-1">
        <div class="option-header">{{ playlistInfo.name }}</div>
        <div class="option-wrapper">
          <div class="add-more" @click.stop="addSong">
            <i class="iconfont icon-add" />
            <span>添加歌曲</span>
          </div>
          <div class="edit-playlist" @click.stop="noFunc">
            <i class="iconfont icon-edit" />
            <span>编辑歌单信息</span>
          </div>
        </div>
      </popup>
    </transition>
  </div>
</template>

<script>
import PlaylistDisplay from './ChildComp/PlaylistDisplay';
import PlaylistList from './ChildComp/PlaylistList';
import AddSong from './ChildComp/PlaylistAdd';

import NavBar from 'components/common/NavBar/NavBar';
import Scroll from 'components/common/Scroll/Scroll';

import ScrollView from 'components/content/ScrollView.vue';
import Popup from 'components/content/Popup.vue';
import SongView from 'components/content/SongView';

import { getPlaylist, changeSongInPlaylist, createPlaylist } from 'networks/user.js';
import { getPlaylistTrackId, getTrack } from 'networks/recommend.js';
import { getTracksMixin, roundCountMixin, getUrlMixin } from 'common/mixin';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Playlist',
  components: {
    PlaylistDisplay,
    PlaylistList,
    NavBar,
    Scroll,
    ScrollView,
    SongView,
    AddSong,
    Popup
  },
  mixins: [getTracksMixin, roundCountMixin, getUrlMixin],
  created() {
    getPlaylistTrackId(this.$route.params.id).then(res => {
      let ids;
      this.playlistInfo = res.playlist;
      this.playlistName = res.playlist.name;
      this.playlistInfo.creator.userId === this.profile.uid
        ? (this.myPlaylist = true)
        : (this.myPlaylist = false);
      if (!res.playlist.trackIds.length) {
        this.newList = true;
      } else {
        if (res.playlist.trackIds.length > 700) {
          ids = this.getTrackIds(res.playlist.trackIds.slice(0, 700));
        } else {
          ids = this.getTrackIds(res.playlist.trackIds);
        }
        getTrack(ids).then(res => {
          console.log(res);
          this.tracks = res.songs;
        });
      }
    });

    if (this.isLogin) {
      this.getUserPlaylist();
    }
  },
  updated() {
    if (this.showUserPlaylist) {
      this.offsetTop = this.$refs.popup.$refs.popup.offsetTop;
    }
  },
  data() {
    return {
      playlistInfo: {},
      tracks: [],
      userPlaylists: [],
      offsetTop: 0,
      newList: false,
      toggleAddMenu: false,
      myPlaylist: false,
      coverHeight: 0,
      selectMode: false,
      checkAll: false,
      isChecked: false,
      showMoreOption: false,
      showUserPlaylist: false,
      showCreatePlaylist: false,
      playlistName: ''
    };
  },
  methods: {
    ...mapActions([
      'setPlayList',
      'setCurrentIndex',
      'setShowPlayer',
      'setPlayStatus',
      'setIsLoading'
    ]),
    addSong() {
      this.toggleAddMenu = true;
      this.togglePopUp();
    },
    addToPlayer() {
      if (this.isChecked) {
        let ids = this.$refs.list.checkedList;
        let selectedTracks = this.tracks.filter(track => {
          return ids.includes(track.id);
        });
        if (this.songlist && this.songlist.length) {
          let newSong = selectedTracks.filter(song => {
            return !this.songlist.some(track => {
              return song.id === track.id;
            });
          });
          if (newSong.length) {
            let newList = [...this.songlist];
            newList.splice(this.currentIndex + 1, 0, ...newSong);
            this.setPlayList(newList);
            this.$toast.show('已添加到播放列表', 500);
          }
        } else {
          if (!this.isLoading) {
            this.setIsLoading(true);
          }
          this.setPlayList(selectedTracks);
          this.setCurrentIndex(0);
          this.setShowPlayer(true);
        }
        this.$refs.list.unCheckAll();
        this.checkAll = false;
      }
    },
    async addToPlaylist(pid) {
      let ids = this.$refs.list.checkedList.join(',');
      await changeSongInPlaylist('add', pid, ids, this.cookie).then(res => {
        if (res.code === 200) {
          this.$toast.show('已收藏到歌单', 1000);
          this.getUserPlaylist();
        } else if (res.code === 502) {
          this.$toast.show(res.message, 1000);
        } else {
          this.$toast.show(res.message, 1000);
        }
        this.showUserPlaylist = false;
        this.$refs.list.unCheckAll();
        this.checkAll = false;
      });
    },
    createPlaylist() {
      this.showUserPlaylist = false;
      this.showCreatePlaylist = true;
    },
    moreOption() {
      this.showMoreOption = true;
    },
    noFunc() {
      this.$toast.show('暂时还没完成哦', 500);
    },
    selectPlaylist() {
      if (this.isLogin) {
        this.showUserPlaylist = true;
      } else {
        this.$toast.show('请先登录', 500);
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    getUserPlaylist() {
      getPlaylist(this.profile.uid, this.cookie).then(res => {
        this.userPlaylists = res.playlist.filter(item => {
          return item.creator.userId === this.profile.uid;
        });
      });
    },
    checked(status) {
      this.isChecked = status;
    },
    multiSelect() {
      this.selectMode = !this.selectMode;
    },
    async removeSong() {
      let pid = this.playlistInfo.id;
      let id = this.$refs.list.checkedList;
      let ids = id.join(',');
      await changeSongInPlaylist('del', pid, ids, this.cookie).then(res => {
        if (res.code === 200) {
          this.$toast.show('删除成功', 500);
          let temp = this.tracks.filter(track => {
            return !id.includes(track.id);
          });
          this.tracks = temp;
        }
        this.$refs.list.unCheckAll();
        this.checkAll = false;
      });
    },
    selectAll() {
      this.checkAll ? this.$refs.list.unCheckAll() : this.$refs.list.checkAll();
      this.checkAll = !this.checkAll;
    },
    trackClick(index) {
      if (!this.isLoading) {
        this.setIsLoading(true);
      }
      this.setPlayList(this.tracks);
      this.setCurrentIndex(index);
      this.setShowPlayer(true);
    },
    togglePopUp() {
      console.log('toggle');
      this.showUserPlaylist = false;
      this.showCreatePlaylist = false;
      this.showMoreOption = false;
    },
    playAll() {
      if (!this.isLoading) {
        this.setIsLoading(true);
      }
      this.setPlayList(this.tracks);
      this.setCurrentIndex(0);
      this.setShowPlayer(true);
    },
    async submit() {
      console.log(this.playlistName);

      await createPlaylist(this.playlistName, this.cookie).then(res => {
        if (res.code === 200) {
          this.addToPlaylist(res.id);
        } else {
          this.$toast.show('创建歌单失败, 请重试', 1000);
        }
      });
      this.togglePopUp();
      this.$refs.list.unCheckAll();
      this.checkAll = false;

      this.playlistName = this.playlistInfo.name;
    }
  },
  computed: {
    ...mapGetters(['isLoading', 'profile', 'songlist', 'currentIndex', 'isLogin', 'cookie'])
  },
  watch: {
    showUserPlaylist: {
      handler(val) {
        if (val) {
          setTimeout(() => {
            this.$refs.scroll.refresh();
          }, 1000);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin';
#playlist-view {
  background-color: #fff;
  position: fixed;
  top: 0px;
  bottom: 100px;
  left: 0;
  right: 0;
  z-index: 99;
  .playlist-nav {
    color: #fff;
    background-color: transparent;
    .icon-back {
      @include font_size($icon_ms);
    }
    .icon-more--line {
      @include font_size($icon_l);
    }
    position: absolute;
    z-index: 10;
  }
  .scroll-wrapper {
    position: fixed;
    top: 100px;
    bottom: 100px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
  .add-col {
    padding: 10px;
    color: #fff;
    display: flex;
    align-items: center;
    background: $gradient-color-theme;
    border-radius: 30px;
    @include font_size($s);
  }
  .select-all {
    font-weight: normal;
    display: flex;
    align-items: center;
    .iconfont {
      @include font_color();
      @include font_size($icon_m);
    }
    .icon-select-fill {
      @include font-active_color();
    }
  }
  .select-all-text {
    @include font_active_color();
  }

  .select-toolbar {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    background-color: #fff;
    z-index: 99;
    @include bg_color_sub();
    @include font_size($s);
    @include font_color();
    &.active {
      color: #333;
    }
    .iconfont {
      display: inline-block;
      @include font_size($icon_ms);
      margin-bottom: 5px;
    }
  }

  .pop-up {
    .input-header {
      display: flex;
      height: 100px;
      padding: 0 24px;
      align-items: center;
      justify-content: space-between;
      .title {
        font-weight: 500;
      }
    }
    input {
      padding: 0 24px;
      height: 100px;
      width: 100%;
    }
    .option-header {
      margin: 24px 24px 0;
      height: 60px;
      border-bottom: 1px solid #eee;
      @include font_color();
      @include clamp(1);
    }
    .option-wrapper {
      padding: 0 24px 24px;
      line-height: 80px;
      .add-more,
      .edit-playlist {
        display: flex;
        align-items: center;
        span {
          border-bottom: 1px solid #eee;
        }
      }
      .iconfont {
        margin-right: 20px;
        @include font_size($icon_ms);
      }
    }
    .header {
      margin: 24px 24px 0;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #fff;
      span:first-child {
        font-weight: 500;
      }
      .btn {
        @include font_size($s);
        border: 1px solid #ccc;
        display: flex;
        align-items: center;
        border-radius: 30px;
        padding: 2px 15px;
        .iconfont {
          @include font_size($ms);
        }
      }
    }
    .scroll-wrapper {
      position: fixed;
      top: calc(var(--height) + 90px);
      bottom: 0;
      left: 0;
      right: 0;
      overflow: hidden;
      .playlist-wrapper {
        img {
          width: 100px;
          height: 100px;
          border-radius: 15px;
          margin-right: 20px;
        }
      }
    }
  }
}
</style>
