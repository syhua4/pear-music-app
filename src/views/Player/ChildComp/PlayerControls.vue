<template>
  <div class="player-control">
    <div class="track-bar">
      <span class="minutes" ref="currentTime">{{ curTime }}</span>
      <div class="bar" ref="progressBar">
        <div class="bar-top" :style="{ width: playedPercent }" ref="progress">
          <div
            class="dot"
            ref="dot"
            :class="{ loading: !ready }"
            @touchstart.prevent="touchstart"
            @touchmove.prevent="touchmove"
            @touchend="touchend"
          />
        </div>
      </div>
      <span class="minutes" ref="totalTime">{{ totTime }}</span>
    </div>
    <div class="audio-controls">
      <i class="iconfont" :class="mode" @click="changeMode" />
      <i class="iconfont icon-play-back" @click="playBefore" />
      <div @click="play">
        <i class="iconfont" :class="isPlaying ? 'icon-pause' : 'icon-play-btn'" />
      </div>
      <i class="iconfont icon-play-next" @click="playNext" />
      <i class="iconfont icon-songlist" @click.stop="toggleSonglist" />
    </div>
  </div>
</template>

<script>
import { fmtTime } from 'common/utils';
import { mapActions, mapGetters } from 'vuex';
import { changeModeMixin } from 'common/mixin';
export default {
  name: 'PlayerControls',
  mixins: [changeModeMixin],
  data() {
    return {
      audio: null,
      loop: false,
      playedPercent: '0',
      curTime: '00:00',
      totTime: '00:00',
      touch: {}
    };
  },
  props: {
    currentTime: {
      type: Number,
      default: 0,
      required: true
    },
    totalTime: {
      type: Number,
      default: 0,
      required: true
    },
    ready: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  methods: {
    ...mapActions(['setPlayStatus', 'setCurrentIndex', 'setShowPlayer']),
    initProgressBar() {
      this.playedPercent = '0';
      this.$refs.totalTime.innerHTML = '00:00';
      this.$refs.currentTime.innerHTML = '00:00';
    },
    touchstart(e) {
      this.touch.initialed = true;
      this.touch.startX = e.touches[0].pageX;
      this.touch.left = this.$refs.progress.clientWidth;
      // e.preventDefault()
      // console.log(this.$refs.test.offsetWidth)
      console.log(this.touch);
    },
    touchmove(e) {
      if (!this.touch.initialed) {
        return;
      }
      let deltaX = e.touches[0].pageX - this.touch.startX;
      let offsetWidth = Math.min(
        this.$refs.progressBar.clientWidth - this.$refs.dot.offsetWidth,
        Math.max(0, this.touch.left + deltaX)
      );
      this.playedPercent = `${(
        (offsetWidth / (this.$refs.progressBar.clientWidth - this.$refs.dot.offsetWidth)) *
        100
      ).toFixed(0)}%`;
    },
    touchend() {
      this.touch.initialed = false;
      this.$emit('changeProgress', this.playedPercent);
    },
    play() {
      this.setPlayStatus(!this.isPlaying);
    },
    toggleSonglist() {
      this.$emit('toggleSonglist', true);
    },
    playNext() {
      this.setCurrentIndex(this.currentIndex + 1);
      if (this.songlist && !this.currentPlaying.url) {
        this.playNext();
      }
    },
    playBefore() {
      this.setCurrentIndex(this.currentIndex - 1);
      if (this.songlist && !this.currentPlaying.url) {
        this.playBefore();
      }
    }
  },
  computed: {
    ...mapGetters(['isPlaying', 'currentIndex', 'songlist', 'currentPlaying'])
  },
  watch: {
    currentTime(newVal) {
      let time = fmtTime(newVal);
      this.$refs.currentTime.innerHTML = `${time.minute}:${time.second}`;
      this.playedPercent = `${((newVal / this.totalTime) * 100).toFixed(0)}%`;
    },
    totalTime(newVal) {
      let time = fmtTime(newVal);
      this.$refs.totalTime.innerHTML = `${time.minute}:${time.second}`;
    },
    currentIndex() {
      this.initProgressBar();
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin';

.player-control {
  height: 15%;
  color: #fff;
  position: fixed;
  top: calc(100px + 75%);
  left: 0;
  right: 0;
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
          &.loading {
            animation: loading 1s linear infinite alternate;
          }
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
@keyframes loading {
  from {
    background-color: #d64139;
  }
  to {
    background-color: #fff;
  }
}
</style>
