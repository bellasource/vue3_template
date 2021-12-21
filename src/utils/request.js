import axios from 'axios';

import { ElNotification } from 'element-plus';
// 引入Nprogress插件,可以在发送请求或者作出响应的时候有进度条的效果
// import Nprogress from 'nprogress';
// 引入该插件的样式文件
// import 'nprogress/nprogress.css';
const showNotification = ({ type = 'success', message }) => {
  ElNotification({
    type,
    message,
  });
};
const HTTP_SUCCESS_CODE = 0; //成功
const HTTP_FAILED_CODE = -1; //失败
const requestOnFulfilledFunc = (request) => {
  // Nprogress.start();
  return Promise.resolve(request);
};

const requestOnRejectedFunc = (error) => {
  return Promise.reject(error);
};

const responseOnFulfilledFunc = (response) => {
  // Nprogress.done();
  if (response.data.code && response.data.code !== HTTP_SUCCESS_CODE) {
    showNotification({ type: 'error', message: response.data.msg });
    return Promise.reject(response.data);
  }

  return Promise.resolve(response.data?.data || response);
};

const responseOnRejectedFunc = (error) => {
  // Nprogress.done();
  const message = codeMessage[error.response.status.toString()];
  if (message) {
    showNotification({ type: 'error', message });
  }
  return Promise.reject(error, 'error');
};

const interceptorsContext = {
  default: {
    requestOnFulfilledFunc,
    requestOnRejectedFunc,
    responseOnFulfilledFunc,
    responseOnRejectedFunc,
  },
};

const interceptorsRegister = (instance, model = 'default') => {
  instance.interceptors.request.use(
    interceptorsContext[model].requestOnFulfilledFunc,
    interceptorsContext[model].requestOnRejectedFunc,
  );
  instance.interceptors.response.use(
    interceptorsContext[model].responseOnFulfilledFunc,
    interceptorsContext[model].responseOnRejectedFunc,
  );
};
const axiosInstance = axios.create({ baseURL: '/mock' });

interceptorsRegister(axiosInstance);
const codeMessage = {
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作',
  401: '用户没有权限（令牌、用户名、密码错误）',
  404: '针对的是不存在的记录，服务器没有进行操作',
  500: '服务器发生错误，请检查服务器',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时',
};
export default axiosInstance;
