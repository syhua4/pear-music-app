<template>
  <scroll>
    <div class="hot-key" v-if="keywords.length !== 0">
      <div class="keyword-header">热搜榜</div>
      <div
        class="keyword-wrapper"
        v-for="(keyword, index) in keywords"
        :key="keyword.searchWord"
        @click="submit(keyword.searchWord)"
      >
        <div class="keyword-rank">{{ index + 1 }}</div>
        <div class="keyword-summary">
          <div class="keyword-title-wrapper">
            <div class="keyword-title">{{ keyword.searchWord }}</div>
            <img :src="keyword.iconUrl" />
          </div>
          <div class="keyword-desc">{{ keyword.content }}</div>
        </div>
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'components/common/Scroll/Scroll';

export default {
  name: 'SearchKeywords',
  components: { Scroll },
  props: {
    keywords: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    submit(query) {
      this.$emit('submit', query);
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin.scss';
.scroll-wrapper {
  position: fixed;
  top: 100px;
  bottom: 100px;
  left: 0;
  right: 0;

  .hot-key {
    margin: 0 24px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    @include font_size($ms);
    .keyword-header {
      margin: 20px 0;
      width: 100%;
    }
    .keyword-wrapper {
      width: 45%;
      height: 80px;
      margin-bottom: 30px;
      display: flex;
      align-items: center;

      .keyword-rank {
        width: 32px;
        font-weight: 700;
        margin-right: 10px;
        color: #999;
      }
      .keyword-summary {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .keyword-title-wrapper {
          display: flex;
          height: 40px;
          line-height: 40px;
          .keyword-title {
            color: #000;
            margin-right: 16px;
            @include clamp(1);
          }
          img {
            height: 32px;
            object-fit: contain;
          }
        }
        .keyword-desc {
          text-align: left;
          @include font_size($s);
          @include clamp(1);
          @include font_color();
        }
      }
    }
    .keyword-wrapper:nth-child(-n + 5) .keyword-rank {
      @include font_active_color();
    }
  }
}
</style>
