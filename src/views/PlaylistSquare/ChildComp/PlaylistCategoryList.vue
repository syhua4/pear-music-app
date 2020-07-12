<template>
  <div class="category-list">
    <scroll>
      <div class="category" v-for="(cat, i) in categories" :key="cat + i">
        <div class="cat-name">{{ cat }}</div>
        <div
          class="sub-category"
          v-for="(sub, j) in sub_categories[i]"
          :key="sub + j"
          @click.stop="toCategory(sub)"
        >
          {{ sub }}
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/Scroll/Scroll';

import { getPlaylistCategory } from 'networks/recommend';
export default {
  name: 'PlaylistCategoryList',
  components: { Scroll },
  data() {
    return {
      categories: [],
      sub_categories: []
    };
  },
  created() {
    getPlaylistCategory().then(res => {
      this.categories = Object.values(res.categories);
      this.categories.map(() => {
        this.sub_categories.push([]);
      });
      res.sub.map(item => {
        let pattern = /[&/]+/;
        if (!pattern.test(item.name)) {
          this.sub_categories[item.category].push(item.name);
        }
      });
    });
  },
  methods: {
    toCategory(name) {
      this.$emit('toCategory', name);
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin.scss';
.category-list {
  .scroll-wrapper {
    position: fixed;
    top: 110px;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .category {
    margin: 24px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 48px;
    &::after {
      content: '';
      flex: calc((100% - 32px * 4) / 4);
    }
    .cat-name {
      font-weight: 500;
      width: 100%;
      @include font_size($ms);
    }
    .sub-category {
      width: calc((100% - 32px * 4) / 4);
      background-color: #eee;
      border-radius: 40px;
      text-align: center;
      margin: 20px 16px 8px 0;
      padding: 16px 8px;
      @include font_size($s);
    }
  }
}
</style>
