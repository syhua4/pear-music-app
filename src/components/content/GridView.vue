<template>
  <div class="grid">
    <div class="header">{{ heading }}</div>
    <div class="grid-wrapper">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GridView',
  props: {
    heading: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="scss" scoped>
.grid {
  padding: 0 24px;
  .header {
    padding: 30px 0 20px;
    @include font_size($ms);
    font-weight: 500;
  }
  .grid-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    &::after {
      content: '';
      flex: calc(100% / 3);
    }
    .wrapper {
      width: calc(100% / 3);
      .img-wrapper {
        position: relative;
        margin-bottom: 10px;
        margin-right: 16px;
        img {
          width: 100%;
          height: same-as-width;
          border-radius: 10px;
        }
        span {
          position: absolute;
          bottom: 5px;
          left: 10px;
          color: #fff;
          font-weight: 500;
          @include font_size($s);
        }
      }
      .title {
        margin-bottom: 20px;
        @include font_size($s);
        @include clamp(1);
      }
    }
  }
}
</style>
