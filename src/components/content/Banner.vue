<template>
  <div class="banner">
    <swiper v-if="banners && banners.length > 0" :options="options" ref="banner">
      <swiper-item v-for="banner in banners" :key="banner.id">
        <a :href="banner.url">
          <img :src="banner.pic" class="banner-img" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/Slider/Slider.js'
export default {
  name: 'Banner',
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    banners: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data() {
    return {
      options: {
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true
        }
      }
    }
  },
  activated() {
    if (this.$refs.banner) {
      this.$refs.banner.$refs.mySwiper.$swiper.autoplay.start()
    }
  },
  deactivated() {
    this.$refs.banner.$refs.mySwiper.$swiper.autoplay.stop()
  }
}
</script>

<style lang="scss" scoped>
.banner {
  img {
    width: 100%;
    object-fit: cover;
  }
}
</style>
