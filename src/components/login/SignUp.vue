<template>
  <Modal>
    <template #header>
      <div class="modalClose" >
        <i
        class="closeModalBtn fas fa-times"
        aria-hidden="true"
        @click="modalEvent"
        style="font-size:3rem;"
        ></i>
      </div>
      <h3>회원가입</h3>
    </template>
    <template #body>

      <div class="input-group">
        <span class="input-group-addon">ID</span>
        <input type="text" v-model="userId" @input="keyEvent" class="form-control" placeholder="사용할 ID">
        <span class="input-group-btn">
          <button @click="checkDuplicateId" class="btn btn-default" type="button" style="margin:0;">중복체크</button>
        </span>
      </div><!-- /input-group -->

      <div class="input-group commonMarginTop">
        <span class="input-group-addon">PW</span>
        <input type="password" v-model="userPw" class="form-control" placeholder="비밀번호 입력(6자 이상)">
      </div><!-- /input-group -->

      <div class="input-group commonMarginTop">
        <span class="input-group-addon">PW</span>
        <input type="password" v-model="userPwCheck" class="form-control" placeholder="비밀번호 확인(6자 이상)">
      </div><!-- /input-group -->

      <div class="input-group commonMarginTop">
        <span class="input-group-addon">이름</span>
        <input type="text" v-model="userName" class="form-control" placeholder="이름을 입력하세요.">
      </div><!-- /input-group -->

      <div class="input-group commonMarginTop">
        <span class="input-group-addon">생년월일</span>
        <input type="text" v-model="userBirth" class="form-control" placeholder="ex) 19001010">
      </div><!-- /input-group -->

      <div class="input-group commonMarginTop">
        <span class="input-group-addon">e-mail</span>
        <input type="text" v-model="userEmail" class="form-control" placeholder="ex) XXXXX@XXXX.com">
      </div><!-- /input-group -->

    </template>
    <template #footer>
      <div class="">
        <button type="button" @click="signUp" class="btn btn-default" style="margin:0;">가입</button>
        <button type="button" @click="signFormInit" class="btn btn-default commonMarginLeft" style="margin:0; margin-left: 5px;">초기화</button>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from '../../components/common/TodoModal.vue'
import Axios from 'axios'

export default {

  name: 'SignUp',
  components: {
    'Modal' : Modal
  },
  data() {
    return {
      userId : '',
      isUserIdCheck : '',
      userPw : '',
      userPwCheck : '',
      userName : '',
      userBirth : '',
      userEmail : ''
    }
  },
  methods: {
    /* ID 중복 체크 */
    checkDuplicateId() {

      console.log('this user id', this.userId)
      let self = this;

      // axios get 요청
      Axios.get( 'http://localhost:8080/member', {
        params : {
          userId : this.userId
        }
      })
        .then( function( res ) {
          console.log( 'res', res );
          if ( !res.data ) {
            self.isUserIdCheck = true;
            alert('사용가능한 ID입니다.');
          } else {
            self.isUserIdCheck = false;
            self.userId = '';
            alert('중복된 ID가 존재합니다.')
          }
        })
        .catch(function(error) {
          console.log('res', error);
        });

    },
    /* 회원가입 */
    signUp() {

      /*
        ******* 방어코드 시작 *******
       */
      if ( !this.checkInvalidate() ) return;

      let self = this;
      // axios post 요청
      let obj = {};
      obj.userId = this.userId;
      obj.userPw = this.userPw;
      obj.userName = this.userName;
      obj.userBirth = this.userBirth;
      obj.userEmail = this.userEmail;
      obj.role = 'u'; // 클라이언트 페이지에서 가입시 기본적으로 권한은 일반사용자이다.

      Axios.post('http://localhost:8080/member', JSON.stringify( obj ), this.axiosConfig)
        .then( function( res ) {

          console.log('res', res);
          alert('가입을 축하드립니다! 로그인해주세요.');
          self.signFormInit();
          self.modalEvent();

        })
        .catch(function(error) {
          console.log('res', error);
        });

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

    },
    /* 폼 초기화 */
    signFormInit() {

      this.userId      = '';
      this.userPw      = '';
      this.userPwCheck = '';
      this.userName    = '';
      this.userBirth   = '';
      this.userEmail   = '';

    },
    /* 검증 */
    checkInvalidate() {

      // ID 체크
      if ( !this.isUserIdCheck ) {
        alert('ID 중복 체크를 해주세요!');
        return false;
      }

      if (
        this.userId      === '' ||
        this.userPw      === '' ||
        this.userPwCheck === '' ||
        this.userName    === '' ||
        this.userBirth   === '' ||
        this.userEmail   === ''
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
      if ( this.userPw !== this.userPwCheck ) {
        alert('비밀번호가 일치하지 않습니다!');
        return false;
      }

      // email 체크
      // 검증에 사용할 정규식 변수
      let regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      if ( this.userEmail.match( regExp ) == null ) {
        alert('이메일 형식이 틀립니다!');
        return false;
      }

      // 모든 검증을 통과시
      return true;
    },
    modalEvent() {
      this.$emit('modalEvent', 'modalClose');
    }

  }

}
</script>

<style lang="scss" scoped>
@import '~styles/Nomalize.scss';
@import '~styles/CommonStyle.scss';

</style>
