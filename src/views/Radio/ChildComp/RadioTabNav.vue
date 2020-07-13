<template>
  <div class="radio-tabnav">
    <router-link class="tabnav" to="/radio/category">
      <i class="iconfont icon-cate" />
      <span class="tabnav-text">电台分类</span>
    </router-link>
    <router-link class="tabnav" to="/radio/toplist">
      <i class="iconfont icon-toplist" />
      <span class="tabnav-text">电台排行</span>
    </router-link>
    <a class="tabnav" @click="noFunc">
      <i class="iconfont icon-paid" />
      <span class="tabnav-text">付费精品</span>
    </a>
    <a class="tabnav" @click="noFunc">
      <i class="iconfont icon-academy" />
      <span class="tabnav-text">主播学院</span>
    </a>
  </div>
</template>

<script>
export default {
  name: 'RadioTabNav',
  methods: {
    noFunc() {
      this.$toast.show('功能还没完成哦', 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin.scss';
.radio-tabnav {
  border-bottom: 1px solid #eee;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  .tabnav {
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: space-evenly;
    .icon-cate::before,
    .icon-toplist::before,
    .icon-academy::before,
    .icon-paid::before {
      display: inline-block;
      @include font_size($icon_ms);
      padding: 20px;
      border-radius: 50%;
      background: $gradient-color-theme;
      border: 1px solid red;
      color: #fff;
    }
    .icon-academy::before {
      padding: 20px 18px;
    }
    .tabnav-text {
      margin-top: 12px;
      @include font_size($s);
      @include font_color();
    }
  }
}
</style>
