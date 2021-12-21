//不为空
export const validateNoVoid = (str) => {
  const reg = /./;
  return reg.test(str);
};
// ip
export const validateIp = (str) => {
  const reg = /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/;
  return reg.test(str);
};
// port 0~65535
export const validatePort = (str) => {
  const reg = /^(([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5]))$/;
  return reg.test(str);
};
//英文、数字、下划线
export const validateSourceId = (str) => {
  const reg = /^[0-9a-zA-Z_]+$/;
  return reg.test(str);
};
