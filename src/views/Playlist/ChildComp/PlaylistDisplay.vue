<template>
  <div
    class="playlist-display"
    v-if="item && Object.keys(item).length > 0"
    :style="{ backgroundImage: backgroundImage }"
  >
    <div class="display-wrapper" :style="{ '--height': coverHeight + 'px' }">
      <div class="main-display">
        <div class="display-img-wrapper">
          <img v-lazy="fmtUrl(item.coverImgUrl)" />
          <span>
            <i class="iconfont icon-play-s"></i>
            {{ item.playCount | round }}
          </span>
        </div>
        <div class="display-content-wrapper">
          <div class="title">{{ item.name }}</div>
          <div class="creator">
            <img v-lazy="fmtUrl(item.creator.avatarUrl)" class="creator-avatar" />
            <span class="creator-name">{{ item.creator.nickname }}</span>
          </div>
          <div class="desc">
            <div class="desc-content">{{ item.description }}</div>
            <i class="iconfont icon-next"></i>
          </div>
        </div>
      </div>
      <div class="sub-display">
        <div class="btn-wrapper">
          <i class="iconfont icon-comment" />
          <span class="btn-text">{{ item.commentCount | round }}</span>
        </div>
        <div class="btn-wrapper">
          <i class="iconfont icon-share" />
          <span class="btn-text">{{ item.shareCount | round }}</span>
        </div>
        <div class="btn-wrapper" @click="noFunc">
          <i class="iconfont icon-download" />
          <span class="btn-text">下载</span>
        </div>
        <div class="btn-wrapper" @click="multiSelect">
          <i class="iconfont icon-select" />
          <span class="btn-text">多选</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { roundCountMixin, getUrlMixin } from 'common/mixin';
export default {
  name: 'PlaylistDisplay',
  mixins: [roundCountMixin, getUrlMixin],
  props: {
    item: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  data() {
    return {
      backgroundImage: '',
      coverHeight: 0
    };
  },
  mounted() {
    this.coverHeight = this.$parent.$refs.cover.clientHeight;
  },
  methods: {
    multiSelect() {
      this.$emit('multiSelect');
    },
    noFunc() {
      this.$toast.show('暂时还不支持哦', 1000);
    }
  },
  watch: {
    item: {
      handler(val) {
        if (Object.keys(val).length > 0) {
          this.backgroundImage = `url(${this.fmtUrl(val.coverImgUrl)})`;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin';
@import 'assets/css/variable';

.playlist-display {
  width: 100%;
  position: absolute;
  top: 0px;
  bottom: 0;
  left: 0;
  bottom: 0;
  padding-top: 100px;
  background: #444 no-repeat center;
  background-size: cover;
  z-index: 1;

  &::after {
    content: '';
    position: absolute;
    top: -40px;
    left: -40px;
    right: -40px;
    bottom: 0px;
    background: inherit;
    filter: blur(30px) brightness(70%);
    z-index: 1;
    -webkit-transform: translateZ(0);
    -webkit-perspective: 1000;
    -webkit-backface-visibility: hidden;
  }
  .display-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc((var(--height) - 100px));
    .main-display {
      display: flex;
      padding: 30px 24px;
      z-index: 2;
      position: relative;
      .display-img-wrapper {
        width: calc((var(--height) - 100px) * 0.55);
        height: calc((var(--height) - 100px) * 0.55);
        flex: 0 0 auto;
        position: relative;
        margin-right: 20px;
        &:after {
          content: '';
          display: block;
          height: 100%;
          position: absolute;
          top: 0;
          width: 100%;
          border-radius: 15px;

          background: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0) 25%);
        }
        img {
          width: 100%;
          height: 100%;
          border-radius: 15px;
          box-shadow: 0 5px 10px rgba($color: #000000, $alpha: 0.4);
        }
        span {
          position: absolute;
          z-index: 1;
          top: 10px;
          right: 16px;
          align-self: flex-start;
          color: #fff;
          @include font_size($s);
          .icon-play-s {
            margin-right: -8px;
            @include font_size($ms);
          }
        }
      }
      .display-content-wrapper {
        display: flex;
        flex-direction: column;
        height: calc((var(--height) - 100px) * 0.55);
        @include font_color_sub();
        .title,
        .desc-content {
          @include clamp(2);
        }
        .title {
          color: #fff;
          @include font_size($ms);
        }
        .creator {
          display: flex;
          height: calc((var(--height) - 100px) * 0.55 * 0.2);
          margin-top: 15px;
          align-items: center;
          @include font_size($ms);
          img {
            width: calc((var(--height) - 100px) * 0.55 * 0.2);
            height: calc((var(--height) - 100px) * 0.55 * 0.2);
            border-radius: 50%;
            margin-right: 5px;
          }
        }
        .desc {
          display: flex;
          margin-top: auto;
          align-items: center;
          @include font_size($s);
        }
        .icon-next {
          margin-left: 5px;
          @include font_size($s);
        }
      }
    }
    .sub-display {
      width: 100%;
      margin-bottom: 30px;
      color: #fff;
      position: relative;
      z-index: 2;
      display: flex;
      justify-content: space-around;
      text-align: center;
      .btn-wrapper {
        margin: 0 24px;

        display: flex;
        flex-direction: column;
        .iconfont {
          margin-bottom: 5px;
          font-weight: 500;
          @include font_size($icon_m);
        }
        span {
          @include font_size($s);
        }
      }
    }
  }

  // z-index: 1000;
}
</style>
