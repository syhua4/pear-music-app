<template>
  <div class="program">
    <nav-bar class="nav">
      <i class="iconfont icon-back" slot="left" @click="goBack" />
      <div slot="center">电台</div>
      <i class="iconfont icon-share" slot="right" @click.stop="shareRadio" />
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
          @showMore="showMore"
        />
      </div>
    </scroll-view>
    <transition name="slide">
      <popup
        v-show="showMoreOption"
        @togglePopUp="togglePopUp"
        :popUpHeight="-1"
        v-if="programInfo && Object.keys(programInfo).length"
      >
        <div class="option-header">电台节目: {{ programInfo.name }}</div>
        <div class="option-wrapper">
          <div class="comment" @click.stop="noFunc">
            <i class="iconfont icon-comment" />
            <span>评论 {{ '(' + programInfo.commentCount + ')' }}</span>
          </div>
          <div class="share" @click.stop="shareProgram">
            <i class="iconfont icon-share" />
            <span>分享</span>
          </div>
        </div>
      </popup>
    </transition>
  </div>
</template>

<script>
import ProgramDesc from './RadioProgramDesc';
import ProgramList from './RadioProgramList';
import {
  roundCountMixin,
  getTracksMixin,
  getUrlMixin,
  loadingMixin,
  playSongMixin
} from 'common/mixin';
import { getRadioDetail, getProgramList } from 'networks/radio';
import NavBar from 'components/common/NavBar/NavBar';
import ScrollView from '../../../components/content/ScrollView.vue';
import Popup from 'components/content/Popup.vue';

export default {
  name: 'RadioProgram',
  components: { NavBar, Popup, ScrollView },
  mixins: [roundCountMixin, getTracksMixin, getUrlMixin, loadingMixin, playSongMixin],
  data() {
    return {
      result: [],
      programs: [],
      tracks: [],
      tabbar: ['详情', '节目'],
      activeTab: 1,
      coverHeight: 0,
      showMoreOption: false,
      programInfo: {}
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
    currentComponent() {
      return this.activeTab === 1 ? ProgramList : ProgramDesc;
    },
    currentProp() {
      return this.activeTab === 1 ? { list: this.programs } : { results: this.result };
    }
  },
  methods: {
    contentLoaded() {
      this.loading = false;
    },
    goBack() {
      this.$router.go(-1);
    },
    noFunc() {
      this.$toast.show('功能未完成', 1000);
    },
    playProgram(index) {
      this.playSong(this.tracks, index);
    },
    showMore(program) {
      console.log(program);
      this.programInfo = program;
      this.showMoreOption = true;
    },
    shareProgram() {
      let msg = `分享#${this.result.name}#的电台节目 ${'\u00AB' +
        this.programInfo.name +
        '\u00BB'} https://syhua4.github.io/pear-music-app/#/radio/program/${this.programInfo.id}`;
      this.$copyText(msg).then(
        () => {
          this.$toast.show('复制链接成功', 1000);
        },
        () => {
          this.$toast.show('复制链接失败, 请重试', 1000);
        }
      );
    },
    shareRadio() {
      let msg = `分享电台 ${'\u00AB' +
        this.result.name +
        '\u00BB'} https://syhua4.github.io/pear-music-app/#/radio/program/${this.result.id}`;
      this.$copyText(msg).then(
        () => {
          this.$toast.show('复制链接成功', 1000);
        },
        () => {
          this.$toast.show('复制链接失败, 请重试', 1000);
        }
      );
    },
    tabClick(index) {
      if (this.loading) {
        this.$toast.show('正在努力加载哦', 1000);
      } else {
        this.activeTab = index;
      }
    },
    togglePopUp() {
      this.showMoreOption = false;
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
    .iconfont {
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
  .pop-up {
    .option-header {
      margin: 24px 24px 0;
      height: 60px;
      border-bottom: 1px solid #eee;
      @include font_color();
      @include clamp(1);
    }
    .option-wrapper,
    .track-option-wrapper {
      padding: 0 24px 24px;
      line-height: 80px;
      .add-more,
      .edit-playlist,
      .play-next,
      .add-playlist,
      .comment,
      .share,
      .artist,
      .album {
        display: flex;
        align-items: center;
        span {
          flex: 1;
          border-bottom: 1px solid #eee;
        }
      }
      .iconfont {
        margin-right: 20px;
        @include font_size($icon_ms);
      }
    }
  }
}
</style>
