
export const loginStateInfo = {

  state : () => ({
    // Vue3GoogleOauthIsAuthorized : false
    id         : '',
    userId     : '',
    userName   : '',
    userEmail  : '',
    userBirth  : '',
    role       : '',
    loginToken : '', // 추후 토큰값을 받아온다.
    isSignIn   : false
  }),
  mutations : {
    SET_USERINFO( state, obj ) {

      state.id         = obj.id;
      state.userId     = obj.userId;
      state.userName   = obj.userName;
      state.userEmail  = obj.userEmail;
      state.userBirth  = obj.userBirth;
      state.role       = obj.role;
      // 토큰발행값 받아야한다...
      state.isSignIn   = true;
    },
    INIT_USERINFO( state ) {
      state.userId     = '';
      state.userName   = '';
      state.isSignIn   = false;
      state.loginToken = '';
    }
  },
  actions : {},
  getters : {}

}
