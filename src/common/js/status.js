export const roomStatus = { // 房间聊天状态
  AIChat: 0, // 机器人
  menChat: 1, // 人工
  videoChat: 2 // 视频
}

export const queueStatus = { // 排队状态
  noneQueue: 0, // 未排队
  queuing: 1, // 排队中
  queueOver: 2, // 排队成功
  canselQueue: 3 // 取消排队
}

export const msgTypes = {
  msg_normal: '0', // 基础文本会话
  msg_img: '5', // 发送图片
  msg_card: '6' // 发送名片
}

export const msgStatus = {
  tip: '0',
  msg: '1',
  dialog: '2',
  card: '3'
}
