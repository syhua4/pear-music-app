<template>
  <div class="loading" v-if="isShow">
    <img src="~assets/images/loading.svg" />
    <div class="text">正在加载...</div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    isShow: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin';
.loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  img {
    margin: 30px 0;
  }
  .text {
    @include font_size($s);
    @include font_color();
  }
}
</style>
