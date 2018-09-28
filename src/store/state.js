// eslint-disable-next-line
import { roomStatus, queueStatus } from '@/common/js/status'

const state = {
  userInfo: {
    userId: '',
    selfName: '',
    accountType: '',
    sdkAppId: '',
    userSig: ''
  },
  customData: {},
  roomId: null,
  msgs: [],
  fullScreen: false, // 视频客服开启时，videoRoom的全屏或缩小状态
  screenShotImage: [], // 识别用户头像信息
  roomMode: roomStatus.AIChat,
  queueMode: queueStatus.noneQueue
}

export default state
