<template>
  <div class="program-desc" v-if="Object.keys(results).length">
    <div class="header">主播</div>
    <div class="dj-wrapper">
      <img v-lazy="fmtUrl(results.dj.avatarUrl)" />
      <span class="nickname">{{ results.dj.nickname }}</span>
    </div>
    <div class="header">电台内容简介</div>
    <div class="desc">{{ results.desc }}</div>
    <div class="comment-section" v-if="results.commentDatas.length">
      <div class="header">精彩评论</div>
      <div class="comment-wrapper" v-for="comment in results.commentDatas" :key="comment.commentId">
        <img :src="fmtUrl(comment.userProfile.avatarUrl)" />
        <div class="comment">
          <div class="user">{{ comment.userProfile.nickname }}</div>
          <div class="content" v-html="fmtComment(comment.content)" />
          <div class="comment-song">---{{ comment.programName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUrlMixin } from 'common/mixin';
export default {
  name: 'RadioProgramDesc',
  mixins: [getUrlMixin],
  props: {
    results: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  computed: {
    fmtComment() {
      return function(text) {
        return text.replace(/\n/gm, '</br>');
      };
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
.program-desc {
  @include font_size($ms);

  .header {
    font-weight: 500;
    padding: 0 24px;
    padding-bottom: 20px;
    @include font_size($s);
  }
  .dj-wrapper {
    padding: 0 24px;

    display: flex;
    align-items: center;
    padding-bottom: 40px;

    img {
      width: 75px;
      height: 75px;
      border-radius: 50%;
      margin-right: 20px;
    }
  }
  .desc {
    padding: 0 24px;

    padding-bottom: 40px;
  }
  .comment-wrapper {
    display: flex;
    padding: 0 24px;

    padding-bottom: 30px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 20px;
    }
    .comment {
      flex: 1;
      display: flex;
      flex-direction: column;

      .user,
      .content {
        padding-bottom: 10px;
      }
      .user {
        color: #666;
      }
      .comment-song {
        padding-bottom: 20px;
        color: #999;
        border-bottom: 1px solid #eee;
      }
    }
  }
}
</style>
