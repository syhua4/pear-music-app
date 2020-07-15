<template>
  <div class="result-video" v-if="results && results.length > 0">
    <div v-for="video in results" :key="video.id" class="video">
      <div class="wrapper-left">
        <img v-lazy="fmtUrl(video.coverUrl)" class="video-img" />
        <div class="play-count">
          <i class="iconfont icon-play-s" />
          <span class="play-time">{{ video.playTime | round }}</span>
        </div>
      </div>
      <div class="wrapper-right">
        <div class="video-name">{{ video.title }}</div>
        <div class="video-desc">
          <span class="video-track-count">{{ getTime(video.durationms) }}, </span>
          <span class="video-creator">by {{ video.creator[0].userName }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fmtDuration } from 'common/utils';
import { getUrlMixin, roundCountMixin } from 'common/mixin';
export default {
  name: 'SearchVideo',
  mixins: [getUrlMixin, roundCountMixin],
  props: {
    results: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  computed: {
    getTime() {
      return function(time) {
        let ms = fmtDuration(time);
        return `${ms.minutes}:${ms.seconds}`;
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin';

.result-video {
  margin: 0 24px;
  .video {
    display: flex;
    align-items: center;
    padding: 10px 0;
    @include font_size($ms);
    .wrapper-left {
      position: relative;
      img {
        width: 225px;
        height: 150px;
        object-fit: cover;
        border-radius: 10px;
        margin-right: 20px;
      }
      .play-count {
        position: absolute;
        right: 25px;
        top: 0;
        color: #fff;
        @include font_size($s);
      }
      .icon-play-s {
        @include font_size($icon_xs);
      }
    }
    .video-desc {
      @include font_size($s);
      @include font_color();
      @include clamp(1);
      padding-top: 10px;
      span {
        padding: 0 5px;
      }
    }
    .video-name {
      @include clamp(2);
    }
  }
}
</style>
