<template>
  <div class="program-list" v-if="list && list.length">
    <div class="header">共{{ list.length }}期</div>
    <div
      class="song-wrapper"
      v-for="(program, index) in list"
      :key="program.id"
      @click="playProgram(index)"
    >
      <song-view>
        <div class="index" slot="left">{{ list.length - (index % list.length) }}</div>
        <div class="song-info" slot="center">
          <div class="title">{{ program.name }}</div>
          <span class="date">{{ getDate(program.createTime) }}</span>
          <span class="play-count "
            ><i class="iconfont icon-play-s" />{{ program.listenerCount | round(1) }}</span
          >
          <span class="duration"
            ><i class="iconfont icon-duration" />{{ getTime(program.duration) }}</span
          >
        </div>
        <i class="iconfont icon-more--line" slot="right" />
      </song-view>
    </div>
  </div>
</template>

<script>
import { fmtDate, fmtDuration } from 'common/utils';
import { roundCountMixin } from 'common/mixin';
import SongView from '../../../components/content/SongView.vue';
export default {
  name: 'RadioProgramList',
  components: { SongView },
  mixins: [roundCountMixin],
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

  .song-wrapper {
    display: flex;
    .index {
      min-width: 50px;
      margin-right: 10px;
    }
    .song-info {
      width: 75%;

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
</style>
