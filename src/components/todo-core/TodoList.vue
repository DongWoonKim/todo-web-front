<template>
  <section id="todoList">

    <transition-group name="fade" tag="ul">

      <li
        class="shadow"
        v-for="(todoItem, index)  in propsdata"
        :key="todoItem">
        <i class="checkBtn fas fa-check" aria-hidden="true"></i>
        {{todoItem}}
        <span
          class="removeBtn"
          type="button"
          @click="removeTodo( todoItem, index )"
        >
          <i class="far fa-trash-alt" aria-hidden="true"></i>
        </span>
      </li>

    </transition-group>

  </section>
</template>

<script>
export default {
  props: ['propsdata'],
  methods: {
    removeTodo( todoItem, index ) {
      this.$emit('removeTodo', todoItem, index);
    }
  },
  created() {
    console.log( 'todo-list ::' )
  }
}
</script>

<style lang="scss" scoped>

  ul {
    list-style-type: none;
    padding-left: 0px;
    margin-top: 0;
    text-align: left;

    & li {
      display: flex;
      min-height: 50px;
      line-height: 50px;
      height: 50px;
      margin: 0.5rem 0;
      padding: 0 0.9rem;
      background-color: white;
      border-radius: 5px;
    }

  }

  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }

  .checkBtn {
    line-height: 45px;
    color: #62acde;
    margin-right: 5px;
  }

  .removeBtn {
    margin-left: auto;
    color: #de4343;
  }


</style>
