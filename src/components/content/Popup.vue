<template>
  <div
    class="pop-up-wrapper"
    @click.stop="closePopUp"
    :style="{ '--popup-height': popUpHeight + '%' }"
  >
    <div class="pop-up" ref="popup">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Popup',
  data() {
    return {
      offsetTop: 0
    };
  },
  props: {
    popUpHeight: {
      type: Number,
      default: 45
    }
  },
  methods: {
    closePopUp(e) {
      this.offsetTop = this.$refs.popup.offsetTop;
      if (e.clientY < this.offsetTop) {
        this.$emit('togglePopUp');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.pop-up-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba($color: #444, $alpha: 0.4);
  @include font_size($ms);
  .pop-up {
    height: var(--popup-height);
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    z-index: 11;
    overflow: hidden;

    border-radius: 30px 30px 0 0;
  }
}
</style>
