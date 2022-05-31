<template lang="html">
  <header>
    <h1>머하꽈</h1>
    <div v-if="!isSignIn" class="member">
      <span class="login" @click="headEvent('login')">로그인</span> |
      <span class="login" @click="headEvent('signUp')">회원가입</span>
    </div>
    <div v-if="isSignIn" class="member">
      <span class="login" @click="headEvent('logout')">로그아웃</span>
    </div>
    <!--
    <div v-if="!Vue3GoogleOauth.isAuthorized" class="member">
      <span class="login" @click="headEvent('login')">로그인</span> |
      <span class="login" @click="headEvent('signUp')">회원가입</span>
    </div>
    <div v-if="Vue3GoogleOauth.isAuthorized" class="member">
      <span class="login" @click="headEvent('logout')">로그아웃</span>
    </div>
    -->

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
    },
  },
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
