<template>
  <div class="pop-up">
    <div class="header">
      <span @click="cancel">取消</span>
      <span class="title">新建歌单</span>
      <span @click="submit">完成</span>
    </div>
    <input type="text" placeholder="歌单标题" v-model="playlistName" />
  </div>
</template>

<script>
export default {
  name: 'MinePopUp',
  data() {
    return {
      playlistName: ''
    };
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    submit() {
      this.$emit('submit', this.playlistName);
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin.scss';
.pop-up {
  .header {
    display: flex;
    height: 100px;
    align-items: center;
    justify-content: space-between;
    .title {
      font-weight: 500;
    }
  }
  input {
    height: 100px;
    width: 100%;
  }
}
</style>
