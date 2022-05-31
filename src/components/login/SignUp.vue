<template>
  <Modal>
    <template #header>
      <h3>회원가입</h3>
    </template>
    <template #body>

      <div class="input-group">
        <span class="input-group-addon" id="basic-addon1">ID</span>
        <input type="text" class="form-control" placeholder="사용할 ID">
        <span class="input-group-btn">
          <button class="btn btn-default" type="button" style="margin:0;">중복체크</button>
        </span>
      </div><!-- /input-group -->

      <div class="input-group commonMarginTop">
        <span class="input-group-addon" id="basic-addon1">PW</span>
        <input type="password" class="form-control" placeholder="비밀번호 입력">
      </div><!-- /input-group -->

      <div class="input-group commonMarginTop">
        <span class="input-group-addon" id="basic-addon1">PW</span>
        <input type="password" class="form-control" placeholder="비밀번호 확인">
      </div><!-- /input-group -->

      <div class="input-group commonMarginTop">
        <span class="input-group-addon" id="basic-addon1">생년월일</span>
        <input type="text" class="form-control" placeholder="ex) 19001010">
      </div><!-- /input-group -->

      <div class="input-group commonMarginTop">
        <span class="input-group-addon" id="basic-addon1">e-mail</span>
        <input type="text" class="form-control" placeholder="ex) XXXXX@XXXX.com">
      </div><!-- /input-group -->

    </template>
    <template #footer>
      <div class="">
        <button type="button" class="btn btn-default" style="margin:0;">가입</button>
        <button type="button" class="btn btn-default commonMarginLeft" style="margin:0; margin-left: 5px;">초기화</button>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from '../../components/common/TodoModal.vue'

export default {

  name: 'SignUp',
  components: {
    'Modal' : Modal
  },

}
</script>

<style lang="scss" scoped>
@import '~styles/Nomalize.scss';
@import '~styles/CommonStyle.scss';

</style>
