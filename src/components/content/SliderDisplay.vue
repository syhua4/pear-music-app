<template>
  <div class="slide-display">
    <div class="header">
      <div class="title">{{ title }}</div>
      <slot name="more"></slot>
    </div>
    <swiper v-if="items && items.length > 0" :options="options" ref="banner">
      <swiper-item v-for="(item, index) in items" :key="item.id">
        <a class="swiper-item-wrapper" v-if="!isSong" @click="itemClick(item.id)">
          <img v-lazy="fmtUrl(item.coverImgUrl)" class="swiper-item-img" />
          <span class="swiper-item-text">{{ item.name }}</span>
          <span class="swiper-item-playcount" v-if="item.playCount">
            <i class="iconfont icon-play-s" />
            {{ item.playCount | round }}
          </span>
        </a>
        <a class="swiper-item-wrapper" v-if="isSong" @click="play(index)">
          <img v-lazy="fmtUrl(item.al.picUrl)" class="swiper-item-img" />

          <div class="swiper-item-desc">
            <span class="swiper-item-text">{{ item.name }}</span>
            <div class="swiper-item-author" v-if="item.ar">
              <span>{{ artists(item.ar) }}</span>
            </div>
          </div>
          <i
            v-if="item.ar && item.al"
            class="iconfont"
            :class="changeIcon ? changeIcon : 'icon-play'"
          />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/Slider/Slider.js';

import {
  roundCountMixin,
  getArtistsMixin,
  getUrlMixin,
  playSongMixin,
  getTracksMixin
} from 'common/mixin';
import { getTrack } from 'networks/recommend';
export default {
  name: 'SliderDisplay',
  mixins: [roundCountMixin, getArtistsMixin, getUrlMixin, playSongMixin, getTracksMixin],
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    },
    isSong: {
      type: Boolean,
      default: false
    },
    changeIcon: {
      type: String,
      default: ''
    },
    sliderOption: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      songClicked: false,
      options: this.isSong
        ? Object.assign(
            {
              freemode: true,
              autoplay: '',
              slidesPerView: 1.1,
              slidesPerColumn: 3
            },
            this.sliderOption
          )
        : { freemode: true, autoplay: '', slidesPerView: 3.3, spaceBetween: 30 }
    };
  },
  methods: {
    itemClick(id) {
      this.$emit('itemClick', id);
    },
    async play(index) {
      if (this.$parent.$parent.historyList) {
        let ids = this.getTrackIds(this.items);
        await getTrack(ids).then(res => {
          this.playSong(res.songs, index);
        });
      } else {
        this.playSong(this.items, index);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin';
@import 'assets/css/variable';

.slide-display {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include font_size($s);
    @include font_color();
    .title,
    .more {
      margin: 50px 20px 0 0;
    }
    .title {
      @include font_size($m);
      color: #333;
      font-weight: 500;
    }
    .more {
      padding: 5px 20px;
      border: 1px solid #ddd;
      border-radius: 25px;
      color: #666;
    }
  }
  .swiper-slide {
    margin-top: 30px !important;
    // margin-right: 30px !important;
    position: relative;
    .swiper-item-playcount {
      position: absolute;
      top: 15px;
      right: 20px;
      color: #fff;
      line-height: $s;
      @include font_size($s);
    }
    .icon-play-s {
      margin-right: -8px;
      @include font_size($ms);
    }
    .icon-play {
      margin-left: auto;
      margin-right: 30px;
      @include font_active_color();
      @include font_size($icon_m);
    }
  }
}
</style>
