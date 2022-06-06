<template lang="html">
  <header>
    <h1>머하꽈</h1>
    <!-- 로그인 여부는 vuex의 값을 바라보게 한다. -->
    <div v-if="!isSignIn" class="member">
      <span class="login" @click="headEvent('login')">로그인</span> |
      <span class="login" @click="headEvent('signUp')">회원가입</span>
    </div>
    <div v-if="isSignIn" class="member">
      <span class="login" @click="headEvent('logout')">로그아웃</span>
    </div>
  </header>
</template>

<script>
// import { inject, toRefs } from "vue";

export default {
  name: 'TodoHeader',
  components: {
  },
  data() {
    return {
      isSignIn : false
    }
  },
  methods : {
    headEvent(key) {
      this.$emit('headEvent', key);
      this.checkIsSign();

    },
    // 토큰 상태를 체크한다.
    checkIsSign() {
      let check = this.$store.getters.GET_TOKEN;
      if ( check.refresh !== null ) {
        this.isSignIn = true;
      } else {
        this.isSignIn = false;
      }
    }
  },
  created() {
    this.checkIsSign();

  },
  mounted() {
    this.emitter.on("resSignin",
      () => { this.checkIsSign() }
    );
  }
  /*
  setup(props) {
    const { isSignIn } = toRefs(props);
    const Vue3GoogleOauth = inject("Vue3GoogleOauth");
    const handleClickLogin = () => {};

    return {
      Vue3GoogleOauth,
      handleClickLogin,
      isSignIn,
    };

  },
  */

}
</script>

<style lang="scss" scoped>
h1 {
  color: #2F3B52;
  font-weight: 900;
  margin: 2.5rem 0 1.5rem;
}
#login {
  position: absolute;
  top: 3px;
  right: 5px;
}
.member {
  position: absolute;
  top : 5px;
  right: 5px;
}
</style>
