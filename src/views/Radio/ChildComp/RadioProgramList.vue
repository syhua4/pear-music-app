<template>
  <div class="program-list" v-if="list && list.length">
    <div class="header">共{{ list.length }}期</div>
    <scroll>
      <div
        class="song-wrapper"
        v-for="(program, index) in list"
        :key="program.id"
        @click="playProgram(index)"
      >
        <div class="index">{{ list.length - (index % list.length) }}</div>
        <div class="song-info">
          <div class="title">{{ program.name }}</div>
          <div class="song-desc">
            <span class="date">{{ getDate(program.createTime) }}</span>
            <span class="play-count "
              ><i class="iconfont icon-play-s" />{{ program.listenerCount | round(1) }}</span
            >
            <span class="duration"
              ><i class="iconfont icon-duration" />{{ getTime(program.duration) }}</span
            >
          </div>
        </div>
        <i class="iconfont icon-more" />
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/Scroll/Scroll';
import { fmtDate, fmtDuration } from 'common/utils';
import { roundCountMixin } from 'common/mixin';
export default {
  name: 'RadioProgramList',
  mixins: [roundCountMixin],
  components: { Scroll },
  props: {
    list: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  computed: {
    getDate() {
      return function(date) {
        let time = fmtDate(date / 1000);
        return `${('' + time.month).length !== 1 ? time.month : '0' + time.month}-${
          ('' + time.date).length !== 1 ? time.date : '0' + time.date
        }`;
      };
    },
    getTime() {
      return function(duration) {
        let time = fmtDuration(duration);
        return `${time.minutes}:${time.seconds}`;
      };
    }
  },
  methods: {
    playProgram(index) {
      this.$emit('playProgram', index);
    }
  },
  watch: {
    list: {
      deep: true,
      handler() {
        this.$nextTick(function() {
          this.$emit('contentLoaded');
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin.scss';
.program-list {
  @include font_size($ms);
  .header {
    height: 50px;
    line-height: 50px;
    background-color: #eee;
    padding: 0 24px;
    position: relative;
    z-index: 1;
    top: -5px;
  }
  .scroll-wrapper {
    position: fixed;
    top: calc(35% + 180px);
    bottom: 0;
    right: 0;
    left: 0;
    .song-wrapper {
      display: flex;
      align-items: center;
      margin: 0 24px;
      padding: 20px 0;
      color: #999;
      .index {
        width: 10%;
        margin-right: 10px;
      }
      .song-info {
        width: 75%;

        .title {
          color: #333;
          @include clamp(1);
          @include font_size($m);
        }
        .song-desc {
          display: flex;
          align-items: center;
          padding-top: 10px;
          @include clamp(1);
        }
        .play-count,
        .duration {
          margin-left: 20px;
          @include font_size($ms);
          .icon-play-s,
          .icon-duration {
            margin-right: 5px;
            @include font_size($icon_s);
          }
          .icon-duration {
            margin-right: 10px;
          }
        }
      }
      .icon-more {
        margin-left: auto;
        @include font_size($icon_ms);
      }
    }
  }
}
</style>
