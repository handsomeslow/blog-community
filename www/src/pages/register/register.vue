<template>
  <div class="register">
    <!--Snackbar-->
    <snackbar v-show="common.snack.isShow"></snackbar>
    <!--snackbar-->

    <div class="content">
      <form action="" name="form1">
        <mu-text-field label="帐号" labelFloat name="username" />
        <br/>
        <mu-text-field label="密码" type="password" labelFloat name="password" />
        <br/>
        <mu-text-field label="重复密码" type="passwordcheck" labelFloat name="passwordcheck" />
        <br/>
        <div class="btn-radius" @click="submit">注册</div>
      </form>
      <div @click="login" class="tip-user">
        我已有帐号
      </div>
    </div>
  </div>
</template>

<script >
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import snackbar from '../../components/snackbar/snackbar'
import mainProgress from '../../components/mainProgress/mainProgress'
export default {
  computed: {
    ...mapState([
      'register',
      'common'
    ]),
    ...mapGetters([
      'REPLIES_COUNT',
      'COLLECTS_COUNT',
      'MY_TOPICS_COUNT',
      'session'
    ])
  },
  components: {
    snackbar,
    mainProgress
  },
  methods: {
    ...mapMutations([
      'SHOW_MAIN_OVERFLOW',
      'LOGOUT',
      'CLEAR_MSG_DATA',
      'setSession'
    ]),
    async submit() {
      // call api
      const username = document.form1.username.value.trim()
      const password = document.form1.password.value.trim()
      const passwordcheck = document.form1.passwordcheck.value.trim()
      if (username.length <= 0 || password.length <= 0 || passwordcheck.length <= 0) {
        this.$store.dispatch('showSnackbarAction', {
          msg: '账号或密码不能为空',
          isWarn: true
        })
        return
      } else {
        if (password == passwordcheck) {
          this.$store.dispatch('register', {
            username: username,
            password: password
          })
        } else {
          this.$store.dispatch('showSnackbarAction', {
            msg: '两次输入的密码不一致，请重新输入',
            isWarn: true
          })
        }

      }
    },
    login() {
      this.$router.replace({ name: 'user' });
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/sass/_base.scss';
.btn-radius {
  width: 100%;
  height: 40px;
  margin-top: 20px;
  border: 1px solid rgba(255, 255, 255, 0.38);
  background: $primary !important;
  color: #fff;
  line-height: 40px;
  text-align: center;
  border-radius: 50px;
}

.register {
  background: $ExtraLightGray;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-size: 100% 100%;
  .mu-appbar {
    text-align: center;
    .mu-flat-button-label {
      font-size: 20px;
    }
  }
  .content {
    width: 80%;
    margin: 70px auto 20px;
    .mu-text-field {
      width: 100%
    }
    .tip-user {
      width: 100%;
      text-align: center;
      margin-top: 20px;
      color: $primary !important;
    }
  }
}
</style>
