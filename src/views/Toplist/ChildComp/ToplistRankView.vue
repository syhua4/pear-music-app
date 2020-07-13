<template>
  <div class="toplist-list" v-if="results && results.length">
    <div class="header">官方榜</div>
    <div class="list-wrapper" v-for="item in results" :key="item.id" @click="goPlaylist(item.id)">
      <div class="img-wrapper">
        <img v-lazy="item.coverImgUrl" />
        <span class="freq">{{ item.updateFrequency }}</span>
      </div>
      <div class="desc-wrapper">
        <div class="song" v-for="(track, index) in item.tracks" :key="track.first">
          <span>{{ index + 1 }}. {{ track.first }} - {{ track.second }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToplistRankView',
  props: {
    results: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    goPlaylist(id) {
      this.$router.push(`/playlists/${id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin.scss';
.toplist-list {
  margin: 0 24px;
  @include font_size($ms);
  .header {
    padding: 30px 0 20px;
    @include font_size($m);
  }
  .list-wrapper {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .img-wrapper {
      width: 31.5%;
      position: relative;
      img {
        border-radius: 10px;
        width: 100%;
      }
      span {
        bottom: 5px;
        left: 10px;
        position: absolute;
        color: #fff;
        @include font_size($s);
      }
    }
    .desc-wrapper {
      width: 65%;
      display: flex;
      flex-direction: column;
      .song {
        color: #666;
        padding: 5px 0;
        @include clamp(1);
      }
    }
  }
}
</style>
