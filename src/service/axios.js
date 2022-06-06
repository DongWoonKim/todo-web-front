import Axios from 'axios';
import VueCookies from 'vue-cookies';
// import { store } from '../store/index';

/**
 * 토큰 재발급 후 axios 헤더 값 수정
*/
//request 설정
Axios.interceptors.request.use(async function (config) {

  if (config.retry==undefined) { //
    /**
     * axios 요청 중에 accessToken 만료시 재발급 후 다시 요청할 땐
     * 기존 요청 정보에서 retry=true만 주가되고
     * 나머지는 그대로 다시 요청하기 때문에 url이 이상해져서 이렇게 나눔
     */
    // config.url = store.state.login.host + config.url; //host 및 url 방식 수정필요
    console.log('hihihhihi~~~')
  }

  //헤더 셋팅
  config.timeout = 10000;
  config.headers['Authorization'] = VueCookies.get('accessToken');
  config.headers['Refresh'] = VueCookies.get('refreshToken');
  config.headers['Content-Type'] = 'application/json';
  console.log('axios interceptors', config)
  return config;
}, function (error) {
  console.log('axios request error : ', error);
  return Promise.reject(error);
});
