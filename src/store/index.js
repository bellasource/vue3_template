import { createStore } from 'vuex';
import common from './modules/test';

const store = createStore({
  modules: {
    common,
  },
});

if (module.hot) {
  // 使 action 和 mutation 成为可热重载模块
  module.hot.accept(['./modules/test'], () => {
    // 获取更新后的模块
    // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
    // 加载新模块
    store.hotUpdate({
      modules: {
        common: require('./modules/test').default,
      },
    });
  });
}
export default store;
