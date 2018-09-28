import { mapGetters, mapMutations } from 'vuex'
import WebRTCRoom from '@/server/webRTCRoom'
import IM from '@/server/im'
import WebRTCAPI from 'WebRTCAPI'
import { shallowCopy } from '@/common/js/util'
import { formatDate } from '@/common/js/dateConfig.js'
import { msgStatus, msgTypes } from '@/common/js/status'
import { ERR_OK, getLoginInfo, consumerInfor } from '@/server/index.js'

export const setUserInfoMixin = {
  data () {
    return {
      userID: '',
      userName: '',
      roomName: ''
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    async getConsumerInfor (openId, ...Func) {
      // debugger
      const res = await consumerInfor(openId)
      if (res.result.code === ERR_OK) {
        console.log('====================== get openId is success ==========================')
        await this.setUserInfo(res.data.userInfo)
        Func && Func.forEach(async function (fn) {
          await fn()
        })
      } else {
        console.log('error in consumerInfor')
      }
    },
    // 获取用户登录信息
    async getUserInfo (data, query, ...Func) {
      const res = await getLoginInfo(data)
      console.log(res)
      if (res.result.code === ERR_OK) {
        console.log('getUserInfo成功')
        const info = shallowCopy(this.userInfo)
        info.accountType = res.data.accountType
        info.sdkAppID = res.data.sdkAppId
        info.userSig = res.data.userSig
        info.userId = res.data.userId
        console.log(info)
        sessionStorage.setItem('sdkAppId', res.data.sdkAppId)
        sessionStorage.setItem('userSig', res.data.userSig)
        sessionStorage.setItem('userId', res.data.userId)
        this.setUserInfo(info)
        // 执行回调
        Func && Func.forEach((fn) => {
          fn(query)
        })
      } else {
        console.log('error in getUserProfile')
      }
    },
    // 设置用户登录
    setUserInfoToEnterRoom (query, ...Func) {
      if (!query) {
        alert('请先登录!')
      } else if (query.cmd !== 'create' && query.cmd !== 'enter') {
        alert('发生错误，无法识别身份')
      } else {
        this.userID = query.userID
        this.userName = query.userName
        this.roomName = query.roomName
        if (query.cmd === 'enter') {
          this.setRoomId(query.roomID)
        }
      }
      const userId = sessionStorage.csId
      this.getUserInfo(userId, query, ...Func)
    },
    ...mapMutations({
      setUserInfo: 'SET_USER_INFO',
      setRoomId: 'SET_ROOM_ID'
    })
  }
}

export const RTCRoomMixin = {
  data () {
    return {
      RTC: null
    }
  },
  methods: {
    initRTC (query) {
      const self = this
      this.RTC = new WebRTCAPI({
        'sdkAppId': query.sdkAppId,
        'userId': query.userId,
        'userSig': query.userSig,
        'accountType': query.accountType
      }, () => {
        this.RTC.createRoom({
          roomid: query.userId,
          role: 'miniwhite'
        }, () => {
          console.info('ENTER RTC ROOM OK')
        }, (result) => {
          if (result) {
            console.error('ENTER RTC ROOM failed')
            // self.goHomeRouter()
          }
        })
      }, (error) => {
        console.error(error)
      })

      this.RTC.on('onLocalStreamAdd', (info) => {
        const videoElement = document.getElementById('localVideo')
        // const fullScreenBtn = document.getElementById('fullScreenBtn')
        if (info && info.stream) {
          videoElement.srcObject = info.stream
          videoElement.muted = true
        }
      })
      // 客户视频
      this.RTC.on('onRemoteStreamUpdate', (info) => {
        const videoElement = document.getElementById('remoteVideo')
        if (info && info.stream) {
          videoElement.srcObject = info.stream
        }
      })

      this.RTC.on('onRemoteStreamRemove', (info) => {
        const videoElement = document.getElementById(`v_${info.videoId}`)
        if (videoElement) {
          videoElement.srcObject = null
        }
        const temp = []
        // eslint-disable-next-line
        for (let i = 0; i < self.members.length; i++) {
          if (self.members[i].id !== info.videoId) {
            temp.push(self.members[i])
          }
        }
        self.members = temp
      })

      this.RTC.on('onKickOut', () => {
        console.warn('其他地方登录，被踢下线')
        // self.goHomeRouter()
      })

      this.RTC.on('onWebSocketClose', () => {
        console.warn('websocket断开')
        // self.goHomeRouter()
      })

      this.RTC.on('onRelayTimeout', () => {
        console.warn('服务器超时断开')
        // self.goHomeRouter()
      })
    },
    afterCreateRoom (courseInfo) {
      // const self = this
      this.setRoomId(courseInfo.roomId)
      // 创建房间
      this.RTC.createRoom({
        // roomid: parseInt(self.courseId, 10),
        roomid: courseInfo.roomId,
        role: 'miniwhite'
      }, () => {
        console.info('ENTER RTC ROOM OK')
      }, (result) => {
        if (result) {
          console.error('ENTER RTC ROOM failed')
          // self.goHomeRouter()
        }
      })
    },
    actionCreateRoom (query) {
      console.log('-> action create room')
      const self = this
      WebRTCRoom.createRoom(
        self.userInfo.userID,
        self.userInfo.selfName,
        self.roomName,
        (res) => {
          // 发送心跳包
          self.heartBeatTask = WebRTCRoom.startHeartBeat(
            self.userInfo.userID,
            res.data.roomID,
            () => {},
            () => {
              // self.$toast.center('心跳包超时，请重试~')
              console.log('心跳包超时，请重试~')
              // self.goHomeRouter()
            }
          )
          const info = {
            // 测试阶段默认'12345678'
            roomId: self.roomId || '12345678',
            // roomId: res.data.roomID,
            roomName: self.roomName
          }
          self.afterCreateRoom(info)
        },
        () => {
          // error, 返回
        }
      )
    },
    actionEnterRoom (query) {
      const self = this
      WebRTCRoom.enterRoom(
        self.userInfo.userID,
        self.userInfo.userName,
        self.roomId,
        (res) => {
          // 发送心跳包
          self.heartBeatTask = WebRTCRoom.startHeartBeat(
            self.userInfo.userID,
            self.roomId,
            () => {},
            () => {
              // self.$toast.center('心跳包超时，请重试~')
              console.log('心跳包超时，请重试~')
              // self.goHomeRouter()
            }
          )
          // 进房间
          self.RTC.createRoom(
            {
              // roomid: parseInt(self.courseId, 10),
              roomid: self.roomId,
              role: 'miniwhite'
            },
            () => {},
            (result) => {
              if (result) {
                console.error('webrtc建房失败')
                // self.goHomeRouter()
              }
            }
          )
        },
        () => {
          // error, 返回
        }
      )
    },
    ...mapMutations({
      setRoomId: 'SET_ROOM_ID'
    })
  }
}

export const IMMixin = {
  computed: {
    ...mapGetters([
      'userInfo',
      'roomId',
      'msgs'
    ])
  },
  data () {
    return {

    }
  },
  methods: {
    initIM (query) {
      const self = this
      self.onMsgNotify.bind(this)
      // debugger
      const loginInfo = {
        sdkAppID: self.userInfo.sdkAppID,
        appIDAt3rd: self.userInfo.sdkAppID,
        identifier: self.userInfo.userId,
        identifierNick: self.userInfo.selfName,
        accountType: self.userInfo.accountType,
        userSig: self.userInfo.userSig
      }
      console.debug('=====initIM=====', loginInfo)
      IM.login(
        loginInfo,
        {
          'onBigGroupMsgNotify': self.onBigGroupMsgNotify,
          'onMsgNotify': self.onMsgNotify
        },
        () => {
          console.log('===============================> initIM success <===============================')
          IM.joinGroup(sessionStorage.csId, self.userInfo.userId)
        },
        (err) => {
          alert(err.ErrorInfo)
        }
      )
    },
    onBigGroupMsgNotify (newMsgList) {
      if (newMsgList && newMsgList.length > 0) {
        const msgsObj = IM.parseMsgs(newMsgList)
        // msgsObj[time] = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
        let temp = this.msgs
        temp = temp.concat(msgsObj.textMsgs)
        this.setMsgs(temp)
        console.log(this.msgs)
      }
    },
    onMsgNotify (msgs) {
      // 告知父级接收数据
      // this.$emit('NewMsg', msgs)
      if (msgs && msgs.length > 0) {
        const msgsObj = IM.parseMsgsInSystem(msgs).textMsgs[0]
        // console.log(msgsObj.openId) // openId
        sessionStorage.setItem('openId', msgsObj.openId)
        this.getConsumerInfor(msgsObj.openId)
        switch (msgsObj.code) {
          case 0: // 人数减少

            break
          case 1: // 客户端排队成功

            break
          case 2: // 座席端视频接入请求
            this.$emit('NewMsg', msgsObj)
            break
        }
      }
    },
    // 发送文本信息
    sendTextMsg (text) {
      const self = this
      IM.sendRoomTextMsg({
        groupId: '12345678',
        msg: text,
        time: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
        nickName: self.userInfo.selfName,
        identifier: self.userInfo.userID,
        msgStatus: msgStatus.msg,
        msgType: msgTypes.msg_normal
      })
    },
    // 发送图片信息
    sendImgMsg (img) {
      const info = {
        from_id: 'cust-test',
        to_id: 'cs-test',
        groupId: '12345678',
        time: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
        identifier: ''
      }
      IM.uploadPic(img, info)
    },
    // 发送名片信息
    sendCardMsg (text) {
      const self = this
      // debugger
      IM.sendCardInfor({
        groupId: '12345678',
        msg: text,
        time: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
        nickName: self.userInfo.selfName,
        identifier: self.userInfo.userID,
        msgStatus: msgStatus.card,
        msgType: msgTypes.msg_card
      })
    },
    ...mapMutations({
      setMsgs: 'SET_MSGS'
    })
  }
}
