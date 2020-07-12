<template>
  <div class="playlist-carousel">
    <swiper :options="options">
      <swiper-item v-for="item in results" :key="item.id">
        <div class="wrapper" @click="goPlaylist(item.id)">
          <div class="img-wrapper">
            <img :src="fmtUrl(item.coverImgUrl)" />
            <i class="iconfont icon-play-btn" />
          </div>
          <div class="title">{{ item.name }}</div>
        </div>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/Slider/Slider.js';
import { getUrlMixin } from 'common/mixin';

export default {
  name: 'PlaylistSlider',
  components: { Swiper, SwiperItem },
  mixins: [getUrlMixin],
  data() {
    return {
      options: {
        autoplay: '',
        effect: 'coverflow',
        loop: true,
        slidesPerView: 3,
        centeredSlides: true,
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 1
        }
      }
    };
  },
  props: {
    results: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    goPlaylist(id) {
      console.log('111');
      this.$router.push(`/playlists/${id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin.scss';

.playlist-carousel {
  margin: 0 24px;
  padding-top: 24px;
  .swiper-container {
    height: 450px;
  }
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: left;
    font-weight: bold;
    // font-size: $font-size-huge * 2;
    background-color: #fff;
    background-position: center;
    background-size: cover;
    // color: $white;
    ::v-deep.swiper-slide-shadow-left,
    ::v-deep.swiper-slide-shadow-right {
      background-image: none;
    }

    .wrapper {
      height: 400px;
      background-color: #fff;
      border-radius: 15px;
      @include font_size($s);
      box-shadow: 0 0 8px 3px rgba($color: #000, $alpha: 0.2);
      .img-wrapper {
        position: relative;
        img {
          border-radius: 15px 15px 0 0;
          height: 300px;
        }
        .icon-play-btn {
          position: absolute;
          right: 15px;
          bottom: 15px;
          padding: 10px 8px 10px 14px;
          border-radius: 50%;
          background-color: rgba($color: #fff, $alpha: 0.7);
          @include font_size($icon_s);
          @include font_active_color();
        }
      }

      .title {
        background-color: #fff;
        border-radius: 0 0 15px 15px;
        padding: 10px;
        font-weight: 400;
        color: #666;
        @include clamp(2);
      }
    }
    &.swiper-slide-next .wrapper,
    &.swiper-slide-prev .wrapper,
    &.swiper-slide-duplicate-next .wrapper,
    &.swiper-slide-duplicate-prev .wrapper {
      position: relative;
      &::after {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        content: '';
        background-color: #fff;
        opacity: 0.5;
      }
    }
  }
}
</style>
