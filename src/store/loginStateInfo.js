import Axios from 'axios'
import VueCookies from 'vue-cookies'

export const loginStateInfo = {
  /*
    *** STATE ***
  */
  state : () => ({
    // Vue3GoogleOauthIsAuthorized : false
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
      state.loginToken = '';
    },

    SIGNIN_TOKEN ( state, payload ) {
      VueCookies.set( 'accessToken', payload.data.accessToken, '60s' );
      VueCookies.set( 'refreshToken', payload.data.refreshToken, '1h' );

      state.accessToken  = payload.data.accessToken;
      state.refreshToken = payload.data.refreshToken;
    },
    REFRESH_TOKEN( state, payload ) {
      VueCookies.set( 'accessToken', payload.data.accessToken, '60s' );
      VueCookies.set( 'refreshToken', payload.data.refreshToken, '1h' );
      state.accessToken  = payload.accessToken;
    },
    REMOVE_TOKEN( state ) {

      VueCookies.remove( 'accessToken' );
      VueCookies.remove( 'refreshToken' );

      state.accessToken  = '';
      state.refreshToken = '';

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
          commit('SIGNIN_TOKEN', res);
          resolve();
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
          console.log('refresh res', res);
          commit('REFRESH_TOKEN', res);
          resolve( res );
        }).catch( err => {
          console.log( 'refresh token err', err.config );
          reject( err.config.data );
        })
      })
    },

    SIGNOUT : ( { commit } ) => {
      commit('REMOVE_TOKEN');
    }

  }

}
