<template>
  <div
    class="album-display"
    v-if="item && Object.keys(item).length > 0"
    :style="{ backgroundImage: backgroundImage }"
  >
    <div class="display-wrapper" :style="{ '--height': coverHeight + 'px' }">
      <div class="main-display">
        <div class="display-img-wrapper">
          <img v-lazy="fmtUrl(item.picUrl)" />
        </div>
        <div class="display-content-wrapper">
          <div class="title">{{ item.name }}</div>
          <div class="creator">
            <span class="creator-name">歌手: {{ item.artist.name }}</span>
            <i class="iconfont icon-next" />
          </div>
          <div class="pub-time">发行时间: {{ getDate(item.publishTime) }}</div>
          <div class="desc">
            <div class="desc-content">{{ item.description }}</div>
            <i class="iconfont icon-next"></i>
          </div>
        </div>
      </div>
      <div class="sub-display">
        <div class="btn-wrapper" @click.stop="noFunc">
          <i class="iconfont icon-comment" />
          <span class="btn-text">{{ item.info.commentCount | round }}</span>
        </div>
        <div class="btn-wrapper" @click="share">
          <i class="iconfont icon-share" />
          <span class="btn-text">{{ item.info.shareCount | round }}</span>
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
import { getUrlMixin, roundCountMixin } from 'common/mixin';
import { fmtDate } from 'common/utils';

import { mapGetters } from 'vuex';
export default {
  name: 'AlbumDisplay',
  mixins: [getUrlMixin, roundCountMixin],
  mounted() {
    this.coverHeight = this.$parent.$refs.cover.clientHeight;
  },
  data() {
    return {
      backgroundImage: '',
      coverHeight: 0
    };
  },
  props: {
    item: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  computed: {
    ...mapGetters(['cookie']),

    getDate() {
      return function(date) {
        let time = fmtDate(date / 1000);
        return `${time.year}-${time.month}-${time.date}`;
      };
    }
  },
  methods: {
    multiSelect() {
      this.$emit('multiSelect');
    },
    noFunc() {
      this.$toast.show('暂时还不支持哦', 1000);
    },
    share() {
      let msg = `分享${this.item.artist.name}的专辑 ${'\u00AB' +
        this.item.name +
        '\u00BB'} https://syhua4.github.io/pear-music-app/#/album/${this.item.id}`;
      this.$copyText(msg).then(
        () => {
          this.$toast.show('复制链接成功', 1000);
        },
        () => {
          this.$toast.show('复制链接失败, 请重试', 1000);
        }
      );
    }
  },
  watch: {
    item: {
      handler(val) {
        if (Object.keys(val).length > 0) {
          this.backgroundImage = `url(${this.fmtUrl(val.blurPicUrl)})`;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin.scss';
.album-display {
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
      }
      .display-content-wrapper {
        display: flex;
        flex-direction: column;
        height: calc((var(--height) - 100px) * 0.55);
        @include font_color_sub();
        .title {
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
        .desc,
        .pub-time {
          display: flex;
          margin-top: auto;
          align-items: center;
          @include font_size($s);
        }
        .desc-content {
          @include clamp(1);
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
}
</style>
