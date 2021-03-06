import axios from 'axios';

export function request(config) {
  const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_SERVER_URL : '/api',
    timeout: 30000,
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
