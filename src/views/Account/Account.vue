<template>
  <div class="account">
    <nav-bar :class="isLogin ? 'account-nav' : 'nav'">
      <i class="iconfont icon-back" slot="left" />
      <div class="nav-title" slot="center">网易邮箱账号登入</div>
    </nav-bar>
    <login v-if="!isLogin" />
    <div class="account-info" v-else>
      <scroll-view height="300px" ref="scrollView">
        <div class="cover" slot="cover" />
        <div class="profile" slot="left">
          <img :src="profile.avatar" />
          <span>{{ profile.nickname }}</span>
        </div>
        <div class="content" slot="component">
          <div>Demo版没有登录信息哦</div>
          <button class="logout" @click="logout">退出登录</button>
        </div>
      </scroll-view>
    </div>
  </div>
</template>

<script>
import Login from './Login';

import NavBar from 'components/common/NavBar/NavBar';
import ScrollView from '../../components/content/ScrollView.vue';

import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'Account',
  components: { Login, NavBar, ScrollView },
  computed: {
    ...mapGetters(['isLogin', 'profile'])
  },
  methods: {
    ...mapActions(['setLogout']),
    logout() {
      this.setLogout().then(res => {
        if (res) {
          this.$toast.show('登出成功', 1000);
          setTimeout(() => {
            this.$router.push('/recommend');
          }, 500);
        } else {
          this.$toast.show('登出失败, 请重试', 1000);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin.scss';
.account {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 100px;
  z-index: 2;
  background-color: #fff;
  .nav,
  .account-nav {
    color: #fff;
    position: relative;
    z-index: 1;
  }
  .account-nav {
    background-color: transparent;
  }

  .cover {
    color: #fff;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    top: 0;
    left: 0;
    right: 0;
    padding: 0 24px;
    height: 400px;
    background: #444;
    background-image: url('~assets/images/bg_default.jpg');
    z-index: 1;
  }
  ::v-deep .tools {
    height: 100px;
    border-bottom: none;
  }
  .profile {
    margin-top: 20px;
    display: flex;
    align-items: center;
    img {
      height: 80px;
      width: 80px;
      border-radius: 50%;
      margin-right: 20px;
    }
  }
  ::v-deep .scroll-wrapper {
    top: calc(var(--height) + 200px);
    overflow: initial;
  }
  .content {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    div {
      color: #4d7daf;
      @include font_size($ms);
      margin: 50px 0;
    }
    button {
      height: 70px;
      width: 80%;
      @include font_size($ms);
      display: inline-block;
      border: 2px solid #d64139;
      background-color: #fff;
      border-radius: 35px;

      @include font_active_color();
    }
  }
}
</style>
