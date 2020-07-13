<template>
  <div class="radio-recommend" v-if="results && results.length">
    <div class="wrapper" v-for="result in results" :key="result.categoryId">
      <div class="header" @click.stop="toCategory(result)">
        {{ result.categoryName }}
        <i class="iconfont icon-next" />
      </div>
      <div class="recommend-wrapper">
        <div
          class="radio-wrapper"
          v-for="radio in result.radios"
          :key="radio.id"
          @click.stop="toProgram(radio.id)"
        >
          <div class="img-wrapper">
            <img v-lazy="radio.picUrl" />
            <span>{{ radio.name }}</span>
          </div>
          <span class="radio-name">{{ radio.rcmdText }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RadioRecommend',
  props: {
    results: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    toCategory(result) {
      let catInfo = { name: result.categoryName, id: result.categoryId };
      this.$router.push({ name: 'radio-category', params: { catInfo } });
    },
    toProgram(id) {
      this.$router.push(`/radio/program/${id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin.scss';
.radio-recommend {
  margin: 0 8px 0 24px;
  .wrapper {
    display: flex;
    flex-direction: column;
    .header {
      display: flex;
      align-items: center;
      padding: 30px 0 20px;
      @include font_size($m);
      .icon-next {
        margin-left: 10px;
        @include font_size($icon_s);
      }
    }
    .recommend-wrapper {
      display: flex;
      padding-bottom: 30px;
      .radio-wrapper {
        display: flex;
        width: calc((100% - 16px * 3) / 3);
        height: same-as-width;
        flex-direction: column;
        margin-right: 16px;
        @include font_size($ms);
        .img-wrapper {
          position: relative;
          border-radius: 10px;
          overflow: hidden;
          &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 2;
            background: linear-gradient(to top, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0) 30%);
          }
          img {
            width: 100%;
            object-fit: cover;
          }
          span {
            position: absolute;
            bottom: 10px;
            left: 5px;
            color: #fff;
            @include font_size($s);
            @include clamp(1);
          }
        }
        .radio-name {
          padding-top: 10px;
          @include clamp(2);
        }
      }
    }
  }
}
</style>
