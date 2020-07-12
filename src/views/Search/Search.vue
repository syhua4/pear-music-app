<template>
  <div class="search">
    <nav-bar class="nav">
      <i slot="left" @click="goBack" class="iconfont icon-back" />

      <div slot="center" class="bar">
        <search-bar
          ref="searchBar"
          @submit="submit"
          @suggest="suggest"
          @click.native="clearSearch"
        />
      </div>
    </nav-bar>
    <component :is="currentComponent" v-bind="currentProps" @submit="submit" />
  </div>
</template>

<script>
import NavBar from 'components/common/NavBar/NavBar';
import SearchBar from 'components/content/SearchBar';

import SearchKeywords from './ChildComp/SearchKeywords';
import SearchSuggest from './ChildComp/SearchSuggest';

import { getKeywords, getSuggest } from 'networks/search';
import SearchResult from '../SearchResult/SearchResult';

export default {
  name: 'Search',
  components: { NavBar, SearchBar, SearchKeywords },
  data() {
    return {
      prevPath: '',
      query: '',
      keywords: [],
      suggests: [],
      goSearch: false
    };
  },
  methods: {
    clearSearch() {
      this.query = '';
      this.goSearch = false;
    },
    goBack() {
      this.$router.push('/recommend');
    },
    submit(query) {
      this.query = query;
      this.goSearch = true;
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
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name === 'playlist') {
        vm.query = from.meta.prevQuery;
        vm.goSearch = true;
      }
    });
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === 'playlist') {
      to.meta.prevQuery = this.query;
    }
    next();
  },
  created() {
    getKeywords().then(res => (this.keywords = res.data));
  },
  computed: {
    currentComponent() {
      let curComp;
      this.suggests && this.suggests.length !== 0
        ? (curComp = SearchSuggest)
        : (curComp = SearchKeywords);

      if (this.goSearch) {
        curComp = SearchResult;
      }
      return curComp;
    },
    currentProps() {
      let curProps;
      this.suggests && this.suggests.length !== 0
        ? (curProps = { suggests: this.suggests, input: this.query })
        : (curProps = { keywords: this.keywords });
      if (this.goSearch) {
        curProps = { query: this.query };
      }
      return curProps;
    }
  },
  watch: {
    query: {
      immediate: true,
      handler(val) {
        if (val) {
          this.$refs.searchBar.query = val;
        }
      }
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
    .icon-back {
      color: #fff;
      @include font_size($icon_ms);
    }
  }

  .search-word {
    margin: 0 24px;
  }
}
</style>
