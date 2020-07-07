<template>
  <div class="panel">
    <div class="panel-header">
      <span class="panel-title">{{ title }}</span>
      <span class="panel-btn" v-if="btnText.length > 0" @click="btnClick">{{ btnText }}</span>
    </div>
    <slot name="panel-content" />
    <a class="panel-footer" v-if="footer.length > 0"
      >{{ footer }}
      <i class="iconfont icon-next" />
    </a>
  </div>
</template>

<script>
export default {
  name: 'PanelView',
  props: {
    title: {
      type: String,
      default: '',
      required: true
    },
    footer: {
      type: String,
      default: ''
    },
    btnText: {
      type: String,
      default: ''
    }
  },
  methods: {
    btnClick() {
      this.$emit('btnClick');
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin.scss';
.panel {
  padding: 20px 24px 50px;
  .panel-header {
    margin: 20px 0;
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    .panel-title {
      font-weight: 500;
      color: #333;
    }
    .panel-btn {
      border: 1px solid #ccc;
      border-radius: 30px;
      padding: 0 20px;
      color: #666;
      @include font_size($ms);
    }
  }
  .panel-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    @include font_size($ms);
    @include font_color();
    .icon-next {
      @include font_size($icon_xs);
    }
  }
}
</style>
