<template>
  <div class="scroll-wrapper" ref="wrapper">
    <div class="scroll-content">
      <slot />
    </div>
  </div>
</template>

<script>
import IScroll from 'iscroll/build/iscroll-probe'

export default {
  name: 'Scroll',
  data() {
    return {
      scrollOptions: {
        mouseWheel: true,
        scrollbars: false,
        // probeType: 3,
        // 解决拖拽卡顿问题
        scrollX: false,
        scrollY: true,
        disablePointer: true,
        disableTouch: false,
        disableMouse: true
      }
    }
  },
  props: {
    offsetTop: {
      type: Number,
      default: 0
    },
    options: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    this.iscroll = new IScroll(
      this.$refs.wrapper,
      Object.assign({}, this.scrollOptions, this.options)
    )

    if (this.iscroll.options.probeType >= 2) {
      this.iscroll.on('scroll', () => {
        this.$emit('scrollPosition', this.iscroll.y)
      })
    }
    // 1.创建观察者对象
    let observer = new MutationObserver(() => {
      this.iscroll.refresh()
    })

    // 2.告诉 observer 需要观察的内容
    let config = {
      childList: true,
      subtree: true,
      attributeFilter: ['height', 'offsetHeight']
    }

    // 3.告诉 observer 需要观察哪个 dom 元素, 和观察的内容 (第二步)
    observer.observe(this.$refs.wrapper, config)
  },
  methods: {
    updateScroller(offsetTop) {
      let modified = false
      this.iscroll.on('scrollStart', () => {
        if (!modified && this.iscroll.maxScrollY !== 0) {
          modified = true
          this.iscroll.maxScrollY -= offsetTop
        }
      })
      // this.$nextTick(function() {
      //   this.iscroll.maxScrollY -= offsetTop
      //   console.log(this.iscroll.maxScrollY)
      // })
      // setTimeout(() => {
      //   console.log(this.iscroll.maxScrollY)
      //   this.iscroll.maxScrollY -= offsetTop
      //   console.log(this.iscroll.maxScrollY)
      // }, 500)

      // this.iscroll.on('scroll', () => {
      //   if (this.iscroll.maxScrollY !== 0) {
      //     console.log(this.iscroll.maxScrollY)
      //     return (this.iscroll.maxScrollY -= offsetTop)
      //   }
      // })
    },
    refresh() {
      this.iscroll && this.iscroll.refresh && this.iscroll.refresh()
      console.log('refreshed')
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-wrapper {
  width: 100%;
  // height: 100%;
  // position: relative;
}
</style>
