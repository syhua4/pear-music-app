<template>
  <div class="search-tabnav">
    <swiper :options="options">
      <swiper-item class="slide" v-for="(title, index) in titles" :key="index">
        <a class="tabnav" :class="{ active: index === tabIndex }" @click="tabClick(index)">
          <span class="tabnav-text">{{ title }}</span>
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/Slider/Slider.js';

export default {
  name: 'SearchTabNav',
  components: { Swiper, SwiperItem },
  props: {
    titles: {
      type: Array,
      default: () => [],
      required: true
    },
    tabIndex: {
      type: Number,
      default: 0,
      required: true
    }
  },
  data() {
    return {
      options: {
        autoplay: '',
        slidesPerView: '5.3',
        freeMode: true
      }
    };
  },
  methods: {
    tabClick(index) {
      this.$emit('tabClick', index);
    }
  },
  computed: {
    isActive() {
      return function(index) {
        console.log(index);

        return index;
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin';
@import 'assets/css/variable';

.search-tabnav {
  color: #fff;
  height: 50px;
  margin-top: -1px;
  position: relative;
  z-index: 1;
  @include bg_color();

  .tabnav {
    color: #fff;
    height: 49px;
    margin: 0;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: space-evenly;
    @include font_size($s);
    &.active::after {
      position: absolute;
      content: '';
      border: 2px solid white;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 50%;
    }
    .tabnav-text {
      @include font_size($s);
      // padding-bottom: 20px;
    }
  }
}
</style>
