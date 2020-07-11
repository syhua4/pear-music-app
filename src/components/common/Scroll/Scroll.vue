<template>
  <div class="scroll-wrapper" ref="wrapper">
    <div class="scroll-content">
      <slot />
      <loading :isShow="loading" v-if="loading && pullUpload" />
    </div>
  </div>
</template>

<script>
import { loadingMixin } from 'common/mixin';

import BScroll from 'better-scroll';
export default {
  name: 'Scroll',
  mixins: [loadingMixin],
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpload: {
      type: Boolean,
      default: false
    },
    refreshDelay: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      scroll: null,
      noTip: false
    };
  },
  mounted() {
    this.initBscroll();
    let observer = new MutationObserver(() => {
      this.refresh();
    });

    let config = {
      childList: true,
      subtree: true,
      attributeFilter: ['height', 'offsetHeight']
    };

    observer.observe(this.$refs.wrapper, config);
  },
  methods: {
    initBscroll() {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          pullUpLoad: this.pullUpload && { threshold: -50 },
          click: true,
          observeDOM: true,
          useTransition: false
        });

        if (this.probeType >= 2) {
          this.scroll.on('scroll', position => {
            this.$emit('scrolling', position);
          });
        }

        if (this.pullUpload) {
          this.scroll.on('pullingUp', () => {
            this.$emit('pullUpload');
          });
        }

        if (!this.scroll.maxScrollY && this.pullUpload) {
          this.loading = false;
        } else if (!this.scroll.maxScrollY) {
          this.refresh();
        }
      });
    },
    refresh() {
      console.log('---- refresh ----');
      this.scroll && this.scroll.refresh && this.scroll.refresh();
    },
    getYPosition() {
      return this.scroll ? this.scroll.y : 0;
    },
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp();
    }
  },
  watch: {
    refreshDelay: {
      immediate: true,
      handler(val) {
        if (val !== 0) {
          setTimeout(() => {
            this.refresh();
          }, val);
        }
      }
    },
    pullUpload: {
      handler(val) {
        console.log('exec pullupload');
        if (val) {
          this.initBscroll();
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin';

.scroll-wrapper {
  width: 100%;
  .tip {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 20px;
    @include font_size($s);
    @include font_color();
  }
}
</style>
