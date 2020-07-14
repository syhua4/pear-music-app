<template>
  <div class="radio-cat-info" v-if="results.length">
    <scroll :pullUpload="true" @pullUpload="loadMore" ref="scroll">
      <div
        class="program-wrapper"
        v-for="radio in results"
        :key="radio.id"
        @click.stop="toProgram(radio.id)"
      >
        <img v-lazy="fmtUrl(radio.picUrl)" />
        <div class="program-info">
          <div class="name">
            {{ radio.name }}
          </div>
          <div class="rcmdtext">{{ radio.rcmdtext }}</div>
          <div class="desc">
            <span class="program-count"> {{ `节目:${radio.programCount},` }}</span>
            <span class="sub-count">订阅:{{ radio.subCount | round(1) }}</span>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/Scroll/Scroll';
import { getUrlMixin, roundCountMixin } from 'common/mixin';
import { getHotRadioByCat } from 'networks/radio';
export default {
  name: 'RadioCategoryInfo',
  mixins: [getUrlMixin, roundCountMixin],
  components: { Scroll },

  created() {
    getHotRadioByCat(this.id).then(res => {
      this.results = res.djRadios;
    });
  },
  data() {
    return {
      results: []
    };
  },
  props: {
    id: {
      type: Number,
      default: 0,
      required: true
    }
  },
  methods: {
    toProgram(id) {
      this.$router.push(`/radio/program/${id}`);
    },
    async loadMore() {
      let offset = this.results.length;
      await getHotRadioByCat(this.id, offset).then(res => {
        if (res.hasMore && res.djRadios.length) {
          this.results.push(...res.djRadios);
        } else {
          this.$refs.scroll.loading = false;
        }
      });
      this.$refs.scroll.finishPullUp();
    }
  },
  watch: {
    results: {
      deep: true,
      handler() {
        this.$nextTick(function() {
          this.$emit('contentLoaded');
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin.scss';
.radio-cat-info {
  .scroll-wrapper {
    margin: 0 24px;
    position: fixed;
    top: 124px;
    left: 0;
    right: 0;
    bottom: 0;
    .program-wrapper {
      display: flex;
      padding-bottom: 24px;
      align-items: center;
      img {
        width: 30%;
        border-radius: 10px;
      }
      .program-info {
        color: #999;
        margin-left: 20px;
        @include font_size($s);
        .name {
          color: #333;
          font-weight: 500;
          @include font_size($ms);
          @include clamp(1);
        }
        .rcmdtext {
          padding-top: 20px;
          @include clamp(1);
        }
        .desc {
          padding-top: 10px;
          @include clamp(1);
          .program-count {
            margin-right: 8px;
          }
        }
      }
    }
  }
}
</style>
