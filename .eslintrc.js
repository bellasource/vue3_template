module.exports = {
  parserOptions: {
    ecmaVersion: 6, // 支持es6
    sourceType: 'module', // 支持es6模块化
  },
  // npm install --save-dev eslint @babel/eslint-parser vue-eslint-parser eslint-plugin-vue eslint-config-alloy
  extends: ['alloy', 'alloy/vue'], // 使用alloy规则
  env: {
    // 设置环境
    browser: true, // 支持浏览器环境： 能够使用window上的全局变量
    node: true, // 支持服务器环境:  能够使用node上global的全局变量
  },
  globals: {
    // 声明使用的全局变量
    // vari: "readonly", // 变量vari 可读，writable则为可写
  },
  rules: {
    // 自定义规则
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
