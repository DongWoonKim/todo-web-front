<!-- https://velog.io/@ddpound/Vue-SpringBoot-HTTP-%ED%86%B5%EC%8B%A0-%ED%85%8C%EC%8A%A4%ED%8A%B8cors%EA%B0%92-%ED%97%88%EC%9A%A9 -->
<template>
  <TodoHeader v-on:headEvent="headEvent"/>
  <TodoInput v-on:addTodo="addTodo"/>
  <TodoList v-bind:propsdata="todoItems"
    @removeTodo="removeTodo"/>
  <TodoFooter v-on:removeAll="clearAll"/>
  <!-- 회원가입 모달 -->
  <SignUp v-if="signUpModal" v-on:modalEvent="modalEvent"></SignUp>
  <!-- 로그인 모달 -->
  <SignIn v-if="signInModal" v-on:modalEvent="modalEvent"></SignIn>


  <!-- 로그인 모달 : ouath version -->
  <!--
  <Modal v-if="signInModal">
    <template #header>
      <div class="modalClose" >
        <i
        class="closeModalBtn fas fa-times"
        aria-hidden="true"
        @click="signInModal = false"
        style="font-size:3rem;"
        ></i>
      </div>
      <h1>연동</h1>
    </template>
    <template #body>
      <button
        @click="handleClickSignIn"
        type="button"
        class="btn btn-Google btn-lg">
        <i class="fa fa-google-plus animated infinite tada"></i> Google+
      </button>
    </template>
  </Modal>
-->

</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import TodoHeader from './components/common/TodoHeader.vue'
import TodoFooter from './components/common/TodoFooter.vue'
import TodoInput from './components/todo-core/TodoInput.vue'
import TodoList from './components/todo-core/TodoList.vue'
import SignUp from './components/login/SignUp.vue'
import SignIn from './components/login/SignIn.vue'
import Axios from 'axios'
// import { inject, toRefs } from "vue";
export default {
  name: 'App',
  components: {
    'TodoHeader' : TodoHeader,
    'TodoFooter' : TodoFooter,
    'TodoInput' : TodoInput,
    'TodoList' : TodoList,
    'SignUp' : SignUp,
    'SignIn' : SignIn
  },
  data() {
    return {
      user: '',
      todoItems: [],
      signUpModal : false,
      signInModal : false
    }
  },
  methods: {
    addTodo(todoItem) {
      // 로컬 스토리지에 데이터를 추가하는 로직
      localStorage.setItem(todoItem, todoItem);
      this.todoItems.push(todoItem);
      let obj = {};
      obj.item = todoItem;
      Axios.post('http://localhost:8080/todo', JSON.stringify( obj ), this.axiosConfig)
        .then(function(response) {
          console.log('res', response);
        })
        .catch(function(error) {
          console.log('res', error);
        });
    },
    headEvent(key) {
      if (key === 'login') {
        this.signInModal = true;
      } else if ( key === 'logout' ) {
        // this.handleClickSignOut();
        // this.$store.commit( 'INIT_USERINFO' );
        this.$store.dispatch( 'SIGNOUT' );
      } else if ( key === 'signUp' ) {
        this.signUpModal = true;
      }
    },
    modalEvent(key) {
      if ( key === 'modalClose' ) {
        this.signUpModal = false;
        this.signInModal = false;
      } else if ( key === 'signUp' ) {
        this.signInModal = false;
        this.signUpModal = true;
      }
    },
    clearAll() {
      localStorage.clear();
      this.todoItems = [];
    },
    removeTodo(todoItem, index) {
      localStorage.removeItem( todoItem );
      this.todoItems.splice( index, 1 );
    },
    async handleClickSignIn(){
      try {
        const googleUser = await this.$gAuth.signIn();
        if (!googleUser) {
          return null;
        }
        console.log("googleUser", googleUser);
        this.user = googleUser.getBasicProfile().getEmail();
        console.log("getId", this.user);
        console.log("getBasicProfile", googleUser.getBasicProfile());
        console.log("getAuthResponse", googleUser.getAuthResponse());
        console.log(
          "getAuthResponse",
          this.$gAuth.instance.currentUser.get().getAuthResponse()
        );
        console.log('Vue3GoogleOauth.isAuthorized', this.Vue3GoogleOauth.isAuthorized);
      } catch (error) {
        //on fail do something
        console.error(error);
        return null;
      } finally {
        this.signInModal = false;
      }
    },
    async handleClickSignOut() {
      try {
        await this.$gAuth.signOut();
        console.log("isAuthorized", this.Vue3GoogleOauth.isAuthorized);
        this.user = "";
      } catch (error) {
        console.error(error);
      }
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
  created() {
    /*
    let Vue3GoogleOauth = inject("Vue3GoogleOauth");
    console.log(
      "getAuthResponse vue vue ",
      this.$gAuth
    );
    */
    // console.log('Vue3GoogleOauth.isAuthorized1', this.Vue3GoogleOauth.isAuthorized);
    if ( localStorage.length > 0 ) {
      for ( let i = 0; i < localStorage.length; ++i ) {
        this.todoItems.push( localStorage.key(i) );
      }
    }
    let check = this.$store.getters.GET_TOKEN;
    console.log('check check', check);
    console.log('check check2', this.$store.state.loginStateInfo.accessToken)

    if ( check.refresh === 'undefined' ) {
        this.$store.dispatch( 'SIGNOUT', this.axiosConfig );
    } else if ( // access token 재발급
      ( check.access === '' ||
        check.access === null ||
        check.access === 'null' ||
        check.access === 'undefined' )
        &&
      ( check.refresh !== '' &&
        check.refresh !== null &&
        check.refresh !== 'null' &&
        check.refresh !== 'undefined' )
    ) {
      this.$store.dispatch( 'REFRESH_TOKEN', this.axiosConfig ).then( ( res ) => {
        console.log('refresh token ', res)
      }).catch(( err ) => (
        console.log( 'sigin err', err.message )
      ));
    }
  }
}
</script>

<style lang="scss">
@import '~styles/Nomalize.scss';
@import '~styles/CommonStyle.scss';
body {
  text-align: center;
  background-color: #F6F6F8;
}
input {
  border-style: groove;
  width: 200px;
}
button {
  border-style: groove;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
.test{ display:flex; justify-content: center; align-items: center; height:100vh; }
.btn {
  margin: 40px;
}
.btn.btn-Google {
  background-color: transparent;
  color: #666A73;
  border-color: #ee1010;
  border-size: 2px;
  border-radius: 0;
  outline: 0;
}
</style>
