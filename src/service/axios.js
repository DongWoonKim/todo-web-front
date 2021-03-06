import Axios from 'axios';
import VueCookies from 'vue-cookies';
import Store from '../store/index';

/**
 * 토큰 재발급 후 axios 헤더 값 수정
*/
//request 설정
Axios.interceptors.request.use(async function (config) {

  let check = {};
  check.access = VueCookies.get( 'accessToken' );
  check.refresh = VueCookies.get( 'refreshToken' );

  if (
    ( check.access === '' ||
      check.access === null ||
      check.access === 'null' ||
      check.access === 'undefined' )
      &&
    ( check.refresh !== '' &&
      check.refresh !== null &&
      check.refresh !== 'null' &&
      check.refresh !== 'undefined' )
  ) {
    /*
    //헤더 셋팅
    config.timeout = 10000;
    config.headers['Authorization'] = VueCookies.get('accessToken');
    config.headers['Refresh'] = VueCookies.get('refreshToken');
    config.headers['Content-Type'] = 'application/json';
    */
    //헤더 셋팅
    // access 토큰을 스토어 필드 값으로 관리하다 쿠키에서 사라지면 필드 값을 보낸다.
    config.headers['Authorization'] = Store.state.loginStateInfo.accessToken; // 이부분 수정필요.
    config.headers['Refresh'] = VueCookies.get('refreshToken');
    config.headers['Content-Type'] = 'application/json';
  } else if (
    ( check.access !== '' ||
      check.access !== null ||
      check.access !== 'null' ||
      check.access !== 'undefined' )
      &&
    ( check.refresh !== '' &&
      check.refresh !== null &&
      check.refresh !== 'null' &&
      check.refresh !== 'undefined' )
  ) {

    //헤더 셋팅
    config.timeout = 10000;
    config.headers['Authorization'] = VueCookies.get('accessToken');
    config.headers['Refresh'] = VueCookies.get('refreshToken');
    config.headers['Content-Type'] = 'application/json';

  }

  return config;
}, function (error) {
  console.log('axios request error : ', error);
  return Promise.reject(error);
});
