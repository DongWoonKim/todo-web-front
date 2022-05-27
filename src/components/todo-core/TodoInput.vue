<template>
  <div class="inputBox shadow">
    <input type="text"
      v-model="newTodoItem"
      placeholder="오늘은 뭐할까?"
      @keypress.enter="addTodo"
      style="font-size: 2rem;"
    >
    <span class="addContainer" v-on:click="addTodo">
      <i class="addBtn fas fa-plus" aria-hidden="true"></i>
    </span>

    <Modal v-if="showModal">
      <template #header>
        <div class="modalClose" >
          <i
          class="closeModalBtn fas fa-times"
          aria-hidden="true"
          @click="toggleModal"
          style="font-size:2rem;"
          ></i>
        </div>
        <h1>경고</h1>
      </template>
      <template #footer>
        <span>
          할 일을 입력하세요.
        </span>
      </template>
    </Modal>

  </div>
</template>

<script>
import Modal from "../../components/common/TodoModal.vue"

export default {
  components: {
    Modal : Modal
  },
  data() {
    return {
      newTodoItem : '',
      showModal : false
    }
  },
  methods: {
    addTodo() {

      if ( this.newTodoItem !== "" ) {
        let value = this.newTodoItem && this.newTodoItem.trim();
        this.$emit('addTodo', value);
        this.clearInput();
      } else {
        this.toggleModal();
      }

    },
    clearInput() {
      this.newTodoItem = '';
    },
    toggleModal() {
      this.showModal = !this.showModal;
    }
  }
}
</script>

<style lang="scss" scoped>
  input:focus {
    outline: none;
  }

  .inputBox {
    background-color: white;
    height: 55px;
    line-height: 50px;
    border-radius: 5px;

    & input {
      border-style: none;
      font-size: 0.9rem;
    }
  }

  .addContainer {
    float: right;
    background: linear-gradient(to right, #AC99F2, #A7BAF2);
    display: block;
    width: 3rem;
    border-radius: 0 5px 5px 0;
    height: 55px;

    & .addBtn {
      color: white;
      vertical-align: middle;
    }
  }

</style>
