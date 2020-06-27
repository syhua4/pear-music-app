<template>
  <div class="scroll-wrapper" ref="wrapper">
    <div class="scroll-content">
      <slot />
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
  name: 'Scroll',
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
      scroll: null
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      pullUpload: this.pullUpload,
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
        this.$emit('pullUpLoad');
      });
    }

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
    refresh() {
      console.log('---- refresh ----');
      this.scroll && this.scroll.refresh && this.scroll.refresh();
    },
    getYPosition() {
      return this.scroll ? this.scroll.y : 0;
    }
    // updateScroller() {
    //   this.scroll.on('scrollEnd', () => {
    //     this.refresh()
    //     console.log(this.scroll.maxScrollY)

    //     this.scroll.maxScrollY = -17612
    //     console.log(this.scroll.maxScrollY)
    //   })
    // }
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
    }
  }
};
</script>

<style lang="scss" scoped>
.scroll-wrapper {
  width: 100%;
}
</style>
