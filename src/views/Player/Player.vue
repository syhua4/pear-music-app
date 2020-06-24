<template>
  <transition @enter="enter" @leave="leave" :css="false">
    <div class="player" :style="bgVar" v-show="showPlayer" @click="screenClick">
      <audio ref="audio" :src="song" preload="auto" @timeupdate="timeUpdate" @ended="end" />
      <nav-bar class="player-nav">
        <i class="iconfont icon-back" slot="left" @click="goBack" />
        <div slot="center" class="header">
          <span class="track-name">{{ currentPlaying && currentPlaying.name }}</span>
          <span class="track-artist">
            {{ currentPlaying && artists(currentPlaying.ar) }}
          </span>
        </div>
        <i class="iconfont icon-share" slot="right"></i>
      </nav-bar>
      <player-cd />
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
import NavBar from 'components/common/NavBar/NavBar'
import PlayerCd from './ChildComp/PlayerCD'
import PlayerToolbar from './ChildComp/PlayerToolbar'
import PlayerControls from './ChildComp/PlayerControls'
import PlayerSonglist from './ChildComp/PlayerSonglist'

import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'

import { mapGetters, mapActions } from 'vuex'
import { getArtistsMixin } from 'common/mixin'

export default {
  name: 'Player',
  mixins: [getArtistsMixin],
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
        '--bg': ''
      },
      songlistToggler: false,
      audio: null,
      currentTime: 0,
      totalTime: 0,
      ready: false,
      playedPosition: 0,
      scrolled: false
    }
  },
  mounted() {
    this.audio = this.$refs.audio
    // this.playPromise = this.audio.play()
    let observer = new MutationObserver(() => {
      if (this.audio.src && this.audio.src.includes('mp3')) {
        this.setPlayStatus(false)
        this.ready = false
        console.log(' --- url loaded --- ')
        this.audio.play()
      }
    })
    let config = {
      childList: true,
      subtree: true,
      attributeFilter: ['src']
    }
    observer.observe(this.$refs.audio, config)

    this.audio.oncanplaythrough = () => {
      console.log(' --- ready to play ---')
      this.totalTime = this.audio.duration
      this.setPlayStatus(true)
      this.ready = true
    }
  },
  methods: {
    ...mapActions(['setShowPlayer', 'setPlayStatus']),
    changeProgress(percent) {
      this.audio.currentTime = (percent.slice(0, -1) / 100) * this.totalTime
    },
    end() {
      this.$refs.controls.playNext()
    },
    toggleSonglist(status) {
      this.songlistToggler = status
    },
    goBack() {
      this.setShowPlayer(false)
    },
    screenClick(e) {
      if (this.songlistToggler) {
        let songlistHeight = this.$refs.songlist.$el.offsetTop
        if (e.clientY < songlistHeight) {
          this.toggleSonglist(false)
        }
      }
    },
    timeUpdate(e) {
      if (!this.scrolled) {
        // this.audio.currentTime = this.playedPosition
        this.currentTime = e.target.currentTime
      }
    },
    enter(el, done) {
      Velocity(el, 'transition.shrinkIn', { duration: 500 }, function() {
        done()
      })
    },
    leave(el, done) {
      Velocity(el, 'transition.shrinkOut', { duration: 500 }, function() {
        done()
      })
    }
  },
  computed: {
    ...mapGetters(['showPlayer', 'currentPlaying', 'songlist', 'currentIndex', 'isPlaying']),
    song() {
      let url = ''
      if (this.songlist && this.songlist.length > 0) {
        if (!this.songlist[this.currentIndex].url) {
          this.$refs.controls.playNext()
        }
        url = this.songlist[this.currentIndex].url
      }
      return url
    }
  },
  watch: {
    currentPlaying: {
      handler(val) {
        if (val && Object.keys(val).length > 0) {
          this.bgVar['--bg'] = `url("${val.al.picUrl}")`
        }
      }
    },
    songlist: {
      handler(val) {
        if (val.length === 0) {
          this.audio.pause()
          this.toggleSonglist(false)
          this.setShowPlayer(false)
        }
      }
    },
    isPlaying(newVal) {
      newVal && this.audio.src.includes('mp3')
        ? this.audio.play()
        : this.audio.play().then(() => {
            this.audio.pause()
          })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin';

.player {
  position: fixed;
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
    background: #444 no-repeat center;
    background-image: var(--bg);
    filter: blur(50px) brightness(50%);
    background-size: cover;
    z-index: 0;
    transform: translateZ(0);
    perspective: 1000;
    backface-visibility: hidden;
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
