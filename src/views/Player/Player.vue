<template>
  <transition @enter="enter" @leave="leave" :css="false">
    <div class="player" :style="bgVar" v-show="showPlayer" @click="screenClick" ref="player">
      <div v-show="!isLoading">
        <audio ref="audio" :src="song" preload="auto" @timeupdate="timeUpdate" @ended="end" />
      </div>
      <nav-bar class="player-nav">
        <i class="iconfont icon-back" slot="left" @click="goBack" />
        <div slot="center" class="header">
          <span class="track-name">{{ currentPlaying && currentPlaying.name }}</span>
          <span class="track-artist">{{ currentPlaying && artists(currentPlaying.ar) }}</span>
        </div>
        <i class="iconfont icon-share" slot="right"></i>
      </nav-bar>
      <player-cd ref="cd" :bgColor="bgColor" />
      <player-toolbar />
      <player-controls
        ref="controls"
        @toggleSonglist="toggleSonglist"
        @changeProgress="changeProgress"
        :totalTime="totalTime"
        :currentTime="currentTime"
        :ready="ready"
      />
      <transition name="slide">
        <player-songlist
          class="songlist"
          v-if="songlistToggler"
          @toggleSonglist="toggleSonglist"
          ref="songlist"
        />
      </transition>
    </div>
  </transition>
</template>

<script>
import NavBar from 'components/common/NavBar/NavBar';
import PlayerCd from './ChildComp/PlayerCD';

import PlayerToolbar from './ChildComp/PlayerToolbar';
import PlayerControls from './ChildComp/PlayerControls';
import PlayerSonglist from './ChildComp/PlayerSonglist';

import Velocity from 'velocity-animate';
import 'velocity-animate/velocity.ui';

import analyze from 'rgbaster';

import { mapGetters, mapActions } from 'vuex';
import { getArtistsMixin, getUrlMixin } from 'common/mixin';
import { shuffle } from 'common/utils';

export default {
  name: 'Player',
  mixins: [getArtistsMixin, getUrlMixin],
  components: {
    NavBar,
    PlayerCd,
    PlayerToolbar,
    PlayerControls,
    PlayerSonglist
  },
  data() {
    return {
      bgVar: {
        '--bg': '',
        '--opacity': 0
      },
      songlistToggler: false,
      audio: null,
      currentTime: 0,
      totalTime: 0,
      ready: false,
      playedPosition: 0,
      scrolled: false,
      bgColor: 'white'
    };
  },
  mounted() {
    this.audio = this.$refs.audio;
    let observer = new MutationObserver(() => {
      if (this.audio.src && this.audio.src.includes('mp3')) {
        this.setPlayStatus(false);
        this.ready = false;
        this.audio.ondurationchange = () => {
          console.log(' --- get duration ---');
          this.currentTime = 0;
          this.totalTime = this.audio.duration;
          this.audio.play();
        };
        this.audio.onprogress = () => {
          console.log(' --- on progress ---');
          if (this.audio.readyState < 4) {
            this.audio.play();
          }
        };
        this.audio.oncanplaythrough = () => {
          console.log(' --- can playthrough ---');
          this.setPlayStatus(true);
          this.ready = true;
        };
      }
    });
    let config = {
      childList: true,
      subtree: true,
      attributeFilter: ['src']
    };
    observer.observe(this.$refs.audio, config);
  },
  methods: {
    ...mapActions(['setShowPlayer', 'setPlayStatus', 'setShuffledList']),
    changeProgress(percent) {
      this.audio.currentTime = (percent.slice(0, -1) / 100) * this.totalTime;
    },

    end() {
      if (this.playMode === 'loop') {
        this.$refs.controls.playNext();
      } else if (this.playMode === 'one') {
        this.audio.currentTime = 0;
        this.audio.play();
      } else {
        if (!this.isPlaying) {
          this.unshuffle();
        }
        this.$refs.controls.playNext();
      }
    },
    toggleSonglist(status) {
      this.songlistToggler = status;
    },
    goBack() {
      this.setShowPlayer(false);
    },
    screenClick(e) {
      if (this.songlistToggler) {
        let songlistHeight = this.$refs.songlist.$el.offsetTop;
        if (e.clientY < songlistHeight) {
          this.toggleSonglist(false);
        }
      }
    },
    timeUpdate(e) {
      if (!this.scrolled) {
        // this.audio.currentTime = this.playedPosition
        this.currentTime = e.target.currentTime;
      }
    },
    unshuffle() {
      let index = this.songlist.findIndex(song => song.id === this.currentPlaying.id);
      console.log(index);
      this.setCurrentIndex(index);
      // [list[this.currentIndex], list[index]] = [list[index], list[this.currentIndex]];
    },
    enter(el, done) {
      Velocity(el, 'transition.shrinkIn', { duration: 500 }, function() {
        done();
      });
    },
    leave(el, done) {
      Velocity(el, 'transition.shrinkOut', { duration: 500 }, function() {
        done();
      });
    }
  },
  computed: {
    ...mapGetters([
      'showPlayer',
      'currentPlaying',
      'songlist',
      'currentIndex',
      'isPlaying',
      'playMode',
      'isLoading'
    ]),
    song() {
      let url = '';
      if (this.currentPlaying && this.songlist && this.songlist.length > 0) {
        if (!this.currentPlaying.url) {
          console.log('no url');
          if (this.songlist.length === 1) {
            console.log('1111');
            this.$toast.show('很抱歉,这首歌暂时没有音源。为您返回上一页', 1000);
            this.goBack();
          } else {
            console.log('2222');
            this.$toast.show('很抱歉,这首歌暂时没有音源。为您播放下一首', 1000);
            this.$refs.controls.playNext();
          }
        }
        url = this.fmtUrl(this.currentPlaying.url);
      }
      return url;
    }
  },
  watch: {
    currentPlaying: {
      handler(val) {
        if (val && Object.keys(val).length > 0) {
          // let colorthief = new ColorThief();
          let preloader = document.createElement('img');
          preloader.src = val.al.picUrl;
          preloader.crossOrigin = 'anonymous';
          preloader.addEventListener('load', () => {
            console.log('img load');
            this.bgVar['--bg'] = `url("${this.fmtUrl(val.al.picUrl)}")`;
            this.bgVar['--opacity'] = 1;
            // this.bgColor = colorthief.getColor(preloader);
            async function color(img) {
              let c = await analyze(
                img,
                {
                  ignore: ['rgb(255,255,255)', 'rgb(0,0,0)']
                },
                { scale: 0.1 }
              );
              return c[0].color;
            }

            color(`${preloader.src}?param=50y50`).then(res => {
              this.bgColor = res;
            });

            // console.log(color);
            // console.log(this.bgColor);
            preloader = null;
          });
        }
      }
    },
    songlist(newVal, oldVal) {
      if (newVal.length === 0) {
        this.audio.pause();
        this.toggleSonglist(false);
        this.setShowPlayer(false);
      }
      if (newVal !== oldVal && this.playMode === 'random') {
        let list = shuffle(this.songlist);
        let index = list.findIndex(song => song.id === this.songlist[this.currentIndex].id);
        [list[this.currentIndex], list[index]] = [list[index], list[this.currentIndex]];
        this.setShuffledList(list);
      }
    },
    isPlaying(newVal) {
      newVal && this.audio.src.includes('mp3')
        ? this.audio.play()
        : this.audio.play().then(() => {
            this.audio.pause();
          });
    },
    playMode(newVal) {
      if (newVal === 'random') {
        let list = shuffle(this.songlist);
        let index = list.findIndex(song => song.id === this.songlist[this.currentIndex].id);
        [list[this.currentIndex], list[index]] = [list[index], list[this.currentIndex]];
        this.setShuffledList(list);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin';

.player {
  position: fixed;
  // height: 100%;
  background-color: #444;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  // background: ;
  &::after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0;
    right: 0;
    bottom: 0px;
    background: #666 no-repeat center;
    background-image: var(--bg);
    filter: blur(50px) brightness(50%);
    background-size: cover;
    z-index: 0;
    transform: translateZ(0);
    perspective: 1000;
    backface-visibility: hidden;
    opacity: var(--opacity);
    transition: opacity 5s ease-out;
    -webkit-transform: translateZ(0);
    -webkit-perspective: 1000;
    -webkit-backface-visibility: hidden;
  }
  .player-nav {
    color: #fff;
    position: relative;
    z-index: 1;
    background-color: transparent;
    height: 100px;
    .header {
      display: flex;
      flex-direction: column;
      text-align: center;
      .track-name,
      .track-artist {
        height: 50px;
        line-height: 60px;
        @include font_size($ms);
      }
      .track-artist {
        line-height: 40px;
        @include font_size($s);
      }
    }
    .icon-back,
    .icon-share {
      @include font_size($icon_m);
      font-weight: 500;
    }
  }
  .songlist {
    margin: 0 24px;
    min-height: 290px;
    background-color: #fff;
    border-radius: 40px;
    bottom: 30px;
    right: 0;
    left: 0;
    position: fixed;
    z-index: 3;
  }

  .slide-enter-active {
    transition: all 300ms;
  }

  .slide-enter {
    transform: translate3d(0, 100%, 0);
  }

  .slide-leave-active {
    transform: translate3d(0, 200%, 0);
    transition: all 800ms;
  }
}
</style>
