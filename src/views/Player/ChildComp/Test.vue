<template>
  <div class="player-cd" ref="cd">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';
export default {
  name: 'Test',
  mounted() {},
  computed: {
    showPlayer() {
      return this.$store.state.showPlayer;
    }
  },
  watch: {
    showPlayer(newVal) {
      if (newVal) {
        let dim = this.$refs.cd.getBoundingClientRect();
        console.log('dim', dim);
        this.$refs.canvas.width = dim.width;
        this.$refs.canvas.height = dim.height;
        console.log(this.$refs.canvas);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.player-cd {
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  // background-color: aquamarine;
  height: 65%;
  width: 100%;
  z-index: 1;
  display: flex;
  // flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}
</style>
