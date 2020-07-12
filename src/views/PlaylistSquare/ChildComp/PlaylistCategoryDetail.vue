<template>
  <div class="cat">
    <loading :isShow="loading" v-if="loading" />
    <scroll v-else :pullUpload="true" @pullUpload="loadMore" ref="scroll">
      <grid-view :results="results" />
    </scroll>
  </div>
</template>

<script>
import GridView from './PlaylistGridView';

import Scroll from 'components/common/Scroll/Scroll';

import { getPlaylists } from 'networks/recommend';
import { loadingMixin } from 'common/mixin';
export default {
  name: 'PlaylistCategoryDetail',
  components: { GridView, Scroll },
  mixins: [loadingMixin],
  data() {
    return {
      results: []
    };
  },
  props: {
    cat: {
      type: String,
      default: '',
      required: true
    }
  },
  async created() {
    await getPlaylists(encodeURIComponent(this.cat)).then(res => {
      this.results = res.playlists;
    });
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async loadMore() {
      let name = this.cat;
      let offset = this.results.length;
      await getPlaylists(name, 30, offset).then(res => {
        if (res.more && res.playlists.length) {
          // console.log(...res.playlists);
          res.playlists.map(item => {
            this.results.push(item);
          });
          // this.result.push(...res.playlists);
          console.log(this.results);
          console.log('数据请求完毕');
        } else {
          this.$refs.scroll.loading = false;
          console.log('没有数据了');
        }
      });
      this.$refs.scroll.finishPullUp();
    }
  },
  watch: {
    results: {
      deep: true,
      handler() {
        this.$nextTick(function() {
          this.loading = false;
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin.scss';
.cat {
  .scroll-wrapper {
    position: fixed;
    top: 110px;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
