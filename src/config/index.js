/*
* @Author: Lahy
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-07-18 14:29:00
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
  historyPath: 'http://chat-servertest.ihxlife.com/api/v1',
  webRTCRoomPath: 'http://room-servertest.ihxlife.com:8085/api/v1'
}

const location = env === 'production' ? production : development
export default location