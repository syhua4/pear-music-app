<template>
  <div class="radio-toplist-view" v-if="toplist && toplist.length">
    <div class="header">{{ title }}</div>
    <div
      class="toplist-wrapper"
      v-for="(item, index) in toplist"
      :key="item.rank"
      @click.stop="isRadio ? toRadio(item.id) : playProgram(index)"
    >
      <div class="rank-wrapper">
        <div class="rank">{{ toplist[0].rank === 1 ? item.rank : item.rank - 1 }}</div>
        <div class="rank-stat">
          <i
            class="iconfont"
            :class="rankStat(item) > 0 ? 'icon-up' : 'icon-down'"
            v-if="rankStat(item) && item.lastRank !== -1"
          />
          <span :class="{ new: item.lastRank === -1 }">{{
            item.lastRank !== -1
              ? 1 * rankStat(item) >= 0
                ? rankStat(item) === 0
                  ? '-'
                  : rankStat(item)
                : rankStat(item) * -1
              : 'new'
          }}</span>
        </div>
      </div>
      <div class="program-wrapper">
        <img
          v-lazy="isRadio ? fmtUrl(item.picUrl) : fmtUrl(item.program.coverUrl)"
          :style="[{ height: isRadio ? '250px' : '100px' }, { width: isRadio ? '250px' : '100px' }]"
        />
        <div class="info">
          <div class="title">{{ isRadio ? item.name : item.program.name }}</div>
          <div class="desc" :class="{ isRadio: isRadio }">
            <div class="dj-wrapper" v-if="!isRadio">
              <img v-lazy="fmtUrl(item.program.dj.avatarUrl)" />
              <span class="dj-name">{{ item.program.dj.nickname }}</span>
            </div>
            <div class="radio-desc" v-if="isRadio">
              <div class="dj-name">{{ item.dj.nickname }}</div>
            </div>
            <div class="score-wrapper">
              <i class="iconfont icon-hot" />
              <span class="score">{{ item.score | round(1) }}</span>
            </div>
          </div>
        </div>
      </div>
      <i class="iconfont icon-play" v-if="!isRadio" />
    </div>
  </div>
</template>

<script>
import { getUrlMixin, roundCountMixin, playSongMixin } from 'common/mixin';
export default {
  name: 'RadioToplistView',
  mixins: [getUrlMixin, roundCountMixin, playSongMixin],
  data() {
    return {
      tracks: []
    };
  },
  props: {
    toplist: {
      type: Array,
      default: () => [],
      required: true
    },
    title: {
      type: String,
      required: true,
      default: ''
    },
    isRadio: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    rankStat() {
      return function(item) {
        return item.lastRank - item.rank;
      };
    }
  },
  watch: {
    toplist: {
      deep: true,
      handler() {
        this.$nextTick(function() {
          console.log('子组件数据接收完毕');
          this.$emit('contentLoaded');
        });
        if (!this.isRadio) {
          this.$nextTick(function() {
            this.tracks = [];
            this.toplist.map(song => {
              this.tracks.push({
                id: song.program.mainSong.id,
                name: song.program.name,
                al: { picUrl: song.program.coverUrl },
                ar: [{ name: song.program.radio.name }]
              });
            });
          });
        }
      }
    }
  },
  methods: {
    toRadio(id) {
      this.$router.push(`/radio/program/${id}`);
    },
    playProgram(index) {
      this.playSong(this.tracks, index);
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin.scss';
.radio-toplist-view {
  margin: 0 24px;
  .header {
    padding: 24px 0;
  }
  .toplist-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .rank-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 8%;
      @include font_color();
      .rank-stat {
        display: flex;
        color: #999;
        @include font_size($s);
        .icon-down,
        .icon-up {
          margin-left: -10px;
          @include font_size($icon_s);
        }
        span {
          display: inline-block;
          margin-left: -5px;
        }
        .new,
        .icon-down,
        .icon-down + span {
          color: green;
        }
        .icon-up,
        .icon-up + span {
          @include font_active_color();
        }
      }
    }

    .program-wrapper {
      display: flex;
      width: 75%;
      align-items: center;
      img {
        border-radius: 10px;
        margin: 0 10px;
      }

      .info {
        display: flex;
        flex-direction: column;
        .title {
          @include clamp(1);
        }
        .desc {
          display: flex;
          @include font_size($s);
          @include font_color();
          @include nowrap();
          &.isRadio {
            padding-top: 5px;
            @include clamp(1);
          }
          &.isRadio .score-wrapper {
            padding-top: 10px;
          }

          .dj-wrapper {
            display: flex;
            align-items: center;
            img {
              height: 30px;
              width: 30px;
              border-radius: 50%;
            }
            &::after {
              content: '|';
              display: inline-block;
              padding: 0 20px;
            }
          }
          .score-wrapper {
            .icon-hot {
              margin-right: 5px;
              @include font_size($icon_s);
            }
          }
        }
      }
    }
    .icon-play {
      padding-left: 50px;
      margin-left: auto;
      @include font_active_color();
      @include font_size($icon_m);
    }
  }
  .toplist-wrapper:nth-child(-n + 4) .rank {
    @include font_active_color();
  }
}
</style>
