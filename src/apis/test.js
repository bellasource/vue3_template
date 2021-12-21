import request from '@src/utils/request';

export const fetchUserInfo = (data) =>
  request({
    method: 'GET',
    url: '/projects/create',
    data,
  });
export const fetchTestList = (data) =>
  request({
    method: 'GET',
    url: '/projects/list',
    data,
  });
