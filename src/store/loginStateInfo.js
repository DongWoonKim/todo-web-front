import Axios from 'axios'
import VueCookies from 'vue-cookies'

export const loginStateInfo = {
  /*
    *** STATE ***
  */
  state : () => ({
    id         : '',
    userId     : '',
    userName   : '',
    userEmail  : '',
    userBirth  : '',
    role       : '',
    isSignIn   : false,

    accessToken : '',
    refreshToken : '',

    headers : { "Content-Type" : "application/json" }
  }),
  /*
    *** MUTATIONS ***
  */
  mutations : {

    SET_USERINFO ( state, obj ) {

      state.id         = obj.id;
      state.userId     = obj.userId;
      state.userName   = obj.userName;
      state.userEmail  = obj.userEmail;
      state.userBirth  = obj.userBirth;
      state.role       = obj.role;
      // 토큰발행값 받아야한다...
      state.isSignIn   = true;
    },
    INIT_USERINFO ( state ) {
      state.userId     = '';
      state.userName   = '';
      state.isSignIn   = false;
    },

    SIGNIN_TOK ( state, payload ) {
      VueCookies.set( 'accessToken', payload.data.accessToken, '60s' );
      VueCookies.set( 'refreshToken', payload.data.refreshToken, '1h' );

      state.accessToken  = payload.data.accessToken;
      state.refreshToken = payload.data.refreshToken;
      state.userId       = payload.data.userId;
    },
    REFRESH_TOK( state, payload ) {
      VueCookies.set( 'accessToken', payload.data.authorization, '60s' );
      VueCookies.set( 'refreshToken', payload.data.refresh, '1h' );

      state.accessToken  = payload.data.authorization;
      state.refreshToken = payload.data.refresh;

      if ( state.accessToken === '' && state.refreshToken === '' )
        state.userId = '';

    },
    REMOVE_TOK( state ) {

      VueCookies.remove( 'accessToken' );
      VueCookies.remove( 'refreshToken' );

      state.accessToken  = '';
      state.refreshToken = '';
      state.userId       = '';

    }

  },
  /*
    *** GETTERS ***
  */
  getters : {
    // 쿠키에 저장된 토큰 가져오기
    GET_TOKEN () {
      let ac = VueCookies.get( 'accessToken' );
      let rf = VueCookies.get( 'refreshToken' );

      return {
        access : ac,
        refresh : rf
      };
    }
  },
  /*
    *** ACTIONS ***
  */
  actions : {

    SIGNIN : ( { commit }, params, headConfig ) => {
      return new Promise( ( resolve, reject ) => {
        Axios.post( 'http://localhost:8080/auth/signin', params, headConfig).then( res => {
          console.log( 'sign in', res );
          commit('SIGNIN_TOK', res);
          resolve( res );
        })
        .catch( err => {
          console.log( 'sign in err', err.message );
          reject( err );
        });

      });
    },
    // access토큰 재요청
    REFRESH_TOKEN : ( { commit }, headConfig ) => {
      return new Promise( ( resolve, reject ) => {

        Axios.post( 'http://localhost:8080/auth/refreshToken', headConfig ).then( res => {
          console.log('vuex refresh token res', res);
          commit('REFRESH_TOK', res);
          resolve( res );

        }).catch( err => {

          console.log( 'refresh token err', err.config );
          reject( err );

        })


      })
    },

    SIGNOUT : ( { commit }, params, headConfig ) => {

      return new Promise( ( resolve, reject ) => {
        Axios.post( 'http://localhost:8080/auth/signout', params, headConfig ).then( res => {
          console.log( 'sign out ::');
          commit('REMOVE_TOK');
          resolve( res );

        }).catch( err => {

          console.log( 'sign out err', err.config );
          reject( err );

        })
      })

    }

  }

}
