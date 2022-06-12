import { createStore } from 'vuex';
import { loginStateInfo } from '@/store/loginStateInfo';
// import createPersistedState from 'vuex-persistedstate';
import createPersistedState from "vuex-persistedstate";


export default createStore({

  modules : { loginStateInfo },
  plugins: [
    createPersistedState({
      paths : [ 'loginStateInfo' ]
    })
  ]

});
