<template>
  <div class="program">
    <nav-bar class="nav">
      <i class="iconfont icon-back" slot="left" @click="goBack" />
      <div slot="center">电台</div>
    </nav-bar>
    <scroll-view height="25%" ref="scrollView">
      <div
        slot="cover"
        :style="[
          { backgroundImage: `url(${fmtUrl(result.picUrl)})`, '--height': coverHeight + 'px' }
        ]"
        class="cover"
      >
        <div class="cover-text">
          <div class="dj-name">{{ result.name }}</div>
          <div class="dj-sub">{{ result.subCount | round }}人订阅</div>
        </div>
      </div>

      <div class="tabbar" slot="tab">
        <span
          v-for="(item, index) in tabbar"
          :key="item"
          :class="{ active: index === activeTab }"
          @click.stop="tabClick(index)"
          >{{ item }}</span
        >
      </div>

      <div class="component-wrapper" slot="component">
        <loading :isShow="loading" />
        <component
          :is="currentComponent"
          v-bind="currentProp"
          @playProgram="playProgram"
          @contentLoaded="contentLoaded"
        />
      </div>
    </scroll-view>
  </div>
</template>

<script>
import ProgramDesc from './RadioProgramDesc';
import ProgramList from './RadioProgramList';
import { roundCountMixin, getTracksMixin, getUrlMixin, loadingMixin } from 'common/mixin';
import { getRadioDetail, getProgramList } from 'networks/radio';
import NavBar from 'components/common/NavBar/NavBar';
import ScrollView from '../../../components/content/ScrollView.vue';

import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'RadioProgram',
  components: { NavBar, ScrollView },
  mixins: [roundCountMixin, getTracksMixin, getUrlMixin, loadingMixin],
  data() {
    return {
      result: [],
      programs: [],
      tracks: [],
      tabbar: ['详情', '节目'],
      activeTab: 1,
      coverHeight: 0
    };
  },
  created() {
    let rid = this.$route.params.id;
    getRadioDetail(rid).then(res => {
      this.result = res.djRadio;
    });
    getProgramList(rid).then(res => {
      this.programs = res.programs;
      res.programs.map(song => {
        this.tracks.push({
          id: song.mainSong.id,
          name: song.name,
          al: { picUrl: song.coverUrl },
          ar: [{ name: song.radio.name }]
        });
      });
    });
  },
  mounted() {
    this.coverHeight = this.$refs.scrollView.$refs.cover.clientHeight;
  },
  computed: {
    ...mapGetters(['isLoading']),
    currentComponent() {
      return this.activeTab === 1 ? ProgramList : ProgramDesc;
    },
    currentProp() {
      return this.activeTab === 1 ? { list: this.programs } : { results: this.result };
    }
  },
  methods: {
    ...mapActions(['setPlayList', 'setShowPlayer', 'setCurrentIndex', 'setIsLoading']),
    contentLoaded() {
      this.loading = false;
    },
    goBack() {
      this.$router.go(-1);
    },
    playProgram(index) {
      if (!this.isLoading) {
        this.setIsLoading(true);
      }
      this.setPlayList(this.tracks);
      this.setCurrentIndex(index);
      this.setShowPlayer(true);
    },
    tabClick(index) {
      if (this.loading) {
        this.$toast.show('正在努力加载哦', 1000);
      } else {
        this.activeTab = index;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin.scss';
.program {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 98px;
  z-index: 1;
  background-color: #fff;
  .nav {
    position: relative;
    color: #fff;
    background-color: transparent;
    z-index: 2;
    .icon-back {
      @include font_size($icon_ms);
    }
  }
  .cover {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: calc(var(--height) - 100px);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    z-index: 1;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #000;
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0) 25%);
    }
    .cover-text {
      position: absolute;
      bottom: 15%;
      left: 20px;
      color: #fff;
    }
    .dj-sub {
      @include font_size($ms);
    }
  }
  .tabbar {
    position: absolute;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    @include font_size($ms);
    z-index: 1;
    .active {
      border-bottom: 3px solid;
      border-color: $font-active-color-theme;
      @include font_active_color();
    }
  }
}
</style>
