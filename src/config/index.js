/*
* @Author: Lahy
*/
// import ENV from './env';
const env = process.env.NODE_ENV
const production = {
  publicPath: '/videocs-servertest/api/v1',
  historyPath: '/chat-servertest/api/v1',
  webRTCRoomPath: '/roomcs-servertest/api/v1'
}

const development = {
  publicPath: 'http://112.74.159.234:8084/api/v1',
  // publicPath: 'http://192.168.8.102:7002/api/v1',
  historyPath: 'http://chat-servertest.ihxlife.com/api/v1',
  webRTCRoomPath: 'http://room-servertest.ihxlife.com:8085/api/v1'
}

const location = env === 'production' ? production : development
export default location
