// ---------------封装mapState， mapActions, mapGetters----------------------
import { computed } from 'vue';
import { useStore, mapState, mapActions, mapGetters, createNamespacedHelpers } from 'vuex';

const useStateMapper = function (mapper, mapFn) {
  const store = useStore();

  const storeStateFns = mapFn(mapper);

  const storeState = {};
  Object.keys(storeStateFns).forEach((fnKey) => {
    const fn = storeStateFns[fnKey].bind({ $store: store });
    storeState[fnKey] = computed(fn);
  });

  return storeState;
};
const useActionMapper = function (mapper, mapFn) {
  const store = useStore();

  const storeActionsFns = mapFn(mapper);

  const storeAction = {};

  Object.keys(storeActionsFns).forEach((fnKey) => {
    storeAction[fnKey] = storeActionsFns[fnKey].bind({ $store: store });
  });

  return storeAction;
};

const checkType = (value) => Object.prototype.toString.call(value);

// 使用state
function useState(moduleName, mapper) {
  let mapperFn = mapState;
  if (checkType(moduleName) === '[object String]' && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapState;
  }
  return useStateMapper(mapper, mapperFn);
}

// 使用action
function useActions(moduleName, mapper) {
  let mapperFn = mapActions;
  if (checkType(moduleName) === '[object String]' && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapActions;
  }

  return useActionMapper(mapper, mapperFn);
}

// 使用getters
function useGetters(moduleName, mapper) {
  let mapperFn = mapGetters;
  if (checkType(moduleName) === '[object String]' && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapGetters;
  }

  return useStateMapper(mapper, mapperFn);
}
export { useState, useActions, useGetters };
