<template>
  <div class="search-suggest">
    <div class="search-input" @click="submit(input)">
      搜索
      <i class="iconfont icon-open-quote" />
      {{ input }}
      <i class="iconfont icon-close-quote" />
    </div>
    <div
      v-for="(suggest, index) in suggests"
      :key="index"
      class="wrapper"
      @click="submit(suggest.keyword)"
    >
      <i class="iconfont icon-search" />
      <span class="result">{{ suggest.keyword }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchSuggest',
  props: {
    input: {
      type: String,
      default: ''
    },
    suggests: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    submit(query) {
      this.$router.push({ name: 'searchResult', query: { q: query } });
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin.scss';

.search-suggest {
  margin: 0 24px;
  @include font_size($ms);
  div,
  span {
    height: 80px;
    line-height: 80px;
  }
  .search-input {
    color: #4d7daf;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;

    .icon-open-quote,
    .icon-close-quote {
      @include font_size($icon_s);
    }
  }
  .wrapper {
    display: flex;

    span {
      width: 100%;
      display: inline-block;
      border-bottom: 1px solid #eee;
      @include nowrap();
    }
    .icon-search {
      height: 80px;
      line-height: 80px;
      @include font_size($icon_s);
      margin-right: 20px;
    }
  }
}
</style>
