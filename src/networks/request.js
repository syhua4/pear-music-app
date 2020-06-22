import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://10.0.0.65:1122',
    timeout: 4000,
    withCredentials: true
  })
  instance.interceptors.request.use(
    config => {
      return config
    },
    err => {
      return err
    }
  )

  instance.interceptors.response.use(
    res => {
      return res.data
    },
    err => {
      return err
    }
  )

  return instance(config)
}
