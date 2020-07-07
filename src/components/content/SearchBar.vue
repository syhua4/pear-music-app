<template>
  <div class="search-bar">
    <input
      type="text"
      class="iconfont"
      v-model="query"
      ref="query"
      :placeholder="'\ue654 搜索'"
      :disabled="disable"
      :style="{ textAlign: isDisabled }"
      @keyup.enter="querySubmit"
      @keyup="querySuggest"
    />
    <slot name="clear-search"></slot>
  </div>
</template>

<script>
import { debounce } from 'common/utils';
export default {
  name: 'SearchBar',
  props: {
    disable: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      query: ''
    };
  },
  computed: {
    isDisabled() {
      let position;
      this.disable ? (position = 'center') : (position = 'left');
      return position;
    }
  },
  methods: {
    querySubmit() {
      this.$emit('submit', this.query);
    },
    querySuggest: debounce(function() {
      this.$emit('suggest', this.query);
    }, 800)
  },
  watch: {
    value(val) {
      console.log(val);
      this.query = val;
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin';

.search-bar {
  display: flex;
  width: 100%;
  border-radius: 30px;
  overflow: hidden;
  height: 54px;
  input {
    line-height: 28px;
    padding: 0 20px;
    display: block;
    flex: 1;
    text-align: center;
    color: #eee;
    background-color: rgba($color: #fff, $alpha: 0.2);
    border: none;
    @include font_size($s);
    &::placeholder {
      color: #eee;
    }
    &:disabled {
      color: #fff;
    }
  }
}
</style>
