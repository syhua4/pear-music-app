<template>
  <div class="more-song-options">
    <transition name="slide">
      <popup
        v-show="showMore"
        @togglePopUp="togglePopUp"
        :popUpHeight="-1"
        v-if="song && Object.keys(song).length"
      >
        <div class="option-header">
          <song-view>
            <img :src="fmtUrl(song.al.picUrl)" slot="left" />
            <div class="song" slot="center">
              <div class="title">{{ song.name }}</div>
              <span class="artist">{{ artists(song.ar) }}</span>
            </div>
          </song-view>
        </div>
        <div class="option-wrapper">
          <div
            class="play-next"
            @click.stop="addToPlayer"
            v-if="currentPlaying ? song.id !== currentPlaying.id : Object.keys(song).length"
          >
            <i class="iconfont icon-add-next" />
            <span>下一首播放</span>
          </div>
          <div class="add-playlist" @click.stop="selectPlaylist">
            <i class="iconfont icon-folder" />
            <span>收藏到歌单</span>
          </div>
          <div
            class="comment"
            @click.stop="noFunc"
            v-if="currentPlaying ? song.id !== currentPlaying.id : Object.keys(song).length"
          >
            <i class="iconfont icon-comment" />
            <span>评论</span>
          </div>
          <div
            class="share"
            @click.stop="share"
            v-if="currentPlaying ? song.id !== currentPlaying.id : Object.keys(song).length"
          >
            <i class="iconfont icon-share" />
            <span>分享</span>
          </div>
          <div class="artist" @click="goToArtist">
            <i class="iconfont icon-artist" />
            <span>歌手: {{ artists(song.ar) }}</span>
          </div>
          <div class="album" @click="goToAlbum">
            <i class="iconfont icon-album" />
            <span>专辑: {{ song.al.name }}</span>
          </div>
        </div>
      </popup>
    </transition>
    <transition name="slide">
      <popup ref="userPlaylist" v-show="showUserPlaylist" @togglePopUp="togglePopUp">
        <div class="playlist-header">
          <span>收藏到歌单</span>
          <div class="btn">
            <i class="iconfont icon-plus" />
            <span @click="createPlaylist">新建歌单</span>
          </div>
        </div>
        <scroll :style="{ '--height': offsetTop + 'px' }" ref="scroll">
          <loading :isShow="loading" v-if="loading && isLogin" />
          <div
            class="playlist-wrapper"
            v-for="playlist in userPlaylists"
            :key="playlist.id"
            @click.stop="addToPlaylist(playlist.id, ids ? ids : song.id)"
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
  </div>
</template>

<script>
import Scroll from 'components/common/Scroll/Scroll';
import Popup from 'components/content/Popup.vue';
import SongView from 'components/content/SongView';
import { mapActions, mapGetters } from 'vuex';
import { getArtistsMixin, getUrlMixin, playSongMixin, loadingMixin } from 'common/mixin';
import { getPlaylist, createPlaylist, changeSongInPlaylist } from 'networks/user.js';

export default {
  name: 'MoreSongOptions',
  mixins: [getArtistsMixin, getUrlMixin, playSongMixin, loadingMixin],
  components: { Scroll, SongView, Popup },
  updated() {
    if (this.showUserPlaylist) {
      console.log(this.$refs.userPlaylist);
      this.offsetTop = this.$refs.userPlaylist.$refs.popup.offsetTop;
    }
  },
  data() {
    return {
      playlistName: '',
      ids: '',
      userPlaylists: [],
      offsetTop: 0,
      showMore: false,
      showUserPlaylist: false,
      showCreatePlaylist: false
    };
  },
  props: {
    song: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    userPlaylists() {
      this.$nextTick(function() {
        this.loading = false;
      });
    }
  },
  computed: {
    ...mapGetters(['songlist', 'currentIndex', 'isLogin', 'cookie', 'profile', 'currentPlaying'])
  },
  methods: {
    ...mapActions(['setPlayList']),
    noFunc() {
      this.$toast.show('暂时还没完成哦', 500);
    },
    togglePopUp() {
      this.showMore = false;
      this.showUserPlaylist = false;
      this.showCreatePlaylist = false;
    },
    share() {
      let msg = `分享${this.artists(this.song.ar)}的单曲 ${'\u00AB' +
        this.song.name +
        '\u00BB'} https://syhua4.github.io/pear-music-app/#/song/${this.song.id}`;
      this.$copyText(msg).then(
        () => {
          this.$toast.show('复制链接成功', 1000);
        },
        () => {
          this.$toast.show('复制链接失败, 请重试', 1000);
        }
      );
    },
    goToArtist() {
      this.$emit('minimizePlayer');
      if (this.song.ar.length === 1) {
        this.$router.push(`/artist/${this.song.ar[0].id}`);
      }
    },
    goToAlbum() {
      this.$emit('minimizePlayer');
      this.$router.push(`/album/${this.song.al.id}`);
    },
    addToPlayer(e, list) {
      let selectedTracks = list ? list : [this.song];
      console.log(selectedTracks);
      // 检查歌曲是不是在 songlist 中
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
        this.playSong(selectedTracks);
      }
    },
    async selectPlaylist(e, ids) {
      this.ids = ids;
      this.togglePopUp();
      if (this.isLogin) {
        await this.getUserPlaylist();
        this.showUserPlaylist = true;
      } else {
        this.$toast.show('请先登录', 500);
      }
    },
    getUserPlaylist() {
      getPlaylist(this.profile.uid, this.cookie).then(res => {
        this.userPlaylists = res.playlist.filter(item => {
          return item.creator.userId === this.profile.uid;
        });
      });
    },
    async addToPlaylist(pid, ids) {
      await changeSongInPlaylist('add', pid, ids, this.cookie).then(res => {
        if (res.code === 200) {
          this.$toast.show('已收藏到歌单', 1000);
          this.getUserPlaylist();
          this.ids = '';
          setTimeout(() => {
            this.togglePopUp();
          }, 500);
        } else if (res.code === 502) {
          this.$toast.show(res.message, 1000);
        } else {
          this.$toast.show(res.message, 1000);
        }
      });
    },
    createPlaylist() {
      this.togglePopUp();
      this.showCreatePlaylist = true;
    },
    async submit() {
      await createPlaylist(this.playlistName, this.cookie).then(res => {
        if (res.code === 200) {
          this.addToPlaylist(res.id, this.ids ? this.ids : this.song.id);
        } else {
          this.$toast.show('创建歌单失败, 请重试', 1000);
        }
      });
      this.togglePopUp();
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin.scss';
.more-song-options {
  .option-wrapper {
    padding: 0 24px 24px;
    line-height: 70px;
    .add-more,
    .edit-playlist,
    .play-next,
    .add-playlist,
    .comment,
    .share,
    .artist,
    .album {
      display: flex;
      align-items: center;
      @include clamp(1);
      span {
        flex: 1;
        // border-bottom: 1px solid #eee;
      }
    }
    .iconfont {
      margin-right: 20px;
      @include font_size($icon_ms);
    }
  }
  .option-header {
    border-bottom: 1px solid #eee;
    img {
      width: 100px;
      height: 100px;
      border-radius: 15px;
      margin-right: 20px;
      padding: 10px 0;
    }
  }

  .playlist-header {
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
}
</style>
