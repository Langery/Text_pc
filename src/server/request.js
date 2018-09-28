import axios from 'axios'
import conf from '../config/index'

// axios.defaults.withCredentials = true

// 全局路径
// publicPath: 'http://192.168.8.102:8081/api/v1'

const hostFilter = hostType => {
  switch (hostType) {
    case 'public':
      return conf.publicPath
    case 'RTCRoom':
      return conf.webRTCRoomPath
  }
}

export default {
  post: (hostType, url, data, error, option) => axios.post(hostFilter(hostType) + url, data, option)
    .then(response => response.data)
    .catch((err) => {
      if (error) {
        error(err)
      } else {
        console.error(err)
      }
    }),
  get: (hostType, url, error, option) => axios.get(hostFilter(hostType) + url, option)
    .then(response => response.data)
    .catch((err) => {
      if (error) {
        error(err)
      } else {
        console.log(err)
      }
    }),
  put: (hostType, url, data, error, option) => axios.put(hostFilter(hostType) + url, data, option)
    .then(response => response.data)
    .catch((err) => {
      if (error) {
        error(err)
      } else {
        console.log(err)
      }
    }),
  delete: (hostType, url, error, option) => axios.delete(hostFilter(hostType) + url, option)
    .then(response => response.data)
    .catch((err) => {
      if (error) {
        error(err)
      } else {
        console.log(err)
      }
    }),
  url (hostType, path) { return hostFilter(hostType) + path }
}
