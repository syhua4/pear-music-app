<template>
  <div class="player-control">
    <audio ref="audio" :src="song" preload="auto" @timeupdate="timeUpdate" />
    <div class="track-bar">
      <span class="minutes">{{ playedTime }}</span>
      <div class="bar">
        <div class="bar-top" :style="{ width: playedPercent }">
          <div class="dot"></div>
        </div>
      </div>
      <span class="minutes">{{ playTime }}</span>
    </div>
    <div class="audio-controls">
      <i class="iconfont icon-loop"></i>
      <i class="iconfont icon-play-back" @click="playBefore"></i>
      <div @click="play">
        <i class="iconfont " :class="isPlaying ? 'icon-pause' : 'icon-play-btn'"></i>
      </div>
      <i class="iconfont icon-play-next" @click="playNext"></i>
      <i class="iconfont icon-songlist" @click="toggleSonglist"></i>
    </div>
  </div>
</template>

<script>
import { fmtTime } from 'common/utils'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'PlayerControls',
  data() {
    return {
      audio: null,
      loop: false,
      totalTime: 0,
      playTime: '00:00',
      playedTime: '00:00',
      playedPercent: '0'
    }
  },
  mounted() {
    this.audio = this.$refs.audio
    this.audio.oncanplaythrough = () => {
      console.log('can play')
      this.totalTime = this.audio.duration
      if (this.isPlaying) {
        this.audio.play()
      }
    }
    let observer = new MutationObserver(() => {
      if (this.$refs.audio.src) {
        console.log('loaded')
        this.audio.play()
      }
    })

    // 2.告诉 observer 需要观察的内容
    let config = {
      childList: true,
      subtree: true,
      attributeFilter: ['src']
    }

    // 3.告诉 observer 需要观察哪个 dom 元素, 和观察的内容 (第二步)
    observer.observe(this.$refs.audio, config)
  },
  methods: {
    ...mapActions(['setPlayStatus', 'setCurrentIndex', 'setShowPlayer']),
    play() {
      this.setPlayStatus(!this.isPlaying)
      this.isPlaying ? this.audio.play() : this.audio.pause()
    },
    toggleSonglist() {
      this.$emit('toggleSonglist', true)
    },
    playNext() {
      this.currentIndex === this.songlist.length - 1
        ? this.setCurrentIndex(0)
        : this.setCurrentIndex(this.currentIndex + 1)
      if (this.songlist && !this.songlist[this.currentIndex].url) {
        this.playNext()
      }
      this.setPlayStatus(true)
    },
    playBefore() {
      this.currentIndex === 0
        ? this.setCurrentIndex(this.songlist.length - 1)
        : this.setCurrentIndex(this.currentIndex - 1)
      if (this.songlist && !this.songlist[this.currentIndex].url) {
        this.playBefore()
      }
      this.setPlayStatus(true)
    },
    timeUpdate(e) {
      let time = fmtTime(e.target.currentTime)
      this.playedTime = `${time.minute}:${time.second}`
      this.playedPercent = `${((e.target.currentTime / this.totalTime) * 100).toFixed(0)}%`
    }
  },
  computed: {
    ...mapGetters(['isPlaying', 'currentIndex', 'songlist']),
    song() {
      let url = ''
      if (this.songlist && this.songlist.length > 0) {
        if (this.songlist[this.currentIndex].url) {
          url = this.songlist[this.currentIndex].url
        } else {
          this.playNext()
          url = this.songlist[this.currentIndex].url
        }
      }
      return url
    }
  },
  watch: {
    songlist: {
      handler(val) {
        if (val.length === 0) {
          this.audio.pause()
          this.$emit('toggleSonglist', false)
          this.setShowPlayer(false)
        }
      }
    },
    currentIndex: {
      handler(val) {
        console.log(val)
        this.totalTime = this.audio.duration
      }
    },
    totalTime: {
      handler(val) {
        if (val) {
          let temp = fmtTime(val)
          this.playTime = `${temp.minute}:${temp.second}`
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin';

.player-control {
  height: 20%;
  color: #fff;
  position: relative;
  z-index: 1;
  margin: 0 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .track-bar {
    @include font_size($s);
    width: 100%;
    // border: 2px solid red;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .bar {
      flex: 0 0 70%;
      height: 8px;
      background-color: rgba($color: #fff, $alpha: 0.3);
      border-radius: 5px;
      .bar-top {
        width: 80%;
        height: 8px;
        border-radius: 5px 0 0 5px;
        position: relative;
        background-color: rgba($color: #fff, $alpha: 0.8);
        .dot {
          width: 20px;
          height: 20px;
          background-color: #fff;
          border-radius: 50%;
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1;
        }
      }
    }
    .minutes {
      padding: 0 20px;
      flex: 0 0 10%;
      // border: 2px solid deepskyblue;
    }
  }
  .audio-controls {
    margin-top: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .iconfont {
      @include font_size($icon_m);
    }
    div {
      border: 2px solid #fff;
      padding: 30px;
      padding-left: 33px;
      position: relative;
      border-radius: 50%;
    }
  }
}
</style>
