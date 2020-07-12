<template>
  <div class="login">
    <nav-bar class="nav">
      <i class="iconfont icon-back" slot="left" />
      <div class="nav-title" slot="center">网易邮箱账号登入</div>
      <i class="iconfont icon-back" slot="right" />
    </nav-bar>
    <form>
      <input type="text" placeholder="登录邮箱" v-model="email" />
      <input type="password" placeholder="密码" v-model="password" />
      <input type="button" value="登录" :disabled="isDisable" @click="checkForm" />
      <input type="button" value="一键体验" @click="testLogin" class="trial-btn" />
    </form>
  </div>
</template>

<script>
import NavBar from 'components/common/NavBar/NavBar';
import { isEmail } from 'common/utils';
import testAccount from 'common/test_account';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'Login',
  components: { NavBar },
  data() {
    return {
      email: '',
      password: ''
    };
  },
  computed: {
    ...mapGetters(['isLogin']),
    isDisable() {
      return !this.email.trim() || !this.password.trim();
    }
  },
  methods: {
    ...mapActions(['setLogin']),
    checkForm() {
      !isEmail(this.email) ? this.$toast.show('请输入正确的网易邮箱', 1000) : this.login();
    },
    login() {
      this.setLogin({ email: this.email, password: this.password }).then(res =>
        this.$toast.show(res, 1000)
      );
    },
    testLogin() {
      this.email = testAccount.test_acc;
      this.password = testAccount.test_pwd;
      this.login();
    }
  },
  watch: {
    isLogin: {
      immediate: true,
      handler(val) {
        if (val) {
          this.$router.push('/recommend');
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin.scss';
.login {
  .nav {
    color: #fff;
    .icon-back {
      @include font_size($icon_ms);
    }
    .right-nav .icon-back {
      color: transparent;
    }
  }
  form {
    margin: 50px 24px 0;
    input {
      height: 70px;
      margin-bottom: 30px;
      width: 100%;
      border-bottom: 2px solid #eee;
      @include font_size($ms);
      &::placeholder {
        color: #ccc;
      }
      &[type='button'] {
        margin-top: 30px;
        border-radius: 35px;
        color: #fff;
        @include bg_color();
      }
      &[type='button'][disabled] {
        opacity: 0.3;
      }
      &.trial-btn {
        margin-top: 0px;
        border: 2px solid #d64139;
        background-color: #fff !important;
        @include font_active_color();
      }
    }
  }
}
</style>
