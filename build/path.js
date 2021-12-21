const { resolve } = require('path');

const root = resolve(__dirname, '../');
const entry = resolve(__dirname, '../src/index.js');
const output = resolve(__dirname, '../dist');
const template = resolve(__dirname, '../index.html');
const src = resolve(__dirname, '../src');
const favicon = resolve(__dirname, '../static/logo.svg');
const mock = resolve(__dirname, '../mock/index.js');
const staticResources = resolve(__dirname, '../static');
const outputStaticResources = resolve(__dirname, '../dist/static');
const nodeModules = resolve(__dirname, '../node_modules');
const lessVariables = resolve(__dirname, '../src/assets/styles/variables.less');

module.exports = {
  root,
  entry,
  output,
  template,
  src,
  favicon,
  mock,
  staticResources,
  outputStaticResources,
  nodeModules,
  lessVariables,
};
