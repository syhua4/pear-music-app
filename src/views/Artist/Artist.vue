<template>
  <div class="artist">
    <router-view />
    <nav-bar class="nav">
      <i class="iconfont icon-back" slot="left" @click="goBack" />
      <div slot="center">歌手分类</div>
    </nav-bar>
    <div class="filter-wrapper">
      <div class="filter-area">
        <span
          class="area"
          v-for="(item, index) in areas"
          :key="item.title"
          :class="{ active: item.area === filter[1] }"
          @click="areaFilter(index)"
          >{{ item.title }}</span
        >
      </div>
      <div class="filter-type">
        <span
          class="type"
          v-for="(item, index) in types"
          :key="item.title"
          :class="{ active: item.type === filter[0] }"
          @click="typeFilter(index)"
          >{{ item.title }}</span
        >
      </div>
    </div>
    <div class="header">热门歌手</div>
    <loading :isShow="loading" v-if="loading" />
    <scroll v-else :pullUpload="true" @pullUpload="loadMore" ref="scroll">
      <div
        class="artist-wrapper"
        v-for="artist in artists"
        :key="artist.id"
        @click="artistClick(artist)"
      >
        <img v-lazy="fmtUrl(artist.picUrl)" />
        <span class="name">{{ artist.name }}</span>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/Scroll/Scroll';
import NavBar from 'components/common/NavBar/NavBar';

import { loadingMixin, getUrlMixin } from 'common/mixin';
import { getArtistList } from 'networks/artist';
export default {
  name: 'Artist',
  components: { NavBar, Scroll },
  mixins: [loadingMixin, getUrlMixin],
  created() {
    getArtistList().then(res => {
      this.artists = res.artists;
    });
  },
  data() {
    return {
      artists: [],
      types: [
        { type: 1, title: '男歌手' },
        { type: 2, title: '女歌手' },
        { type: 3, title: '乐队/组合' }
      ],
      areas: [
        { area: 7, title: '华语' },
        { area: 96, title: '欧美' },
        { area: 8, title: '日本' },
        { area: 16, title: '韩国' },
        { area: 0, title: '其他' }
      ],
      filter: [-1, -1]
    };
  },
  methods: {
    areaFilter(index) {
      if (this.filter.area !== this.areas[index]) {
        this.$set(this.filter, 1, this.areas[index].area);
      }
    },
    artistClick(artist) {
      console.log(artist);
      this.$router.push({
        name: 'artist-info',
        params: { id: artist.id, uid: artist.accountId, bgUrl: artist.picUrl }
      });
    },
    goBack() {
      this.$router.push('/recommend');
    },
    typeFilter(index) {
      if (this.filter.type !== this.types[index]) {
        this.$set(this.filter, 0, this.types[index].type);
      }
    },
    async loadMore() {
      let offset = this.artists.length;
      await getArtistList(this.filter[0], this.filter[1], offset).then(res => {
        if (res.more || res.artists.length) {
          this.artists.push(...res.artists);
          console.log(this.artists);
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
    filter: {
      deep: true,
      handler() {
        console.log(this.filter);
        this.loading = true;

        getArtistList(this.filter[0], this.filter[1]).then(res => {
          this.artists = res.artists;
        });
      }
    },
    artists: {
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
.artist {
  .nav {
    position: relative;
    z-index: 1;
    color: #fff;
    .icon-back {
      @include font_size($icon_ms);
    }
  }
  .filter-wrapper {
    position: relative;
    z-index: 1;
    height: 150px;
    padding: 0 24px 20px;
    background-color: #fff;
    @include font_size($ms);
    span {
      display: inline-block;
      padding-top: 30px;
      margin-right: 50px;
      &.active {
        @include font_active_color();
      }
    }
  }
  .header {
    position: relative;
    z-index: 1;
    height: 35px;
    line-height: 35px;
    padding: 0 24px;
    background-color: #eee;
    @include font_color();
    @include font_size($s);
  }
  .scroll-wrapper {
    position: fixed;
    top: 305px;
    bottom: 100px;
    left: 0;
    right: 0;

    .artist-wrapper {
      display: flex;
      align-items: center;
      padding: 16px 24px;
      @include font_size($ms);
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 20px;
      }
    }
  }
}
</style>
