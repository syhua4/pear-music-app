<template>
  <div class="recommend-tabnav">
    <swiper :options="options">
      <swiper-item class="slide">
        <router-link class="tabnav" to="/recommend/songs">
          <div class="tabnav-icon">
            <span class="date">{{ date }}</span>
            <i class="iconfont icon-calender" />
          </div>
          <span class="tabnav-text">每日推荐</span>
        </router-link>
      </swiper-item>
      <swiper-item class="slide">
        <router-link class="tabnav" to="/playlists">
          <i class="iconfont icon-playlist1" />
          <span class="tabnav-text">歌单</span>
        </router-link>
      </swiper-item>
      <swiper-item class="slide">
        <router-link class="tabnav" to="/toplist">
          <i class="iconfont icon-top" />
          <span class="tabnav-text">排行榜</span>
        </router-link>
      </swiper-item>
      <swiper-item class="slide">
        <a class="tabnav" @click="noFunc">
          <i class="iconfont icon-stream" />
          <span class="tabnav-text">直播</span>
        </a>
      </swiper-item>
      <swiper-item class="slide">
        <a class="tabnav" @click="noFunc">
          <i class="iconfont icon-digi-album" />
          <span class="tabnav-text">数字专辑</span>
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/Slider/Slider.js';

export default {
  name: 'RecommendTabNav',
  components: { Swiper, SwiperItem },
  data() {
    return {
      options: {
        autoplay: '',
        slidesPerView: '4.5',
        freeMode: true
      }
    };
  },
  computed: {
    date: function() {
      return new Date().getDate();
    }
  },
  methods: {
    noFunc() {
      this.$toast.show('功能还没完成哦', 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin';
@import 'assets/css/variable';

.recommend-tabnav {
  margin-top: 30px;
  margin-left: 20px;
  .tabnav {
    margin: 0;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: space-evenly;
    @include font_size($s);
    .tabnav-icon {
      position: relative;
      .date {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -35%);
        @include font_size($ms);
        @include font_active_color();
        display: block;
      }
    }

    i::before {
      @include font_size($icon_m);
      display: inline-block;
      padding: 20px;
      border-radius: 50%;
      background: $gradient-color-theme;
      border: 1px solid red;
      color: #fff;
    }
    .tabnav-text {
      margin-top: 12px;
      @include font_size($s);
      @include font_color();
    }
  }
}
</style>
