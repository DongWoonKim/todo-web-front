<template>
  <Modal>
    <template #header>
      <div class="modalClose" >
        <i
        class="closeModalBtn fas fa-times"
        aria-hidden="true"
        style="font-size:3rem;"
        ></i>
      </div>
      <h3>로그인</h3>
    </template>
    <template #body>

      <div class="input-group">
        <span class="input-group-addon">ID</span>
        <input type="text" class="form-control" placeholder="ID를 입력하세요.">
      </div><!-- /input-group -->

      <div class="input-group commonMarginTop">
        <span class="input-group-addon">PW</span>
        <input type="password" class="form-control" placeholder="비밀번호를 입력하세요.">
      </div><!-- /input-group -->

    </template>
    <template #footer>
      <div class="">
        <button type="button" class="btn btn-default" style="margin:0;">로그인</button>
        <button type="button" class="btn btn-default commonMarginLeft" style="margin:0; margin-left: 5px;">회원가입</button>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from '../../components/common/TodoModal.vue'
// import Axios from 'axios'

export default {

  name: 'SignIn',
  components: {
    'Modal' : Modal
  },
  data() {
    return {

    }
  },
  methods: {

  }

}
</script>

<style lang="scss" scoped>
@import '~styles/Nomalize.scss';
@import '~styles/CommonStyle.scss';

</style>
