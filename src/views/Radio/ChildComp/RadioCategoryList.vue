<template>
  <div class="radio-catlist" v-if="hotCatList.length && catList.length">
    <scroll>
      <div class="title">热门分类</div>
      <div class="wrapper">
        <div
          class="cat-wrapper"
          v-for="item in hotCatList"
          :key="item.id"
          @click.stop="categoryClick(item)"
        >
          <div class="inner">
            <img v-lazy="item.picUrl" />
            <span class="cat-name">{{ item.name }}</span>
          </div>
        </div>
      </div>
      <div class="title">更多分类</div>
      <div class="wrapper">
        <div
          class="cat-wrapper"
          v-for="item in catList"
          :key="item.id"
          @click.stop="categoryClick(item)"
        >
          <div class="inner">
            <img v-lazy="item.picUrl" />
            <span class="cat-name">{{ item.name }}</span>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/Scroll/Scroll';
import { getCategory } from 'networks/radio';
export default {
  name: 'RadioCategoryList',
  components: { Scroll },
  data() {
    return {
      hotCatList: [],
      catList: []
    };
  },
  async created() {
    await getCategory().then(res => {
      res.categories.slice(0, 6).map(item => {
        this.hotCatList.push({ picUrl: item.pic84x84IdUrl, name: item.name, id: item.id });
      });
      res.categories.slice(6).map(item => {
        this.catList.push({ picUrl: item.pic84x84IdUrl, name: item.name, id: item.id });
      });
    });
  },
  methods: {
    categoryClick(item) {
      let itemInfo = { name: item.name, id: item.id };
      this.$emit('categoryClick', itemInfo);
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin.scss';
.radio-catlist {
  .scroll-wrapper {
    position: fixed;
    top: 100px;
    bottom: 0;
    left: 0;
    right: 0;
    .title {
      text-align: center;
      padding: 40px 0 10px;
    }
    .wrapper {
      display: flex;
      flex-wrap: wrap;
      .cat-wrapper {
        justify-content: center;
        align-items: center;
        display: flex;
        width: 50%;
        height: 100px;
        .inner {
          width: 65%;
          @include clamp(1);
          img {
            height: 56px;
            width: same-as-height;
            margin-right: 20px;
          }
        }
      }
    }
  }
}
</style>
