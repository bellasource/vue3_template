import type from './type';
import { fetchUserInfo } from '@src/apis/test';
const common = {
  namespaced: true,
  state: {
    userInfo: {
      userId: -1,
      username: '',
    },
  },
  mutations: {
    [type.SET_USERINFO](state, data) {
      state.userInfo = data;
    },
  },
  actions: {
    async getUserInfo({ commit }, params) {
      const result = await fetchUserInfo();
      commit(type.SET_USERINFO, result);
    },
  },
  getters: {},
};
export default common;
