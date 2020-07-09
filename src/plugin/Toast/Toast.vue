<template>
  <transition name="fade">
    <div class="toast" v-if="isShow">
      <div class="text">{{ text }}</div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Toast',
  data() {
    return {
      text: '',
      isShow: false
    };
  },
  methods: {
    show(message, duration) {
      this.isShow = true;
      this.text = message;

      setTimeout(() => {
        this.isShow = false;
        this.text = '';
      }, duration);
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin';

.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  background-color: rgba(0, 0, 0, 0.75);
  color: #fff;
  padding: 10px;
  border-radius: 10px;
  z-index: 999;
  text-align: center;
  word-wrap: break-word;
  .text {
    @include font_size($ms);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
