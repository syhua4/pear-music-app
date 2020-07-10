<template>
  <div class="tabbar-item">
    <router-link :to="path">
      <slot name="tabbar-icon" />
      <slot name="tabbar-text" />
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: {
      type: String,
      default: '/recommend',
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin.scss';
.tabbar-item {
  color: #333;
  display: flex;
  flex-direction: column;
  .router-link-exact-active {
    @include font_active_color();
  }
}
</style>
