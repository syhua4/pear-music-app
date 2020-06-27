import axios from 'axios';

export function request(config) {
  const instance = axios.create({
    baseURL: 'https://autumnfish.cn',
    timeout: 4000,
    withCredentials: true
  });
  instance.interceptors.request.use(
    config => {
      return config;
    },
    err => {
      return err;
    }
  );

  instance.interceptors.response.use(
    res => {
      return res.data;
    },
    err => {
      return err;
    }
  );

  return instance(config);
}
