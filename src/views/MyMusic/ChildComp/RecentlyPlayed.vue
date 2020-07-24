<template>
  <div class="recently-played"></div>
</template>

<script>
export default {
  name: 'RecentlyPlayed'
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin.scss';
.recently-played {
  @include font_size($m);
}
</style>
