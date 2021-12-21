module.exports = function config(api) {
  const presets = [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage', //自动进行polyfill,进行js兼容
        corejs: 3,
      },
    ],
  ];
  const plugins = [
    [
      'import',
      {
        libraryName: 'vxe-table',
        style: true, // 样式是否也按需加载
      },
      'vxe-table',
    ],

    [
      'import',
      {
        libraryName: 'ant-design-vue',
        libraryDirectory: 'es',
        style: true,
      },
      'ant-design-vue',
    ],
    [
      'import',
      {
        libraryName: 'lodash',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'lodash',
    ],
  ];
  // 使用缓存
  api.cache(true);
  return {
    presets,
    plugins,
  };
};
