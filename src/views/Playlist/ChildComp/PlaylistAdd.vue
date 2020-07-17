<template>
  <div class="add-song">
    <nav-bar class="nav">
      <span slot="center">添加音乐到歌单</span>
      <span slot="right" @click="goBack">完成</span>
    </nav-bar>
    <div class="header">最近播放</div>
    <div class="song-wrapper" v-for="item in songs" :key="item.id" @click="addSong(item.id)">
      <img :src="fmtUrl(item.al.picUrl)" />
      <div class="song">
        <div class="title">{{ item.name }}</div>
        <div class="song-info">
          <span class="artist">{{ artists(item.ar) }}</span>
          <span class="album">{{ item.al.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/NavBar/NavBar';
import { getArtistsMixin, getUrlMixin } from 'common/mixin';
import { getPlayerHistory, changeSongInPlaylist } from 'networks/user';
import { getPlaylistTrackId } from 'networks/recommend';
import { mapGetters } from 'vuex';
export default {
  name: 'PlaylistAdd',
  components: { NavBar },
  mixins: [getArtistsMixin, getUrlMixin],
  data() {
    return {
      songs: []
    };
  },
  created() {
    if (this.isLogin) {
      getPlayerHistory(this.profile.uid, this.cookie).then(res => {
        res.weekData.map(item => {
          this.songs.push(item.song);
        });
      });
    } else {
      this.$toast.show('请先登录', 1000);
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async addSong(id) {
      let pid = this.$route.params.id;
      let ids = [];
      await getPlaylistTrackId(pid).then(res => {
        res.playlist.trackIds.map(item => {
          ids.push(item.id);
        });
      });
      await changeSongInPlaylist('add', pid, id).then(res => {
        if (res.code === 200) {
          let added = ids.findIndex(i => i === id);
          if (added < 0) {
            this.$toast.show('添加成功', 1000);
          } else {
            this.$toast.show('歌单内歌曲重复', 1000);
          }
        } else if (res.code === 502) {
          this.$toast.show(res.message, 1000);
        } else {
          this.$toast.show('添加失败', 1000);
        }
      });
    }
  },
  computed: {
    ...mapGetters(['isLogin', 'cookie', 'profile'])
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin.scss';
.add-song {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 11;
  @include font_size($ms);
  .nav {
    color: #fff;
    position: relative;
    .right-nav {
      span {
        @include font_size($ms);
      }
    }
  }
  .header {
    margin: 0 24px;
    padding: 20px 0;
    @include font_size($s);
  }
  .song-wrapper {
    margin: 0 24px;
    padding: 10px 0;
    display: flex;
    width: 100%;
    align-items: center;
    img {
      width: 100px;
      height: 100px;
      border-radius: 15px;
      margin-right: 20px;
    }
    .song {
      width: calc(100% - 200px);
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .title {
        @include clamp(1);
      }
      .song-info {
        @include font_size($s);
        @include font_color();
        @include clamp(1);
        .artist::after {
          content: '-';
          display: inline-block;
          padding: 0 10px;
        }
      }
    }
  }
}
</style>
