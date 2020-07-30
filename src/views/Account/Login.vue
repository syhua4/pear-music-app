<template>
  <div class="login">
    <form>
      <input type="text" placeholder="登录邮箱" v-model="email" />
      <input type="password" placeholder="密码" v-model="password" />
      <input type="button" value="登录" :disabled="isDisable" @click="checkForm" />
      <input type="button" value="一键体验" @click="testLogin" class="trial-btn" />
    </form>
  </div>
</template>

<script>
import { isEmail } from 'common/utils';
import testAccount from 'common/test_account';
import { mapActions } from 'vuex';
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  computed: {
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
      this.setLogin({ email: this.email, password: this.password }).then(res => {
        this.$toast.show(res, 1000);
        this.$router.push('/user');
      });
    },
    testLogin() {
      this.email = testAccount.test_acc;
      this.password = testAccount.test_pwd;
      this.login();
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin.scss';
.login {
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
