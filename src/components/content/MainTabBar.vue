<template>
  <div id="tabbar">
    <tab-bar>
      <tab-bar-item path="/recommend">
        <i class="iconfont icon-logo " slot="tabbar-icon" />
        <div class="item-text" slot="tabbar-text">发现</div>
      </tab-bar-item>
      <tab-bar-item path="/user">
        <i class="iconfont icon-music" slot="tabbar-icon" />
        <div class="item-text" slot="tabbar-text">我的</div>
      </tab-bar-item>
      <tab-bar-item path="/radio">
        <i class="iconfont icon-radio" slot="tabbar-icon" />
        <div class="item-text" slot="tabbar-text">电台</div>
      </tab-bar-item>
      <tab-bar-item path="/account">
        <i class="iconfont icon-user" slot="tabbar-icon" />
        <div class="item-text" slot="tabbar-text">账号</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import { TabBar, TabBarItem } from 'components/common/TabBar/tabbar.js';
export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin';
@import 'assets/css/variable';
#tabbar {
  .icon-logo,
  .icon-music,
  .icon-radio,
  .icon-user {
    @include font_size($icon_ms);
  }
  .item-text {
    @include font_size($s);
  }
  .router-link-exact-active .icon-logo::before,
  .router-link-exact-active .icon-music::before,
  .router-link-exact-active .icon-radio::before,
  .router-link-exact-active .icon-user::before {
    color: #fff;
    border-radius: 50%;
    padding: 10px;
    display: inline-block;
    background: $gradient-color-theme;
    @include font_size($icon_s);
  }
}
</style>
