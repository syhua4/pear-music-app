<template>
  <div class="search">
    <nav-bar class="nav">
      <div slot="center" class="bar">
        <search-bar ref="searchBar" @submit="submit" @suggest="suggest" />
      </div>
      <span slot="right" @click="goBack">取消</span>
    </nav-bar>
    <scroll class="scroll">
      <component :is="currentComponent" v-bind="currentProps"></component>
    </scroll>
  </div>
</template>

<script>
import NavBar from 'components/common/NavBar/NavBar';
import Scroll from 'components/common/Scroll/Scroll';
import SearchBar from 'components/content/SearchBar';

import SearchKeywords from './ChildComp/SearchKeywords';
import SearchSuggest from './ChildComp/SearchSuggest';

import { getKeywords, getSuggest } from 'networks/search';

export default {
  name: 'Search',
  components: { NavBar, Scroll, SearchBar, SearchKeywords },
  data() {
    return {
      prevPath: '',
      query: '',
      keywords: [],
      suggests: []
    };
  },
  methods: {
    goBack() {
      this.$router.push({ name: this.prevPath });
    },
    submit(query) {
      this.$router.replace({ name: 'searchResult', query: { q: query } });
    },
    suggest(query) {
      this.query = query;
      if (query) {
        getSuggest(query).then(res => (this.suggests = res.result.allMatch));
      } else {
        this.suggests = [];
      }
    }
  },
  created() {
    getKeywords().then(res => (this.keywords = res.data));
  },
  mounted() {
    // let input = this.$refs.searchBar.$refs.query;
    // input.focus();
  },
  beforeRouteEnter(to, from, next) {
    console.log(to, from);
    next(vm => {
      vm.prevPath = to.meta.prevPath;
      if (from.meta.index === 0) {
        to.meta.prevPath = from.name;
      } else if (from.name === 'searchResult') {
        vm.$refs.searchBar.query = to.meta.prevQuery;
      }
    });
  },
  computed: {
    currentComponent() {
      let curComp;
      this.suggests && this.suggests.length !== 0
        ? (curComp = SearchSuggest)
        : (curComp = SearchKeywords);
      return curComp;
    },
    currentProps() {
      return this.suggests && this.suggests.length !== 0
        ? { suggests: this.suggests, input: this.query }
        : { keywords: this.keywords };
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin';

.search {
  .nav {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    .bar {
      flex: 1;
      display: flex;
      align-items: center;
    }
    span {
      color: #fff;
      @include font_size($ms);
    }
  }
  .scroll {
    position: fixed;
    top: 100px;
    bottom: 100px;
    left: 0;
    right: 0;
  }
  .search-word {
    margin: 0 24px;
  }
}
</style>
