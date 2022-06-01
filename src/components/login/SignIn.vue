<template>
  <Modal>
    <template #header>
      <div class="modalClose" >
        <i
        class="closeModalBtn fas fa-times"
        aria-hidden="true"
        style="font-size:3rem;"
        @click="modalEvent('modalClose')"
        ></i>
      </div>
      <h3>로그인</h3>
    </template>
    <template #body>

      <div class="input-group">
        <span class="input-group-addon">ID</span>
        <input type="text" v-model="userId" @input="keyEvent" class="form-control" placeholder="ID를 입력하세요.">
      </div><!-- /input-group -->

      <div class="input-group commonMarginTop">
        <span class="input-group-addon">PW</span>
        <input type="password" v-model="userPw" class="form-control" placeholder="비밀번호를 입력하세요.">
      </div><!-- /input-group -->

      <!-- 해당 정보 입력관련 처리는 App.vue에서 처리하게 한다. -->
      <div class="input-group commonMarginTop">
        [&nbsp;<a href="#">ID가 기억나지 않으세요?</a>&nbsp;]
      </div><!-- /input-group -->
      <div class="input-group commonMarginTop">
        [&nbsp;<a href="#">비밀번호가 기억나지 않으세요?</a>&nbsp;]
      </div><!-- /input-group -->

    </template>
    <template #footer>
      <div class="">
        <button type="button" @click="doSignUp" class="btn btn-default" style="margin:0;">로그인</button>
        <button type="button" @click="modalEvent('signUp')" class="btn btn-default commonMarginLeft" style="margin:0; margin-left: 5px;">회원가입</button>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from '../../components/common/TodoModal.vue'
import Axios from 'axios'

export default {

  name: 'SignIn',
  components: {
    'Modal' : Modal
  },
  data() {
    return {
      userId : '',
      userPw : ''
    }
  },
  methods: {
    modalEvent( key ) {
      this.$emit('modalEvent', key);
    },
    doSignUp() {

      let self = this;
      /*
        ******* 방어코드 시작 *******
       */
      if ( !this.checkInvalidate() ) return;

      // let self = this;
      // axios post 요청
      let obj = {};
      obj.userId = this.userId;
      obj.userPw = this.userPw;

      Axios.post('http://localhost:8080/member/signin', JSON.stringify( obj ), this.axiosConfig)
        .then( function( res ) {

          if ( res.data === '' ) {
            alert('존재하지 않거나 입력하신 ID or 비밀번호가 일치하지 않습니다!');
            return;
          }
          
          // 사용자 정보를 vuex에 저장시킨다.
          let storeObj = {};
          storeObj.id        = res.data.id;
          storeObj.userId    = self.userId;
          storeObj.userName  = res.data.username;
          storeObj.userEmail = res.data.useremail;
          storeObj.userBirth = res.data.userbirth;
          storeObj.role      = res.data.role;

          self.$store.commit('SET_USERINFO', storeObj);

          // 로그인 창을 닫는다.
          self.modalEvent( 'modalClose' );

        })
        .catch(function(error) {
          console.log('res', error);
        });

    },
    /* 검증 */
    checkInvalidate() {

      if (
        this.userId === '' ||
        this.userPw === ''
      ) {
        alert('빠짐없이 정보를 입력해주세요!');
        return false;
      }

      // userId 체크
      if ( this.userId.length < 5 ) {
        alert('ID는 5자리 이상이어야 합니다!');
        return false;
      }

      // password 체크
      if ( this.userPw.length < 6 ) {
        alert('입력한 글자가 6글자 이상이어야 합니다!');
        return false;
      }

      // 모든 검증을 통과시
      return true;
    },
    /* 키이벤트 */
    keyEvent( e ) {

      const regExp  = /[^0-9a-z]/g;
      const regExp2 = /[^a-z]/g;
      const ele     = e.target;

      // userId 첫 글자 숫자 막기
      if ( this.userId.trim().length === 1 ) {

        if (regExp2.test(ele.value)) {
          ele.value = ele.value.replace(regExp2, '');
          alert('ID는 첫 시작은 영문자만 사용가능합니다. ')
        }
      }

      // userId 한글입력 막기
      if (regExp.test(ele.value)) {
        ele.value = ele.value.replace(regExp, '');
        alert('ID는 영문(소문자), 숫자만 사용가능합니다. ')
      }

      // 중복체크 해제
      if ( this.isUserIdCheck ) this.isUserIdCheck = !this.isUserIdCheck;

    }


  }

}
</script>

<style lang="scss" scoped>
@import '~styles/Nomalize.scss';
@import '~styles/CommonStyle.scss';

</style>
